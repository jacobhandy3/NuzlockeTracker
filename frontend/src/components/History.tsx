import React from 'react';
import axios from 'axios';
import axiosInstance from "../axiosAPI";
import {
    Button,
    Container, Row, Col,
    Card,
  } from 'react-bootstrap';

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
      //effects
      const handleDelete = async (h:IHistory) => {
          const responseDelete = await axiosInstance.delete('http://127.0.0.1:8000/api/history' + h.slug);
          console.log(responseDelete);
          window.location.reload();
      }
      //GET HISTORY LIST FROM API
      React.useEffect(() => {
          axios.get<IHistory[]>("http://127.0.0.1:8000/api/history/", { headers: {
            "Content-Type": "applications/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('access_token'),
        }}).then(response => {
                    setHistory(response.data);
                    setLoading(false);
                    console.log(response.data);
                });
      }, []);
      if(history.length !== 0){
      return (
          <div>
              {history.map(h => {
                  return <Container fluid>
                    <br></br>
                    <Card key={h.slug}>
                        <Card.Header>
                            <Row className="row align-items-center">
                                <Col md={{ span: 8, offset: 2 }}>{h.title}</Col>
                                <Col md={{ span: 1, offset: 1 }}>
                                <Button variant="danger" onClick={() => handleDelete(h)}>X</Button>
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
      )}else{return <div><h3>You don't have any completed runs!</h3></div>}
  }

  export default History;