import React from 'react';
import axios from 'axios';
import axiosRefresh from "../refreshToken";
import './App.css';
import {
  Button,
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';
import { Switch, Route, } from 'react-router-dom';
import useDarkMode from 'use-dark-mode';
import DarkModeToggle from 'react-dark-mode-toggle';
import Rules from '../components/rules/Rules';
import Game from '../components/game/Game';
import CreateGame from '../components/create-game/CreateGame';
import History from '../components/history/History';
import ProtectedRoute from './ProtectedRoute';
import Greeting from './Greeting';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  const darkMode = useDarkMode(false);
  //states
  const [games,setGames]: [IGame[], (games: IGame[]) => void] = React.useState(defaultGames)
  const [error,setError]: [string, (error:string) => void] = React.useState("");
  
  //effects
  //GET LIST OF GAMES FROM API
  React.useEffect(() => {
    axios
        .get<IGame[]>("http://127.0.0.1:8000/api/game/", { headers: {
          "Content-Type": "applications/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('access_token'),
        }})
        .then(response => { setGames(response.data);console.log(response.data)})
        .catch(async function(error) {
          if(error.response.status === 401 && localStorage.getItem('refresh_token') !== null) {
            try {
                const response = await axiosRefresh.post('', {
                    refresh: localStorage.getItem('refresh_token')
                });
                localStorage.setItem('access_token',response.data.access);
            } catch (error) {
                throw(error);
            }
        }
        })
  }, []);

  //just a navbar and SPA part of the page
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>Nuzlocke Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Rules</Nav.Link>
            <NavDropdown title="Games" id="collasible-nav-dropdown">
              <>
              {games.map((g,index) => {
              return (index < 12) ? <NavDropdown.Item href={"/game/" + g.slug} key={index}>{g.name}</NavDropdown.Item>
              : <NavDropdown.Item href={"/game/" + g.slug} key={g.slug}>{g.name} <Button size="sm" variant="link"><HighlightOffIcon /></Button></NavDropdown.Item>
              })}
              </>
            <NavDropdown.Item href={"/create-game"}>Create Your Own</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Greeting />
        <DarkModeToggle onChange={darkMode.toggle} checked={darkMode.value} size={50}/>
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