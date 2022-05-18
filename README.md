# React Facebook Connect

> A React Component for Facebook Connect
> This project was inspired by <https://github.com/keppelen/react-facebook-login>
> Using more up to date react with functional components, hooks and typescript.
> Support both commonJS and ecmaScript modules.

## Getting Started

- `yarn add react-facebook-connect` or `npm install react-facebook-connect`
- Your application will also need `react-dom` and `react` installed.

## Development

```shell
git clone https://github.com/aviranbergic/react-facebook-connect.git && cd react-facebook-connect
npm install react react-dom react-facebook-connect --save --force
npm start
```

- navigate to [localhost:8080](http://localhost:8080)

## How to use

### Basic Button

```js
import FacebookConnect, { FacebokLoginResult } from 'react-facebook-connect';

const callbackHandler = (result: FacebokLoginResult | string) => {
  console.log(result);
}

<FacebookConnect appId='1138330606726062'
                 fields='name,email,picture' 
                 callback={callbackHandler} 
                 xfbml buttonSize='medium'
                 vairant='primary'
                 buttonText='Continue With Facebook'
                 ariaLabel='Continue With Facebook'
                 /> 
```

### Override button with costum styling

You can provide your own custom styling + Icon (non mandatory).

```js
import FacebookConnect, { FacebokLoginResult } from 'react-facebook-connect';
import { SomeIcon } from './SomeIcon'

const callbackHandler = (result: FacebokLoginResult | string) => {
  console.log(result);
}

const style = {
    width: '500px',
    color: 'white',
    backgroundColor: 'blue'
}

<FacebookConnect appId='1138330606726062' fields='name,email,picture' callback={callbackHandler} customStyle={style} Icon={<SomeIcon/>}> 
Connect With Facebook 
</ FacebookConnect>
```

### Passing Children

If You need to add more layers to the button.

#### buttonText and children cannot be used at the same time

```js
import FacebookConnect, { FacebokLoginResult } from 'react-facebook-connect';

const callbackHandler = (result: FacebokLoginResult | string) => {
  console.log(result);
}

<FacebookConnect appId='1138330606726062' fields='name,email,picture' callback={callbackHandler}> 
Connect With Facebook 
</ FacebookConnect>
```

### Custom permission

By default the component, request only 'public_profile' permission, you can change if you send 'scope', that is a string comma separated attribute.

see <https://developers.facebook.com/docs/facebook-login/permissions> for permissions list

```js
import FacebookConnect, { FacebokLoginResult } from 'react-facebook-connect';

const callbackHandler = (result: FacebokLoginResult | string) => {
  console.log(result);
}

<FacebookConnect appId='1138330606726062' fields='name,email,picture' callback={callbackHandler} xfbml buttonSize='medium' vairant='primary'
scope='public_profile,user_friends,user_actions.books'> Connect With Facebook 
</ FacebookConnect>
```
