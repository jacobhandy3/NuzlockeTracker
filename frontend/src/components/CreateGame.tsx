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
            const response = await axiosInstance.post('/game/create/', {
                name: games.name,
                region: games.region,
                locations: games.locations,
            })
            console.log(response)
        } catch (error) {
            throw error;
        }
    }
    const handleChange_loc = (e: React.ChangeEvent<HTMLInputElement>) => {setLoc(e.target.value);}
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
    const handleLocations = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter")
        {
            setGames({
                name: games.name,
                region: games.region,
                locations: [...games.locations, loc],
            });
        }
        
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
                    <Form.Group as={Row}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Location</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                name="locations"
                                as="input"
                                type="string"
                                value={loc}
                                onChange={handleChange_loc}
                                onKeyPress={handleLocations}/>
                            </InputGroup>
                            <Form.Text id="passwordHelpBlock" muted>Press Enter to Submit</Form.Text>
                        </Col>
                    </Form.Group>
                    <br></br>
                    <h5>Location List</h5>
                    <ListGroup variant="flush">
                        {games.locations.map(loc => {
                            return <ListGroup.Item variant="success">{loc}</ListGroup.Item>
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