import React, { Component } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    ListGroup,
    Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchBar from "../../components/search-bar/search-bar";


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {

        axios.get('/items/get')
            .then(res => {
                const currentState = this.state;    
                const nextState = {
                    items: res.data.items
                };
                this.setState(Object.assign({}, currentState, nextState));
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            })
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col className="mt-3">
                        <SearchBar />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup as="ul">
                            {
                                this.state.items.map((item, i) => {
                                    return (
                                        <ListGroup.Item as="li" key={i}>
                                            <h4>{item.name}</h4>
                                            <div className="float-right mx-2">
                                                <Button variant="danger">
                                                    <FontAwesomeIcon icon="trash-alt" />
                                                </Button>
                                            </div>

                                            <div className="float-right mx-2">
                                                <Button variant="dark">
                                                    <FontAwesomeIcon icon="edit" />
                                                </Button>
                                            </div>    
                                            
                                        </ListGroup.Item>
                                    );
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Main;