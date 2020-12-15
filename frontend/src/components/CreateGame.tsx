import React from 'react';
import axiosInstance from "../axiosAPI";
import {
    Button,
    Container, Row, Col,
    Form, FormControl,
    InputGroup,
    ListGroup,
 } from 'react-bootstrap';

interface IGame {
    name: string;
    region: string;
    locations: Array<string>;
}

const defaultGames:IGame = {name:"",region:"",locations:["Starter"]}

function CreateGame(): JSX.Element {
    //states
    const [games,setGames]: [IGame, (games: IGame) => void] = React.useState(defaultGames)
    const [loc,setLoc]: [string,(loc: string) => void] = React.useState("")
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post('/rules/', {
                name: games.name,
                region: games.region,
                locations: games.locations,
            })
        } catch (error) {
            throw error;
        }
    }
    const handleChange_loc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoc(e.target.value);
    }
    const handleChange_version = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGames({
            name: e.target.value,
            region: games.region,
            locations: games.locations,
        });
    }
    const handleChange_region = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGames({
            name: games.name,
            region: e.target.value,
            locations: games.locations,
        });
    }
    const handleLocations = () => {
        setGames({
            name: games.name,
            region: games.region,
            locations: [...games.locations, loc],
        });
    }

    return(
        <div>
            <Container fluid>
                <Row className="row align-items-center">
                    <Col md={{ span: 1, offset: 0 }}>
                        <Button href="http://127.0.0.1:3000/rules/">Cancel</Button>
                    </Col>
                    <Col md={{ span: 6, offset: 2 }}><h2>Add Custom Game</h2></Col>
                    <Col md={{ span: 1, offset: 2 }}>
                        <Button onClick={handleSubmit}>Done</Button>
                    </Col>
                </Row>
                <br></br>
                <Form>
                    <Form.Group as={Row} className="row align-items-center">
                        <Col md={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Version</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                name="version"
                                type="text"
                                value={games.name}
                                onChange={handleChange_version}/>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Region</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                name="region"
                                type="text"
                                value={games.region}
                                onChange={handleChange_region}/>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <h5>Locations</h5>
                    <Form.Group as={Row}>
                        <Col md={{ span: 2, offset: 5 }}>
                            <InputGroup className="mb-3">
                                <FormControl
                                name="locations"
                                type="text"
                                value={loc}
                                onChange={handleChange_loc}/>
                            </InputGroup>
                        </Col>
                        <Col md={{ span: 2, offset: 3 }}><Button onClick={handleLocations}>Add Location</Button></Col>
                    </Form.Group>
                    <ListGroup variant="flush">
                        {games.locations.map(loc => {
                            return <ListGroup.Item>{loc}</ListGroup.Item>
                        })}
                    </ListGroup>
                </Form>
            </Container>
        </div>
    )
}

export default CreateGame;

// TODO:
//      API FUNCTIONALITY