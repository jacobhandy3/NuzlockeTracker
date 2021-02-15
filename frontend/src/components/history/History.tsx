import React from 'react';
import axios from 'axios';
import axiosInstance from "../../axiosAPI";
import axiosRefresh from "../../refreshToken";
import {
    Button, ButtonGroup,
    Container, Row, Col,
    Card,CardGroup,
    Form,
} from 'react-bootstrap';
import slugify from 'slugify';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

  interface IHistory {
      game: number,
      title: string,
      body: string,
      start_date: Date,
      end_date: Date,
      slug: string,
  }

  const defaultHistory:IHistory[] = [];

  function History(): JSX.Element {
      //states
      const [history,setHistory]: [IHistory[], (history: IHistory[]) => void] = React.useState(defaultHistory);
      const [loading,setLoading]: [boolean, (loading:boolean) => void] = React.useState<boolean>(true);
      const [edit,setEdit]: [boolean, (show:boolean) => void] = React.useState<boolean>(false);

    const handleEdit = () => setEdit(!edit);
    const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>, i:number) => {
        const histCopy = [...history];
        histCopy[i].title = e.target.value;
        setHistory(histCopy);
    }
    const handleNewBody = (e: React.ChangeEvent<HTMLInputElement>, i:number) => {
        const histCopy = [...history];
        histCopy[i].body = e.target.value;
        setHistory(histCopy);
    }
    const handlePatch = async (h:IHistory) => {
        try {
            const responsePatch = await axiosInstance.patch(('http://127.0.0.1:8000/api/history/' + h.slug + "/"), {
                game: h.game,
                title: h.title,
                body: h.body,
                start_date: h.start_date,
                end_date: h.end_date,
                slug: slugify(h.title,{lower:true,strict:true}),
            });
            console.log(responsePatch);
            handleEdit()
        } catch (error) {
            throw error;
        }
    }
    const handleDelete = async (h:IHistory,i:number) => {
        const histList = [...history];
        histList.splice(i,1);
        setHistory(histList);
        const responseDelete = await axiosInstance.delete('http://127.0.0.1:8000/api/history/' + h.slug);
        console.log(responseDelete);
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
                <CardGroup>
                {history.map((h,index) => {
                    return (edit) ? <Container key={index} id={"hist. " + index}>
                        <br></br>
                        <Card bg="info" text="white">
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm="2">
                                            Title
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control value={h.title} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleNewTitle(e,index)}}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} >
                                        <Form.Label column sm="2">
                                            Body
                                        </Form.Label>
                                        <Col lg>
                                            <Form.Control as="textarea" rows={5} value={h.body} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{handleNewBody(e,index)}}/>
                                        </Col>
                                    </Form.Group>
                                </Form>
                                <ButtonGroup size="sm">
                                    <Button variant="dark" onClick={() => handlePatch(h)}>Save</Button>
                                    <Button variant="dark" onClick={handleEdit}>Cancel</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                        <br></br>
                    </Container>
                    : <Container key={index} id={"hist. " + index}>
                        <br></br>
                        <Card bg="info" text="white">
                            <Card.Body>
                                <Card.Title>
                                    <Row className="row align-items-center">
                                        <Col md={{ span: 1, offset: 0 }}><Button variant="info" onClick={handleEdit}><EditIcon /></Button></Col>
                                        <Col md={{ span: 8, offset: 1 }}>{h.title}</Col>
                                        <Col md={{ span: 1, offset: 1 }}><Button variant="info" onClick={() => handleDelete(h,index)}><HighlightOffIcon /></Button></Col>
                                    </Row>
                                </Card.Title>
                                <Card.Text>{h.body}</Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                    </Container>
                })}
                </CardGroup>
            </div>
        )
  }

  export default History;