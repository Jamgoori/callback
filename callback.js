//자바스크립트는 동기적임. 순서에맞게 실행

console.log('1')
setTimeout(function(){console.log('2'),1000});
setTimeout(()=>console.log('2'), 1000);
console.log('3')

function printImmediately(print) {  
    print();
}

printImmediately(()=> console.log('hello'));

//비동기 콜백

function printWithDelay(print, timeout){
    setTimeout(print, timeout);
}

printWithDelay(()=> console.log('async callback'), 2000)


//콜백지옥

class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=> {
            if(
                (id ==='park' && password === 'jaemo') ||
                (id === 'kim' && password === 'doyoung')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        },2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if (user === 'park') {
                onSuccess({ name: 'park', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        })
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage.loginUser(
    id, password, user => {
    userStorage.getRoles(user, userWithRole => {
        alert(`Hello ${userWithRole.name} , you have a ${user.role} role`);
    }, error => {console.log(error);});
},
error => {
    console.log(error);
})