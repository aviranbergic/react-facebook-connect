import Icon from './logo';
import './App.css';
import FacebookConnect from 'react-facebook-connect';
import FacebookLogin from 'react-facebook-login';

function App() {

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div className="App">
      <div style={{marginBottom:"100px"}}>
        
      </div>
      <FacebookConnect appId="1138330606726064"
        fields="name,email,picture"
        callback={responseFacebook} 
        xfbml
        variant={'secondary'}
        buttonSize={'large'}
        Icon={<Icon/>}> Continue With Facebook </ FacebookConnect>
      {/* 
      <FacebookLogin
        appId="1138330606726064"
        autoLoad={true}
        fields="name,email,picture"

        callback={responseFacebook} /> */}
    </div>
  );
}

export default App;
