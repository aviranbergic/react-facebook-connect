import './App.css';
import FacebookConnect from 'react-facebook-connect';

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
        variant='primary'
        buttonSize='large'
        buttonText='Continue With Facebook'
        ariaLabel='Continue With Facebook' />  
    </div>
  );
}

export default App;
