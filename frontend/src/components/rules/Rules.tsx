import React from 'react';
import axios from 'axios';
import comic from './assets/Basic_Nuzlocke_rules.webp';
import axiosInstance from "../../axiosAPI";
import axiosRefresh from "../../refreshToken";
import {
  Button, ButtonGroup,
  Container, Row, Col,
  CardColumns, Card,
  Modal,
  Form,
  Image,
} from 'react-bootstrap';
import slugify from 'slugify';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//interface for rules sent by API
interface IRule {
    title: string;
    body: string;
    slug: string,
}
//interface for creating new rules
interface newRule {
    title: string;
    body: string;
}
//initialize state for interfaces
const defaultRules:IRule[] = [];

function Rules(): JSX.Element {
    //states
    const [rules,setRules]: [IRule[], (rules: IRule[]) => void] = React.useState(defaultRules);
    const [customRule,setCustomRule]: [newRule,(customRule: newRule) => void] = React.useState({title:"",body:""})
    const [updateRule,setUpdateRule]: [newRule,(customRule: newRule) => void] = React.useState({title:"",body:""})
    const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
    const [show, setShow]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);
    const [edit,setEdit]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    //handle Add Rule Modal show/close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //handle Edit Rule condition to make card with forms or not
    const handleEdit = () => setEdit(!edit);

    //handle submission of new rules
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post('api/rules/', {
                title: customRule.title,
                body: customRule.body,
                slug: slugify(customRule.title,{lower:true,strict:true}),
            });
            console.log(response);
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }
    //handle changes of Form Controls for new rules
    const handleChange_title = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomRule({
            title:e.target.value,
            body:customRule.body,
        });
    }
    const handleChange_body = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomRule({
            title:customRule.title,
            body:e.target.value
        });
    }
    //handle changes of Form Controls for new rules
    const handleUpdate_title = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateRule({
            title:e.target.value,
            body:updateRule.body,
        });
    }
    const handleUpdate_body = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateRule({
            title:updateRule.title,
            body:e.target.value
        });
    }
    //handle deletion of user's custom rules
    const handleDelete = async (slug:string) => {
        const responseDelete = await axiosInstance.delete('api/rules/' + slug);
        console.log(responseDelete);
        window.location.reload();
    }
    //handle patch of user's custom rules
    const handlePatch = async (slug:string) => {
        try {
            const responsePatch = await axiosInstance.patch(('api/rules/' + slug + "/"), {
                title: updateRule.title,
                body: updateRule.body,
                slug: slugify(updateRule.title,{lower:true,strict:true}),
            });
            console.log(responsePatch);
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    //effects
    //required http headers for the API call
    let auth:{[name:string]:string} = {
        "Content-Type": "applications/json",
        "Accept": "application/json",
    }
    //verify access token exists before making the GET request and add the 'Authorization' header
    if(localStorage.getItem('access_token')!=null){auth.Authorization = "Bearer " + localStorage.getItem('access_token');}
    //GET API call for rules
    React.useEffect(() => {
        axios
            .get<IRule[]>("http://127.0.0.1:8000/api/rules/", { headers: auth })
            .then(response => {
            setRules(response.data);
            setLoading(false);
            },
            (error) => {
                setLoading(true);
            });
    },[]);

    return(
        <>
        <header className="App-header">
            <h1 style={{color:'green'}}>The Nuzlocke Challenge</h1>
            <Image src={comic} alt="comic" fluid />
            <p style={{color:'green'}}>
                A set of rules intended to create a higher level of difficulty while playing the Pokémon games.
            </p>
            <a className="App-link"
            href="http://www.nuzlocke.com/comics/pokemon-hard-mode/page/69/" target="_blank" rel="noopener noreferrer">
                View the Comic
            </a>
        </header>
        {/* Container to hold Rules title and button to find suggested rules for Nuzlocke Challenge */}
        <Container fluid>
            <Row className="row align-items-center">
                <Col md={{ span: 2, offset: 5 }}><h1>Rules</h1></Col>
                <Col md={{ span: 2, offset: 3 }}>
                    <Button href="https://bulbapedia.bulbagarden.net/wiki/Nuzlocke_Challenge" variant="info">
                        Learn More
                    </Button>
                </Col>
            </Row>
        </Container>
        <Container fluid>
            {/* Display the card with rules as card columns */}
            <CardColumns>
                {/* loop through rules and display them in cards with conditional content */}
                {rules.map((rule,index) => {
                    // if the rule has a slug resembling the required rules then display the card with just its contents
                    return (rule.slug.includes("rule-no-")) ? <Card key={index} bg="success" text="white">
                        <Card.Body>
                            <Card.Title>{rule.title}</Card.Title>
                            <Card.Text>{rule.body}</Card.Text>
                        </Card.Body>
                    </Card>
                    //if edit is true make card with forms to update
                    //and add button to save
                    : (edit) ? <Card key={index} bg="success" text="white">
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextNewTitle">
                                    <Form.Label column sm="2">
                                        Title
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder={rule.title} value={updateRule.title} onChange={handleUpdate_title}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextNewBody">
                                    <Form.Label column sm="2">
                                        Body
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="textarea" placeholder={rule.body} value={updateRule.body} onChange={handleUpdate_body}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <ButtonGroup size="sm">
                                    <Button variant="dark" size ="sm" onClick={() => {handlePatch(rule.slug)}}>save</Button>
                                    <Button variant="dark" size="sm" onClick={() => handleDelete(rule.slug)}>delete</Button>
                                    <Button variant="dark" size="sm" onClick={handleEdit}>cancel</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                    //otherwise just a regular card with update and delete buttons
                    : <Card key={index} bg="success" text="white">
                        <Card.Body>
                            <Row>
                                <Col md={{ span: 1, offset: 0 }}><Button variant="success" size="sm" onClick={handleEdit}><EditIcon/></Button></Col>
                                <Col md={{ span: 6, offset: 2 }}><Card.Title>{rule.title}</Card.Title></Col>
                                <Col md={{ span: 1, offset: 1 }}><Button variant="success" size="sm" onClick={() => handleDelete(rule.slug)}><HighlightOffIcon/></Button></Col>
                            </Row>
                            <Card.Text>{rule.body}</Card.Text>
                        </Card.Body>
                    </Card>})}
            </CardColumns>
            <Button onClick={handleShow}>Add a Rule</Button>
            {/* Modal with the Add Rule Form */}
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header closeButton><h3>Add a Rule</h3></Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group as={Row} >
                            <Form.Label column md={{ span: 1, offset: 0 }}>
                                <h5>Title</h5>
                            </Form.Label>
                            <Col md={{ span: 11, offset: 0 }}>
                                <Form.Control value={customRule.title} onChange={handleChange_title} placeholder="Name of the Rule"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column md={{ span: 1, offset: 0 }}>
                                <h5>Body</h5>
                            </Form.Label>
                            <Col md={{ span: 11, offset: 0 }}>
                                <Form.Control as="textarea" value={customRule.body} onChange={handleChange_body} placeholder="Rule Description"/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{margin: "0 auto",}}><Button onClick={handleSubmit}>Submit</Button></Modal.Footer>
            </Modal>
        </Container>
        <br></br>
        </>
    )}

export default Rules;