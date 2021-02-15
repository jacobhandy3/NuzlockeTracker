import React from 'react';
import axiosInstance from "../../axiosAPI";
import {
    Button,
    Container, Row, Col,
    Form, FormControl,
    InputGroup,
    Table,
    OverlayTrigger, Tooltip,
 } from 'react-bootstrap';
 import slugify from 'slugify';

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
            const response = await axiosInstance.post('/api/game/create/', {
                name: games.name,
                region: games.region,
                locations: games.locations,
                slug: slugify(games.name,{lower:true,strict:true}),
            })
            console.log(response)
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
    const handleLocations = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter")
        {
            setGames({
                name: games.name,
                region: games.region,
                locations: [...games.locations, loc],
            });
            setLoc("");
        }
    }
    const handleDelLoc = (i:number) => {
        const locList = [...games.locations];
        locList.splice(i,1);
        setGames({name: games.name,region: games.region,locations: locList});
    }

    return(
        <div>
            <Container fluid>
                <Row className="row align-items-center">
                    <Col md={{ span: 1, offset: 0 }}>
                        <Button href="http://127.0.0.1:3000/">Cancel</Button>
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
                                <FormControl name="version" type="text" placeholder="Name of the game" value={games.name}
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
                                <FormControl name="region" type="text" placeholder="Name of the Region" value={games.region}
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
                                <FormControl name="locations" placeholder="Name of Towns, Cities, Routes, etc."
                                as="input" type="string" value={loc} onChange={handleChange_loc} onKeyPress={handleLocations}/>
                            </InputGroup>
                            <Form.Text id="passwordHelpBlock" muted>Press Enter to Submit</Form.Text>
                        </Col>
                    </Form.Group>
                </Form>
                <h5>Location List</h5>
                <Table responsive="sm">
                    <tbody>
                        {games.locations.map((loc,index) => {
                            return <tr key={index}>
                                <td style={{ borderTop: '0px' }}>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Click to delete</Tooltip>}>
                                        <span className="d-inline-block">
                                            <Button variant="link" style={{ color: '#28a745' }} size="lg" onClick={()=>{handleDelLoc(index)}}>{loc}</Button>
                                        </span>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default CreateGame;