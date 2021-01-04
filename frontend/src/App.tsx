import React from 'react';
import axios from 'axios';
import './App.css';
import {
  ButtonGroup, Button,
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import { Switch, Route, } from 'react-router-dom';
import Rules from './components/Rules';
import Game from './components/Game';
import CreateGame from './components/CreateGame';
import History from './components/History';
import ProfileModal from './components/Profile';
import LoginModal from './components/Login';
import SignUpModal from './components/SignUp';
import ProtectedRoute from './ProtectedRoute';

//interface for games to list in dropdown nav
interface IGame {
  name: string,
  region: string,
  slug: string,
}
//initialize state for interfaces
const defaultGames:IGame[] = [];

//main function for page
function App(): JSX.Element {
  const token = localStorage.getItem('access_token');
  //states
  const [games,setGames]: [IGame[], (games: IGame[]) => void] = React.useState(defaultGames)
  const [loggedIn,setLoggedIn]: [boolean, (loggedIn:boolean) => void] = React.useState<boolean>(false);
  const [error,setError]: [string, (error:string) => void] = React.useState("");
  
  //effects
  React.useEffect(() => {
    if(localStorage.getItem('access_token')!=null && localStorage.getItem('refresh_token')!=null){
      setLoggedIn(true);
    }
    else{ setLoggedIn(false);}
  },[token])
  //GET LIST OF GAMES FROM API
  React.useEffect(() => {
    axios
        .get<IGame[]>("http://127.0.0.1:8000/api/game/")
        .then(response => { setGames(response.data);})
        .catch(err => {setError(err);});
  }, []);

  const Greeting = () => {
    switch(loggedIn){
      case false:
        return <ButtonGroup><LoginModal/><SignUpModal/></ButtonGroup>
      case true:
        return <ButtonGroup>
          <ProfileModal/>
          <Button onClick={()=>{localStorage.clear();window.location.reload();}}>Sign Out</Button>
        </ButtonGroup>
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>Nuzlocke Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Rules</Nav.Link>
            <NavDropdown title="Games" id="collasible-nav-dropdown">
              {games.map(g => {
              return <NavDropdown.Item href={"/game/" + g.slug} key={g.slug}>{g.name}</NavDropdown.Item>})}
            <NavDropdown.Item href={"/create-game"}>Create Your Own</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Greeting />
      </Navbar>
      <Switch>
        {/*"exact" ensures path is exact match for what is loaded,
        otherwise rules will always be displayed*/}
        <Route exact={true} path="/" component={Rules} primary={true}/>
        <Route path="/game/:slug" component={Game}/>
        <Route path="/create-game" component={CreateGame}/>
        <ProtectedRoute isAuthenticated={(localStorage.getItem('access_token') !== null)}
        isAllowed={true} restrictedPath="/history" homePath="/" component={History}/>
      </Switch>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;