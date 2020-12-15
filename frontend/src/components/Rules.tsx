import React from 'react';
import axios from 'axios';
import axiosInstance from "../axiosAPI";
import {
  Button,
  Container, Row, Col,
  CardColumns, Card,
} from 'react-bootstrap';

//interface for rules sent by API
interface IRule {
    title: string;
    body: string;
    slug: string,
}
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
    
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post('/rules/', {
                title: customRule.title,
                body: customRule.body,
            })
        } catch (error) {
            throw error;
        }
    }
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

    //effects
    //GET LIST OF RULES FROM API
    let auth:{[name:string]:string} = {
        "Content-Type": "applications/json",
        "Accept": "application/json",
    }
    if(localStorage.getItem('access_token')!=null){auth.Authorization = "Bearer " + localStorage.getItem('access_token');}
    React.useEffect(() => {
        axios
            .get<IRule[]>("http://127.0.0.1:8000/api/rules/", { headers: auth })
            .then(response => {
            setRules(response.data);
            setLoading(false);
            },
            (error) => {
                setLoading(true);
                console.log(error);
            });
    },[]);
        return(
        <>
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
            <CardColumns>
                {rules.map(rule => {
                    return <Card key={rule.slug}>
                        <Card.Body>
                            <Card.Title>{rule.title}</Card.Title>
                            <Card.Text>{rule.body}</Card.Text>
                        </Card.Body>
                    </Card>
                })}
            </CardColumns>
            <Button>Add a Rule</Button>
        </Container>
        <br></br>
        </>
    )}

export default Rules;

// TODO:
//      ADD A RULE FUNCTIONALITY