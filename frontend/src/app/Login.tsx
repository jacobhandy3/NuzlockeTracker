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
            <Button onClick={handleShow} variant="dark">Login</Button>
            <Modal show={show} onHide={handleClose} size="sm" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header style={{margin: "0 auto",color: 'black'}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{color: 'black'}}>
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextUsername">
                            <Col>
                                <Form.Control
                                name="username"
                                type="text"
                                placeholder="Username" 
                                value={login.username}
                                onChange={handleChange_user}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Col>
                                <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password" 
                                value={login.password}
                                onChange={handleChange_pass}/>
                            </Col>
                        </Form.Group>
                        <Row><Col md={{ span: 1, offset: 4 }}><Button onClick={handleSubmit}>Submit</Button></Col></Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginModal;