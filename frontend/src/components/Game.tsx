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
    Modal,
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
    pk: number,
    name: string,
    nickname: string,
    location: number,
    captured: Date | null,
    received: Date | null,
    missed: Date | null,
    stored: Date | null,
    deceased: Date | null,
}
//interface for handling changes to team
interface ICustomTeam {
    teammates: ITeam[],
    member: ITeam,
}
//interface for params to use slug to display 1 game at a time
interface IParams {
    slug: string
}
//initialize state for interfaces
const defaultGames:IGame = {id:0,name:"",region:"",locations:[],slug:""};
const defaultMember:ITeam = {pk:-1,name:"",nickname:"",location:-1,captured:null,received:null,missed:null,stored:null,deceased:null}

function Game(): JSX.Element {
    //states
    const [game,setGame]: [IGame, (games: IGame) => void] = React.useState(defaultGames);
    const [team,setTeam] = React.useState<ICustomTeam>({teammates:[],member:defaultMember});
    const [confirmDel,setConfirmDel] : [boolean, (confirmDel: boolean) => void] = React.useState<boolean>(false);
    
    const handleYesDel = () => setConfirmDel(true);
    const handleNoDel = () => setConfirmDel(false);
    const handleChecked = (d:Date | null) => {return (d !== null) ? true : false}

    //params
    const { slug } = useParams<IParams>();
    
    //onChange events
    const handleChgInput = (e: React.ChangeEvent<HTMLInputElement>,loc:number) => {
        e.preventDefault();
        const target = e.target;
        const evalue = target.value;
        const ename = target.name;
        let tempArr = [...team.teammates];
        const myRowIndex = tempArr.findIndex((row) => row.location === loc);
        if(myRowIndex !== -1){tempArr[myRowIndex] = {...tempArr[myRowIndex], [ename]:evalue};}
        else{tempArr.push({...team.member, location:loc, [ename]:evalue})}
        setTeam({teammates:tempArr,member:defaultMember});
    }
    const handleChgStatus = (e: React.ChangeEvent<HTMLInputElement>,loc:number) => {
        e.preventDefault();
        const target = e.target;
        const ename = target.name;
        let tempArr = [...team.teammates];
        const myRowIndex = tempArr.findIndex((row) => row.location === loc);
        let dateNull: Date | null = (e.target.checked) ? new Date(Date.now()) : null
        if(myRowIndex !== -1){tempArr[myRowIndex] = {...tempArr[myRowIndex], [ename]:dateNull}}
        else{tempArr.push({...team.member,location:loc,[ename]:dateNull})}
        setTeam({teammates:tempArr,member:defaultMember});
    }
    //onClick events
    //create history and increment completed runs when 'End Run' button is pressed
    
    const handleEnd = async (g:IGame) => {
        try {
            const responseCompleteRuns = await axiosInstance.patch('accounts/profile/update/1');
            const responseHistory = await axiosInstance.post('api/history/create/' + g.id.toString());
            console.log(responseCompleteRuns);
            console.log(responseHistory);
        } catch (error) { throw(error); }
        window.location.replace("http://127.0.0.1:3000/history/");
    }
    //create/update current team with changes in members
    const handleCreatePatch = () => {
        try {
            console.log(team.teammates.map(tm => {
                if(tm.pk === -1 && tm.name !== defaultMember.name){
                    return axiosInstance.post(("api/team/" + game.id + "/"),{
                        name:tm.name,nickname:tm.nickname,location:tm.location,
                        captured:tm.captured,received:tm.received,missed:tm.missed,
                        stored:tm.stored,deceased:tm.deceased
                    });
                }
                else{
                    return axiosInstance.patch(("api/team/" + tm.pk),{
                        name:tm.name,nickname:tm.nickname,location:tm.location,
                        captured:tm.captured,received:tm.received,missed:tm.missed,
                        stored:tm.stored,deceased:tm.deceased
                    });
                }}));
        } catch (error) { throw(error); }
        window.location.reload();
    }
    //delete current team
    const handleDelete = () => {
        console.log(team.teammates.map(tm => {
            const responseDelete = axiosInstance.delete(("api/team/" + tm.pk + "/"));
            return responseDelete;
        }));
        setTeam({teammates:[],member:defaultMember});
    }
    //effects
    //GET Game Details FROM API
    React.useEffect(() => {
        axios
            .get<IGame>(("http://127.0.0.1:8000/api/game/" + slug + "/"), { headers: {
                "Content-Type": "applications/json",
                "Accept": "application/json",
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
                setTeam({teammates:response.data,member:defaultMember});
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

    //table building variables
    var teamIndex:number = 0;
    var currTI:number = teamIndex;
    return( 
        <div>
            <Button disabled={(localStorage.getItem('access_token') === null)} className="myBtn" size="lg" onClick={handleCreatePatch}>Submit Changes</Button>
            <Container fluid>
                <Row className="row align-items-center">
                    <Col md={{ span: 1, offset: 0 }}><h5>{game.region}</h5></Col>
                    <Col md={{ span: 6, offset: 2 }}><h1>{game.name}</h1></Col>
                    <Col md={{ span: 1, offset: 2 }}>
                        <Button onClick={() => {handleEnd(game)}} >End Run</Button>
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
                            {(localStorage.getItem('access_token')) ? game.locations.map((loc,index) => {
                                currTI = teamIndex;
                                if(team.teammates[currTI] !== undefined && teamIndex < team.teammates.length){
                                    if(team.teammates[teamIndex].location === index){
                                        teamIndex++;
                                        return <tr key={index}>
                                            <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                                            <td><Form.Control type="text" name="name" id={("name" + index)} value={team.teammates[currTI].name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgInput(e,index)}}/></td>
                                            <td><Form.Control type="text" name="nickname" id={("nickname" + index)} value={team.teammates[currTI].nickname} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgInput(e,index)}}/></td>
                                            <td><Form.Check custom type="checkbox" name="captured" id={("captured" + index)} checked={handleChecked(team.teammates[currTI].captured)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                            <td><Form.Check custom type="checkbox" name="received" id={("received" + index)} checked={handleChecked(team.teammates[currTI].received)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                            <td><Form.Check custom type="checkbox" name="missed" id={("missed" + index)} checked={handleChecked(team.teammates[currTI].missed)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                            <td><Form.Check custom type="checkbox" name="stored" id={("stored" + index)} checked={handleChecked(team.teammates[currTI].stored)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                            <td><Form.Check custom type="checkbox" name="deceased" id={("deceased" + index)} checked={handleChecked(team.teammates[currTI].deceased)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                        </tr>
                                    }
                                }
                                return <tr key={index}>
                                    <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                                    <td><Form.Control type="text" name="name" id={("name" + index)} value={team.member.name} placeholder="Pokemon" onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgInput(e,index)}}/></td>
                                    <td><Form.Control type="text" name="nickname" id={("nickname" + index)} value={team.member.nickname} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgInput(e,index)}}/></td>
                                    <td><Form.Check custom type="checkbox" name="captured" id={("captured" + index)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                    <td><Form.Check custom type="checkbox" name="received" id={("received" + index)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                    <td><Form.Check custom type="checkbox" name="missed" id={("missed" + index)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                    <td><Form.Check custom type="checkbox" name="stored" id={("stored" + index)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                    <td><Form.Check custom type="checkbox" name="deceased" id={("deceased" + index)} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleChgStatus(e,index)}}/></td>
                                </tr>
                            }) : game.locations.map((loc,index) => {
                                return <tr key={index}>
                                    <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                                    <td><Form.Control type="text" placeholder="Pokemon" /></td>
                                    <td><Form.Control type="text" /></td>
                                    <td><Form.Check custom type="checkbox" id="captured" /></td>
                                    <td><Form.Check custom type="checkbox" id="received" /></td>
                                    <td><Form.Check custom type="checkbox" id="missed" /></td>
                                    <td><Form.Check custom type="checkbox" id="stored" /></td>
                                    <td><Form.Check custom type="checkbox" id="deceased" /></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Form>
                <Row className="row align-items-center">
                    <Col>
                        <ButtonGroup>
                            <Button onClick={() => {console.log(team)}}>Print Team</Button>
                            <Button disabled={(team.teammates.length === 0)}>Export</Button>
                            <Button disabled={(team.teammates.length === 0)} onClick={handleYesDel}>Clear</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <br></br>
                <Modal show={confirmDel} onHide={handleNoDel} size="sm" aria-labelledby="container-modal-title-vcenter" centered>
                    <Modal.Header style={{margin: "0 auto",}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Delete Team?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ButtonGroup>
                            <Button onClick={handleDelete}>YES</Button>
                            <Button onClick={handleNoDel}>NO</Button>
                        </ButtonGroup>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    )
}

export default Game;
