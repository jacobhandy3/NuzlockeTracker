import React from 'react';
import axios from 'axios';
import {
  Button, ButtonGroup,
  Container, Row, Col,
  CardColumns, Card,
  Navbar, Nav, NavDropdown,
} from 'react-bootstrap';

//interface for rules sent by API
interface IRule {
    title: string;
    body: string;
    date_added: Date;
    slug: string,
  }

//initialize state for interfaces
const defaultRules:IRule[] = [];

function Rules(): JSX.Element {
    //states
    const [rules,setRules]: [IRule[], (rules: IRule[]) => void] = React.useState(defaultRules);
    const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
    const [error,setError]: [string, (error:string) => void] = React.useState("");
    //effects
    //GET LIST OF RULES FROM API
    React.useEffect(() => {
        axios
            .get<IRule[]>("http://127.0.0.1:8000/api/rules/", { headers: {
                "Content-Type": "applications/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }})
            .then(response => {
            setRules(response.data);
            setLoading(false);
            },
            (error) => {
                setLoading(true);
                setError(error);
            });
    }, []);
    if (error) {
        return <div>Error: {error}</div>;
      } else if (!loading) {
        return <div>Loading...</div>;
      } else {
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
                        <Card.Footer>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(rule.date_added))}</Card.Footer>
                    </Card>
                })}
            </CardColumns>
        </Container>
        </>
    )}
}

export default Rules;