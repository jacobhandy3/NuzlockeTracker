import React from 'react';
import axiosInstance from "../axiosAPI";
import { Modal,Button,Form } from "react-bootstrap";

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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" value={user.username} onChange={handleUsername}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={user.password} onChange={handlePassword}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={user.passwordConfirm} onChange={handlePasswordConfirm}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignUpModal;