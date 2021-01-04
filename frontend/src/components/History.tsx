import React from 'react';
import axios from 'axios';
import axiosInstance from "../axiosAPI";
import axiosRefresh from "../refreshToken";
import {
    Button, ButtonGroup,
    Container, Row, Col,
    Card,
    Form,
} from 'react-bootstrap';
import slugify from 'slugify';

  interface IHistory {
      game: number,
      title: string,
      body: string,
      start_date: Date,
      end_date: Date,
      slug: string,
  }
  interface INewHistory {
      title: string,
      body: string
  }

  const defaultHistory:IHistory[] = [];
  const defaultNewHistory:INewHistory = {title:"",body:""}

  function History(): JSX.Element {
      //states
      const [history,setHistory]: [IHistory[], (history: IHistory[]) => void] = React.useState(defaultHistory);
      const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
      const [newHistory,setNewHistory]: [INewHistory, (newHistory:INewHistory) => void] = React.useState(defaultNewHistory);
      const [edit,setEdit]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    const handleEdit = () => setEdit(!edit);
    const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHistory({
            title:e.target.value,
            body:newHistory.body
        })
    }
    const handleNewBody = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHistory({
            title:newHistory.title,
            body:e.target.value
        })
    }
    const handlePatch = async (h:IHistory) => {
        try {
            const responsePatch = await axiosInstance.patch(('http://127.0.0.1:8000/api/history/' + h.slug + "/"), {
                game: h.game,
                title: newHistory.title,
                body: newHistory.body,
                start_date: h.start_date,
                end_date: h.end_date,
                slug: slugify(newHistory.title,{lower:true,strict:true}),
            });
            console.log(responsePatch);
            window.location.reload();
        } catch (error) {
            throw error;
        }
    }
    const handleDelete = async (h:IHistory) => {
          const responseDelete = await axiosInstance.delete('http://127.0.0.1:8000/api/history/' + h.slug);
          console.log(responseDelete);
          window.location.reload();
    }
      //effects
      //GET HISTORY LIST FROM API
      React.useEffect(() => {
          axios.get<IHistory[]>("http://127.0.0.1:8000/api/history/", { headers: {
            "Content-Type": "applications/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token'),
        }}).then(response => {
                    setHistory(response.data);
                    setLoading(false);
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
      }, []);
      
      return (
          <div>
                <Row className="row align-items-center"><Col><h1>Your History</h1></Col></Row>
                {history.map(h => {
                    return (edit) ? <Container fluid>
                        <br></br>
                        <Card key={h.slug}>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm="2">
                                            Title
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control placeholder={h.title} value={newHistory.title} onChange={handleNewTitle}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm="2">
                                            Body
                                        </Form.Label>
                                        <Col lg>
                                            <Form.Control as="textarea" placeholder={h.body} value={newHistory.body} onChange={handleNewBody}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <ButtonGroup>
                                    <Button variant="success" onClick={() => handlePatch(h)}>S</Button>
                                    <Button variant="warning" onClick={handleEdit}>C</Button>
                                    <Button variant="danger" onClick={() => handleDelete(h)}>X</Button>
                                </ButtonGroup>
                            </Card.Footer>
                        </Card>
                        <br></br>
                    </Container>
                    : <Container fluid>
                        <br></br>
                        <Card key={h.slug}>
                            <Card.Header>
                                <Row className="row align-items-center">
                                    <Col md={{ span: 8, offset: 2 }}>{h.title}</Col>
                                    <Col md={{ span: 1, offset: 1 }}>
                                        <ButtonGroup>
                                            <Button variant="warning" onClick={handleEdit}>U</Button>
                                            <Button variant="danger" onClick={() => handleDelete(h)}>X</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body><Card.Text>{h.body}</Card.Text></Card.Body>
                            <Card.Footer className="text-muted">
                                <Row className="row align-items-center">
                                    <Col>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(h.start_date))}</Col>
                                    <Col>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(h.end_date))}</Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                        <br></br>
                    </Container>
                })}
            </div>
        )
  }

  export default History;