// promise는 비동기적인환경 콜백함수 대신 유용하게 쓸 수 있는 object !
// 1. 상태에 대해 이해  2. producer와 consumer의 차이를 알기

//상태 : pending -> fullfilled or rejected

// 1. Producer

//새로운 promise가 만들어질 때는 , 전달한 executer라는 함수가 자동적으로 바로 실행됨!

const promise = new Promise((resoleve, reject) => {
// 큰 작동 (network, read files)
console.log('doing something.............');
setTimeout(() => { resoleve('ellie')}, 2000);
// setTimeout(()=> {reject(new Error('no network'));})
});

//2. Consumers: then , catch, finally

promise.then((value) => {  //then은 promise가 정상적으로 잘 수행이 되어서 마지막을 최종적으로 resolve라는 콜백함수를 통해서 전달한 ellie라는 값이 value의 파라미터값으로 들어오는것
    console.log(value);
})
.catch(error => {
    console.log(error);
})
.finally(() => {
    console.log("finally")
});




// 3. Promise와 연결하기

const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber 
.then(num => num * 2) // 1이 전달
.then(num => num * 3) // 2가 전달
.then(num => {
    return new Promise((resolve, reject) => {  // 새로운 promise를 전달함 , 이 promise는
        setTimeout(() => resolve(num-1), 1000);  // 6에서 1을 뺌 -> 5가 출력됨
    });
})
.then(num => console.log(num));


// 4. 오류를 잘 처리하자

const getHen = () =>
new Promise((resolve, reject) => {
    setTimeout(() => resolve('닭'), 1000);
});
const getEgg = hen =>
new Promise((resolve, reject) => {setTimeout(() => reject(new Error(`${hen} => 알`)), 1000);});

const cook = egg =>
new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 프라이팬`), 1000);
});

getHen()
// .then(hen => getEgg(hen))  // 받아오는 함수가 하나를 호출하는 경우에는 생략가능
.then(getEgg)
.catch(error => { return '빵';})
// .then(egg => cook(egg))
.then(cook)
// .then(meal => console.log(meal))
.then(console.log)
.catch(console.log);