import React from 'react';
import axios from 'axios';
import {
    Button,
    Container, Row, Col,
    Form, FormControl,
    InputGroup,
    ListGroup,
 } from 'react-bootstrap';

function CreateGame(): JSX.Element {
    //states
    return(
        <div>
            <Container fluid>
                <Row className="row align-items-center">
                    <Col md={{ span: 1, offset: 0 }}>
                        <Button>Cancel</Button>
                    </Col>
                    <Col md={{ span: 6, offset: 2 }}><h2>Add Custom Game</h2></Col>
                    <Col md={{ span: 1, offset: 2 }}>
                        <Button>Done</Button>
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
                                <FormControl/>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Region</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl/>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <h5>Locations</h5>
                    <input type="text"></input>
                    <Button>Add a Location</Button>
                    <ListGroup variant="flush">
                        <ListGroup.Item></ListGroup.Item>
                    </ListGroup>
                </Form>
            </Container>
        </div>
    )
}

export default CreateGame;

// TODO:
//      INPUT/BUTTON FUNCTIONALITY
//      API FUNCTIONALITY