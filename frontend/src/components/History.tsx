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
          axios.get<IHistory[]>("http://127.0.0.1:8000/api/history/").then(response => {
                    setHistory(response.data);
                    setLoading(false);
                    console.log(response.data);
                });
      }, []);
      return (
          <div>
              {history.map(h => {
                  return <Container fluid>
                    <Card key={h.slug}>
                        <Card.Header>
                            {h.title}
                            <Button variant="danger" href="">X</Button>
                        </Card.Header>
                        <Card.Body><Card.Text>{h.body}</Card.Text></Card.Body>
                        <Card.Footer className="text-muted">
                            <Row className="row align-items-center">
                                <Col>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(h.start_date))}</Col>
                                <Col>{Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(h.end_date))}</Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Container>
              })}
            </div>
      )
  }

  export default History;

  //TODO:
  //    NOT RECEIVING DATA FROM API BUT REQUEST MADE IN DJANGO