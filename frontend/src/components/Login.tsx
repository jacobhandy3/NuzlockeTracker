import React from 'react';
import axiosInstance from "../axiosAPI";
import { Modal,Button,Form,Row,Col } from "react-bootstrap";

interface IUserLogin {
    username: string,
    password: string,
}

const defaultLogin:IUserLogin = {username:"",password:""}

function LoginModal() {
    //states
    const [show, setShow]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);
    const [login,setLogin]: [IUserLogin, (user: IUserLogin) => void] = React.useState(defaultLogin);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleChange_user = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            username:e.target.value,
            password:login.password,
        });
    }
    const handleChange_pass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            username:login.username,
            password:e.target.value
        });
    }
        
    const handleSubmit = async () => {
        try{
            const response = await axiosInstance.post('api/token/', {
                username: login.username,
                password: login.password,
            });
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            localStorage.setItem('access_token',response.data.access);
            localStorage.setItem('refresh_token',response.data.refresh);
            window.location.reload();
        }
        catch(error){throw error;}
    }
    return (
        <>
            <Button onClick={handleShow}>Login</Button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextUsername">
                            <Form.Label column sm="2">
                                Username
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                name="username"
                                type="text"
                                placeholder="Username" 
                                value={login.username}
                                onChange={handleChange_user}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password" 
                                value={login.password}
                                onChange={handleChange_pass}/>
                            </Col>
                        </Form.Group>
                        <Button onClick={handleSubmit}>Login</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal;
// TODO:
//      LOGIN FUNCTIONALITY