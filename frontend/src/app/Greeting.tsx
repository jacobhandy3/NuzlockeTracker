import React from 'react';
import {
    ButtonGroup, Button,
} from 'react-bootstrap';
import ProfileModal from './Profile';
import LoginModal from './Login';
import SignUpModal from './SignUp';

function Greeting() {
    const token = localStorage.getItem('access_token');
    //states
    const [loggedIn,setLoggedIn]: [boolean, (loggedIn:boolean) => void] = React.useState<boolean>(false);

    //effects
    React.useEffect(() => {
        if(localStorage.getItem('access_token')!=null && localStorage.getItem('refresh_token')!=null){
          setLoggedIn(true);
        }
        else{ setLoggedIn(false);}
    },[token])
    
    //if user is not logged in show login and sign up button that bring up modals with forms
    //else show the profile and sign out buttons with profile bringing up a modal
        //and sign out button clearing local storage
    switch(loggedIn){
      case false:
        return <ButtonGroup><LoginModal/><SignUpModal/></ButtonGroup>
      case true:
        return <ButtonGroup>
          <ProfileModal/>
          <Button onClick={()=>{localStorage.clear();window.location.reload();}} variant="dark">Sign Out</Button>
        </ButtonGroup>
    }
  }

  export default Greeting;