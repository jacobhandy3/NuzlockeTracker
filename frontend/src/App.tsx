import React from 'react';
import axios from 'axios';
import comic from './assets/Basic_Nuzlocke_rules.webp';
import './App.css';
import {
  ButtonGroup,
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
  //states
  const [games,setGames]: [IGame[], (games: IGame[]) => void] = React.useState(defaultGames)
  const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
  const [error,setError]: [string, (error:string) => void] = React.useState("");
  //effects
  //GET LIST OF GAMES FROM API
  React.useEffect(() => {
    axios
        .get<IGame[]>("http://127.0.0.1:8000/api/game/")
        .then(response => {
          setGames(response.data);
          setLoading(false);
        });
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>Nuzlocke Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/rules">Rules</Nav.Link>
            <NavDropdown title="Games" id="collasible-nav-dropdown">
              {games.map(g => {
              return <NavDropdown.Item href={"/game/" + g.slug}>{g.name}</NavDropdown.Item>
            })}
            <NavDropdown.Item href={"/create-game"}>Create Your Own</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ButtonGroup>
          <LoginModal />
          <SignUpModal />
          <ProfileModal />
        </ButtonGroup>
      </Navbar>
      <header className="App-header">
        <h1>The Nuzlocke Challenge</h1>
        <img src={comic} alt="comic" />
          <p>
          A set of rules intended to create a higher level of difficulty while playing the Pokémon games.
          </p>
          <a
            className="App-link"
            href="http://www.nuzlocke.com/comics/pokemon-hard-mode/page/69/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the Comic
          </a>
      </header>
      <Switch>
        {/*"exact" ensures path is exact match for what is loaded,
        otherwise rules will always be displayed*/}
        <Route exact={true} path="/rules" component={Rules} primary={true}/>
        <Route path="/game/:slug" component={Game}/>
        <Route path="/history" component={History}/>
        <Route path="/create-game" component={CreateGame}/>
      </Switch>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;