import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Button, ButtonGroup,
    Container, Row, Col,
    Table,
    Form,
  } from 'react-bootstrap';

//interface for games from API
interface IGame {
    name: string,
    region: string,
    locations: Array<string>,
    slug: string,
  }
//interface for params to use slug to display 1 game at a time
interface IParams {
    slug: string
}
//initialize state for interfaces
const defaultGames:IGame[] = [];

function Game(): JSX.Element {
    //states
    const [games,setGames]: [IGame[], (games: IGame[]) => void] = React.useState(defaultGames)
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
            });
    }, []);
    //params
    const { slug } = useParams<IParams>();

    return(
        <div>
            {games.map(g => {
                return g.slug === slug ?
                <Container fluid key={g.slug}>
                    <Row className="row align-items-center">
                        <Col md={{ span: 1, offset: 0 }}><h5>{g.region}</h5></Col>
                        <Col md={{ span: 6, offset: 2 }}><h1>{g.name}</h1></Col>
                        <Col md={{ span: 2, offset: 1 }}>
                            <ButtonGroup>
                                <Button>End Run</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Form>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th><div style={{textAlign:'start'}}>Location</div></th>
                                    <th><div style={{textAlign:'start'}}>Name</div></th>
                                    <th><div style={{textAlign:'start'}}>Nickname</div></th>
                                    <th><div style={{textAlign:'start'}}>Status</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {g.locations.map(loc => {
                                    return <tr>
                                        <td width="25%"><div style={{textAlign:'start'}}><h6>{loc}</h6></div></td>
                                        <td><Form.Control type="text" placeholder="Pokemon" /></td>
                                        <td><Form.Control type="text" /></td>
                                        <td>
                                            <Form.Control as="select" defaultValue="Choose...">
                                                <option>Choose...</option>
                                                <option>Captured</option>
                                                <option>Received</option>
                                                <option>Missed</option>
                                                <option>Stored</option>
                                                <option>Deceased</option>
                                            </Form.Control>
                                        </td>
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
                                <Button>Clear</Button>
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

//TODO:
//      BUTTON FUNCTIONALITY