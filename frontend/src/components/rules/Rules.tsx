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
            rules.push({title:customRule.title,body:customRule.body,slug:slugify(customRule.title,{lower:true,strict:true})});
            handleClose();
        } catch (error) {
            throw error;
        }
    }
    //handle changes of Form Controls for new rule
    const handle_new_rule_title = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomRule({
            title:e.target.value,
            body:customRule.body,
        });
    }
    const handle_new_rule_body = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomRule({
            title:customRule.title,
            body:e.target.value
        });
    }
    //handle changes of Form Controls for new rules
    const handleUpdate_title = (e: React.ChangeEvent<HTMLInputElement>,i:number) => {
        const rulesCopy = [...rules];
        rulesCopy[i].title = e.target.value;
        setRules(rulesCopy);
    }
    const handleUpdate_body = (e: React.ChangeEvent<HTMLInputElement>, i:number) => {
        const rulesCopy = [...rules];
        rulesCopy[i].body= e.target.value;
        setRules(rulesCopy);
    }
    //handle deletion of user's custom rules
    const handleDelete = async (r:IRule, i:number) => {
        const ruleList = [...rules];
        ruleList.splice(i,1);
        setRules(ruleList);
        const responseDelete = await axiosInstance.delete('api/rules/' + r.slug);
        console.log(responseDelete);
    }
    //handle patch of user's custom rules
    const handlePatch = async (r:IRule) => {
        try {
            const responsePatch = await axiosInstance.patch(('api/rules/' + r.slug + "/"), {
                title: r.title,
                body: r.body,
                slug: slugify(r.title,{lower:true,strict:true}),
            });
            console.log(responsePatch);
            handleEdit();
        } catch (error) {
            throw error;
        }
    }

    //effects
    //GET API call for rules
    React.useEffect(() => {
        axios
            .get<IRule[]>("http://127.0.0.1:8000/api/rules/", { headers: 
            {
                "Content-Type": "applications/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token'),
            } })
            .then(response => {
            setRules(response.data);
            setLoading(false);
            },
            (error) => {
                setLoading(true);
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

    return(
        <>
        <header className="App-header">
            <h1 style={{color:'#28a745'}}>The Nuzlocke Challenge</h1>
            <Image src={comic} alt="comic" fluid />
            <p style={{color:'#28a745'}}>
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
                {rules.map((r,index) => {
                    // if the rule has a slug resembling the required rules then display the card with just its contents
                    return (r.slug.includes("rule-no-")) ? <Card key={index} bg="success" text="white">
                        <Card.Body>
                            <Card.Title>{r.title}</Card.Title>
                            <Card.Text>{r.body}</Card.Text>
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
                                        <Form.Control value={r.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleUpdate_title(e,index)}}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextNewBody">
                                    <Form.Label column sm="2">
                                        Body
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control as="textarea" rows={3} value={r.body} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleUpdate_body(e,index)}}/>
                                    </Col>
                                </Form.Group>
                            </Form>
                            <ButtonGroup size="sm">
                                    <Button variant="dark" size ="sm" onClick={() => {handlePatch(r)}}>save</Button>
                                    <Button variant="dark" size="sm" onClick={handleEdit}>cancel</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                    //otherwise just a regular card with update and delete buttons
                    : <Card key={index} bg="success" text="white">
                        <Card.Body>
                            <Row>
                                <Col md={{ span: 1, offset: 0 }}><Button variant="success" size="sm" onClick={handleEdit}><EditIcon/></Button></Col>
                                <Col md={{ span: 6, offset: 2 }}><Card.Title>{r.title}</Card.Title></Col>
                                <Col md={{ span: 1, offset: 1 }}><Button variant="success" size="sm" onClick={() => handleDelete(r,index)}><HighlightOffIcon/></Button></Col>
                            </Row>
                            <Card.Text>{r.body}</Card.Text>
                        </Card.Body>
                    </Card>})}
            </CardColumns>
            <Button onClick={handleShow}>Add a Rule</Button>
            {/* Modal with the Add Rule Form */}
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{color: 'black'}}><h3>Add a Rule</h3></Modal.Header>
                <Modal.Body style={{color: 'black'}}>
                <Form>
                        <Form.Group as={Row} >
                            <Form.Label column md={{ span: 1, offset: 0 }}>
                                <h5>Title</h5>
                            </Form.Label>
                            <Col md={{ span: 11, offset: 0 }}>
                                <Form.Control value={customRule.title} onChange={handle_new_rule_title} placeholder="Name of the Rule"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Form.Label column md={{ span: 1, offset: 0 }}>
                                <h5>Body</h5>
                            </Form.Label>
                            <Col md={{ span: 11, offset: 0 }}>
                                <Form.Control as="textarea" rows={5} value={customRule.body} onChange={handle_new_rule_body} placeholder="Rule Description"/>
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