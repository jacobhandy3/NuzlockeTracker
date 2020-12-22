import React from 'react';
import axios from 'axios';
import axiosInstance from "../axiosAPI";
import axiosRefresh from "../refreshToken";
import { useParams } from 'react-router-dom';
import {
    Button, ButtonGroup,
    Container, Row, Col,
    Table,
    Form,
  } from 'react-bootstrap';

//interface for games from API
interface IGame {
    id: number,
    name: string,
    region: string,
    locations: Array<string>,
    slug: string,
  }
  //interface for list of teammates from API
interface ITeam {
    name: string,
    nickname: string,
    location: number,
    captured: Date,
    received: Date,
    missed: Date,
    stored: Date,
    deceased: Date,
}
//interface for params to use slug to display 1 game at a time
interface IParams {
    slug: string
}
//initialize state for interfaces
const defaultGames:IGame[] = [];
const defaultTeam:ITeam[] = [];

function Game(): JSX.Element {
    //states
    const [games,setGames]: [IGame[], (games: IGame[]) => void] = React.useState(defaultGames);
    const [team,setTeam]: [ITeam[], (team: ITeam[]) => void] = React.useState(defaultTeam);
    //params
    const { slug } = useParams<IParams>();
    //onClick events
    //create history and increment completed runs when 'End Run' button is pressed
    const handleEnd = async (g:IGame) => {
        try {
            const responseCompleteRuns = await axiosInstance.patch('accounts/profile/update');
            const responseHistory = await axiosInstance.post('http://127.0.0.1:8000/api/history/create/' + g.id.toString());
            console.log(responseCompleteRuns);
            console.log(responseHistory);
        } catch (error) { throw(error); }
    }
    //onChange events
    // const handleName = (e: React.ChangeEvent<HTMLInputElement>,i:number) => {
    //     setTeam({
    //         name:e.target.value,
    //         nickname:team[i].nickname,location:team[i].location,captured:team[i].captured,
    //         received:team[i].received,stored:team[i].stored,deceased:team[i].deceased });}
    //effects
    //GET LIST OF GAMES FROM API
    React.useEffect(() => {
        axios
            .get<IGame[]>("http://127.0.0.1:8000/api/game/", { headers: {
                "Content-Type": "applications/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token'),
            }})
            .then(response => {
            setGames(response.data);
            })
            .catch(async function (error) {
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
            });
    }, []);

    return(
        <div>
            {games.map(g => {
                return g.slug === slug ?
                <Container fluid key={g.slug}>
                    <Row className="row align-items-center">
                        <Col md={{ span: 1, offset: 0 }}><h5>{g.region}</h5></Col>
                        <Col md={{ span: 6, offset: 2 }}><h1>{g.name}</h1></Col>
                        <Col md={{ span: 1, offset: 2 }}>
                            <Button onClick={() => handleEnd(g)} href="http://127.0.0.1:3000/history">End Run</Button>
                        </Col>
                    </Row>
                    <Form>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th><div style={{textAlign:'start'}}>Location</div></th>
                                    <th><div style={{textAlign:'start'}}>Name</div></th>
                                    <th><div style={{textAlign:'start'}}>Nickname</div></th>
                                    <th><div style={{textAlign:'start'}}>Captured</div></th>
                                    <th><div style={{textAlign:'start'}}>Received</div></th>
                                    <th><div style={{textAlign:'start'}}>Missed</div></th>
                                    <th><div style={{textAlign:'start'}}>Stored</div></th>
                                    <th><div style={{textAlign:'start'}}>Deceased</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {g.locations.map(loc => {
                                    return <tr>
                                        <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                                        <td><Form.Control type="text" placeholder="Pokemon" /></td>
                                        <td><Form.Control type="text" /></td>
                                        <td><Form.Check custom type="checkbox" id="captured"/></td>
                                        <td><Form.Check custom type="checkbox" id="received"/></td>
                                        <td><Form.Check custom type="checkbox" id="missed"/></td>
                                        <td><Form.Check custom type="checkbox" id="stored"/></td>
                                        <td><Form.Check custom type="checkbox" id="deceased"/></td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Form>
                    <Row className="row align-items-center">
                        <Col>
                            <ButtonGroup>
                                <Button>Import</Button>
                                <Button>Export</Button>
                                <Button onClick={() => {}}>Clear</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <br></br>
                </Container>
                : <div></div>
            })}
        </div>
    )
}

export default Game;