import React from 'react';
import axiosInstance from "../axiosAPI";
import { Modal,Button,Form,Row,Col, } from "react-bootstrap";

//interface for new users
interface InewUser {
    username: string,
    password: string,
    passwordConfirm: string,
}
const defaultUser:InewUser = {username:"",password:"",passwordConfirm:""}
function SignUpModal() {
    const [user,setUser]: [InewUser, (user:InewUser) => void] = React.useState(defaultUser);
    const [show, setShow]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            username: e.target.value,
            password: user.password,
            passwordConfirm: user.passwordConfirm
        })
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            username: user.username,
            password: e.target.value,
            passwordConfirm: user.passwordConfirm
        })
    }
    const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            username: user.username,
            password: user.password,
            passwordConfirm: e.target.value,
        })
    }
    const handleSubmit = async () => {
        try{
            if(user.password === user.passwordConfirm){
                const response = await axiosInstance.post('accounts/profile/create/', {
                    username: user.username,
                    password: user.password,
                });
                console.log(response);
                window.location.reload();
            }
            else{
                console.log("Password does not match confirmation password!");
            }
        }
        catch(error){throw error;}
    }

    return (
        <>
            <Button onClick={handleShow}>Sign Up</Button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header style={{margin: "0 auto",}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicUsername">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Username</Form.Label>
                            <Col md={{ span: 7, offset: 1 }}><Form.Control placeholder="Enter a Unique Name" value={user.username} onChange={handleUsername}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPassword1">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Password</Form.Label>
                            <Col md={{ span: 7, offset: 1 }}><Form.Control type="password" placeholder="Enter a Password" value={user.password} onChange={handlePassword}/></Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column md={{ span: 3, offset: 1 }}>Confirm Password</Form.Label>
                            <Col md={{ span: 7, offset: 0 }}><Form.Control type="password" placeholder="Enter the Password Again" value={user.passwordConfirm} onChange={handlePasswordConfirm}/></Col>
                        </Form.Group>
                        <Form.Group as={Row}><Col md={{ span: 10, offset: 1 }}><Button onClick={handleSubmit} block size="lg">Submit</Button></Col></Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignUpModal;