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
        let unmounted = false;
        axios.get<IProfile>("http://127.0.0.1:8000/accounts/profile/", {headers: {
            "Content-Type": "applications/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token')
        }})
        .then(response => {
            if(!unmounted){setProfile(response.data);}
            })
        .catch(async function (error) {
            if(error.response.status === 401 && localStorage.getItem('refresh_token') !== null && !unmounted) {
                try {
                    await axiosRefresh.post('', {
                        refresh: localStorage.getItem('refresh_token')
                    })
                    .then(response => {
                        localStorage.setItem('access_token',response.data.access);
                    })
                    .catch(async function (err) {
                        localStorage.clear();
                    });
                } catch (error) {
                    throw(error);
                }
                window.location.reload();
            }
        });
        return () => { unmounted = true };
    },[]);
    return (
        <>
            <Button onClick={handleShow} variant="dark">Profile</Button>
            <Modal show={show} onHide={handleClose} size="sm" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{color: 'black'}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: 'black'}}>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextUsername">
                            <Col><Form.Label column >
                                Username
                            </Form.Label></Col>
                            <Col>
                                <Form.Control plaintext readOnly defaultValue={profile.user_name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col><Form.Label column >
                                Password
                            </Form.Label></Col>
                            <Col><Button href="http://127.0.0.1:8000/accounts/profile/password_change/">Change</Button></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextJoinedDate">
                            <Col><Form.Label column >
                                Joined
                            </Form.Label></Col>
                            <Col>
                                <Form.Control plaintext readOnly defaultValue={Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(profile.user_join))} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextCompleteRuns">
                            <Col><Form.Label column >
                                Completed Runs
                            </Form.Label></Col>
                            <Col>
                                <Form.Control plaintext readOnly defaultValue={profile.completed_runs} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProfileModal;