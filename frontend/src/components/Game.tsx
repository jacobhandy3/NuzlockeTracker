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
const defaultGames:IGame = {id:0,name:"",region:"",locations:[],slug:""};
const defaultTeam:ITeam[] = [];

function Game(): JSX.Element {
    //states
    const [game,setGame]: [IGame, (games: IGame) => void] = React.useState(defaultGames);
    const [team,setTeam]: [ITeam[], (team: ITeam[]) => void] = React.useState(defaultTeam);
    //params
    const { slug } = useParams<IParams>();
    
    const handleChecked = (d:Date) => {if(d !== null){return true}}
    //handle table building
    const CreateTable = () => {
        var teamIndex:number = 0;
        var i:number = teamIndex;
        const listItems = game.locations.map((loc,index) => {
            i = teamIndex;
            if(team[teamIndex] !== undefined && teamIndex < team.length){
                if(team[teamIndex].location === index){
                    teamIndex++;
                    return <tr key={index}>
                        <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                        <td><Form.Control type="text" defaultValue={team[i].name}/></td>
                        <td><Form.Control type="text" defaultValue={team[i].nickname}/></td>
                        <td><Form.Check custom type="checkbox" id="captured" checked={handleChecked(team[i].captured)}/></td>
                        <td><Form.Check custom type="checkbox" id="received" checked={handleChecked(team[i].received)}/></td>
                        <td><Form.Check custom type="checkbox" id="missed" checked={handleChecked(team[i].missed)}/></td>
                        <td><Form.Check custom type="checkbox" id="stored" checked={handleChecked(team[i].stored)}/></td>
                        <td><Form.Check custom type="checkbox" id="deceased" checked={handleChecked(team[i].deceased)}/></td>
                    </tr>
                }
            }
            return <tr key={index}>
                <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                <td><Form.Control type="text" placeholder="Pokemon" /></td>
                <td><Form.Control type="text" /></td>
                <td><Form.Check custom type="checkbox" id="captured"/></td>
                <td><Form.Check custom type="checkbox" id="received"/></td>
                <td><Form.Check custom type="checkbox" id="missed"/></td>
                <td><Form.Check custom type="checkbox" id="stored"/></td>
                <td><Form.Check custom type="checkbox" id="deceased"/></td>
            </tr>
        });
        return(<tbody>{listItems}</tbody>);
    }
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
            .get<IGame>(("http://127.0.0.1:8000/api/game/" + slug + "/"), { headers: {
                "Content-Type": "applications/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token'),
            }})
            .then(response => {
            setGame(response.data);
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
    }, [slug]);
    //GET LIST OF TEAMMATES FROM API
    React.useEffect(() => {
        axios
            .get<ITeam[]>(("http://127.0.0.1:8000/api/team/" + game.id + "/"), { headers: {
                "Content-Type": "applications/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token'),
            }})
            .then(response => {
                setTeam(response.data);
            })
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
            });
    }, [game.id]);

    return( 
        <div>
                <Container fluid>
                    <Row className="row align-items-center">
                        <Col md={{ span: 1, offset: 0 }}><h5>{game.region}</h5></Col>
                        <Col md={{ span: 6, offset: 2 }}><h1>{game.name}</h1></Col>
                        <Col md={{ span: 1, offset: 2 }}>
                            <Button onClick={() => handleEnd(game)} href="http://127.0.0.1:3000/history/">End Run</Button>
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
                            <CreateTable />
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
        </div>
    )
}

export default Game;