import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';


export class AddSupplierModal extends Component {
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
        fetch('http://localhost:8080/supplier/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'Anushka'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                contact: event.target.contact.value,
                email: event.target.email.value,
                address: event.target.address.value,
                
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.contact == undefined && result.email == undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Success' })
                }
                else if (result.email !== undefined && result.contact === undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: result.email })
                }
                else if (result.contact !== undefined && result.email === undefined) {
                    this.setState({ snackbaropen: true, snackbarmsg: result.contact })
                }

                // console.log("result" , result.messages)
            }, (error) => {
                // this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
            }

            )
    }


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
                
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Add Suppliers
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Supplier Name" />
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" required placeholder="Address" />
                                    </Form.Group>
                                    <Form.Group controlId="contact">
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control type="text" name="contact" required placeholder="Contact" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" required placeholder="email" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Add Supplier
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