import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Button, ButtonGroup,
    Container, Row, Col,
    Card,
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
    const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
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
    //params
    const { slug } = useParams<IParams>();

    return(
        <div>
            {games.map(g => {
                return g.slug === slug ?
                <Container fluid key={g.slug}>
                    <Row className="row align-items-center">
                        <Col>{g.region}</Col>
                        <Col md={{ span: 4, offset: 1 }}><h1>{g.name}</h1></Col>
                        <Col md={{ span: 2, offset: 3 }}>
                            <ButtonGroup>
                                <Button>start</Button>
                                <Button>end</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Form>
                        {g.locations.map((loc,index) => {
                            return <Form.Group as={Row} controlId="formPlaintextUsername">
                                <Form.Label column sm="2">
                                    {loc}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control />
                                </Col>
                            </Form.Group>
                        })}
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
                </Container>
                : <div></div>
            })}
        </div>
    )
}

export default Game;

//TODO:
//      MAKE THE FORM APPEAR AS INTENDED
//      BUTTON FUNCTIONALITY