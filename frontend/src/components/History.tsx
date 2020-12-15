import React from 'react';
import axios from 'axios';
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
    //   const [error,setError]: [string, (error:string) => void] = React.useState("");
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
                    console.log(response.data);
                });
      }, []);
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
                                <Button variant="danger" href="">X</Button>
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

  //TODO:
  //    NOT RECEIVING DATA FROM API BUT REQUEST MADE IN DJANGO