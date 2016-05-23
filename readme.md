# Saga Login Flow

> A login/register flow built with React & Redux Saga

This application demonstrates what a React-based register/login workflow might look like with [Redux Saga](https://github.com/yelouafi/redux-saga).

It's based on Max Stoiber's [login-flow](https://github.com/mxstbr/login-flow), but uses Redux Saga instead of Redux Thunk to handle asynchronous actions.

## Authentication

Authentication happens in `app/auth/index.js`, using `fakeRequest.js` and `fakeServer.js`. `fakeRequest` is a fake `XMLHttpRequest` wrapper. `fakeServer` responds to the fake HTTP requests and pretends to be a real server, storing the current users in local storage with the passwords encrypted using `bcrypt`.

## License

MIT © [Juan Soto](http://juansoto.me)
