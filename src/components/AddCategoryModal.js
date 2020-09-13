import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';


export class AddCategoryModal extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {

        event.preventDefault();
        //alert(event.target.name.value);
        fetch('http://localhost:8080/category/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'menuka'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                status: event.target.status.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                //alert("Success");
                if (result.name === undefined && result.status === undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: result.messages })
                }
                else if (result.name === undefined && result.status !== undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: result.status })
                }
                else if (result.name !== undefined && result.status === undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: result.name })
                }

                // console.log("result" , result.messages)
            }, (error) => {
                // this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
            }

            )
    }

    //   handleSubmit = (event) => {

    //       return <Redirect to='/login' />

    //   }

    render() {
        return (
            <div className="container">

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={6000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="green" onClick={this.snackbarClose}></IconButton>
                    ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                //centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Add Category
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Category Name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" required name="status">
                                            <option selected>ACTIVE</option>
                                            <option>INACTIVE</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Add Category
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}