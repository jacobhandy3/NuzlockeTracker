import React from 'react';
import axios from 'axios';
import axiosRefresh from "../refreshToken";
import { Modal,Button,Form,Row,Col } from "react-bootstrap";

interface IProfile {
    user_name: string,
    user_join: Date,
    completed_runs: number,
}
const defaultProfile:IProfile = {user_name:"",user_join:new Date(Date.now()),completed_runs:0}

function ProfileModal() {
    //states
    const [profile,setProfile]: [IProfile, (profile: IProfile) => void] = React.useState(defaultProfile);
    const [show, setShow]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //effects
    //get current user info
    React.useEffect(() => {
        axios.get<IProfile>("http://127.0.0.1:8000/accounts/profile/", {headers: {
            "Content-Type": "applications/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token')
        }})
        .then(response => {
            setProfile(response.data);
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
    },[]);
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
                                <Form.Control plaintext readOnly defaultValue={profile.user_name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col><Button href="http://127.0.0.1:8000/accounts/profile/password_change/">Change</Button></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextJoinedDate">
                            <Form.Label column sm="2">
                                Joined
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(profile.user_join))} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCompleteRuns">
                            <Form.Label column sm="2">
                                Completed Runs
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={profile.completed_runs} />
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