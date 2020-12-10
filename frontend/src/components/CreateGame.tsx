import React from 'react';
import axios from 'axios';
import {
    Button,
    Container, Row, Col,
    Form,
  } from 'react-bootstrap';

function CreateGame(): JSX.Element {
    //states
    //effects
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Button>Cancel</Button>
                    </Col>
                    <Col><h2>Add Custom Game</h2></Col>
                    <Col>
                        <Button>Done</Button>
                    </Col>
                </Row>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextUsername">
                        <Form.Label column sm="2">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="Username" />
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
}

export default CreateGame;

// TODO:
//      MAKE FORM APPEAR AS INTENDED
//      API FUNCTIONALITY