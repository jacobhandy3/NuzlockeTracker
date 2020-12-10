import React from 'react';
import axios from 'axios';
import { Modal,Button,Form,Row,Col } from "react-bootstrap";

interface IProfile {
    username: string,
    date_joined: Date,
    completed_runs: number,
}
const defaultProfile:IProfile[] = []

function ProfileModal() {
    const [profile,setProfile]: [IProfile[], (profile: IProfile[]) => void] = React.useState(defaultProfile);
    const [show, setShow]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow}>Profile</Button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextUsername">
                            <Form.Label column sm="2">
                                Username
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue="profile[0].username" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextJoinedDate">
                            <Form.Label column sm="2">
                                Joined
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue="Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(profile[0].date_joined))" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCompleteRuns">
                            <Form.Label column sm="2">
                                Completed Runs
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue="profile[0].completed_runs" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileModal;
// TODO:
//      PASSWORD CHANGE FUNCTIONALITY
//      GET PROFILE INFO IN useEffect()