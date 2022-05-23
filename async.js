// async & await
// 깔끔하게 promise를 쓰는 방식!

//1. async

// function fetchUser() {

//     return new Promise((resolve, reject) => {
//             //네트워크에서 받아오는데 10초라 해보자
//         return ('ellie');
//     });
// }

// const user = fetchUser();
// user.then(console.log);
// console.log(user);

async function fetchUser() {  //async를 함수앞에 쓰면 코드블록이 자동으로 promise로 바뀜
        return 'ellie';
}

const user = fetchUser();
user.then(console.log);
console.log(user);


// 2. await 

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));   //정해진 ms가지나면 resolve를 호출
}

async function getApple() {  // await은 async 안에서만 사용가능
    await delay(3000);   // 3초를 기다렸다가 사과를 return 하는 promise 생성
    return '사과';
}

async function getBanana() {
    await delay(3000);  
    return '바나나';
}

// function getBanana() {
//     return delay(3000)
//     .then(() => '바나나');
// }

// function pickFruits() {
//     return getApple() 
//     .then(apple => {
//         return getBanana()
//         .then(banana => `${apple} + ${banana}`);
//     });
// }

// pickFruits().then(console.log);

// async function pickFruits() {
//     const apple = await getApple();
//     const banana = await getBanana();  // 순차적으로 하면 기다려야해서 비효율적
//     return `${apple} + ${banana}`;
// }

// pickFruits().then(console.log);


async function pickFruits() {
    const applePromise = getApple();  // 여기서 promise를 만들었기때문에 병렬적으로 동시에 실행됨 , 근데 이렇게 더럽게 안씀 Promise.all 씀
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;  
    return `${apple} + ${banana}`;
}

pickFruits().then(console.log);



// 3. useful Promise APIs

function pickAllfruits() {
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(`+`))
}

pickAllfruits().then(console.log)


// 첫번재 과일만 받기

function pickOnlyone() {
    return Promise.race([getApple(), getBanana()])
}

pickOnlyone().then(console.log);