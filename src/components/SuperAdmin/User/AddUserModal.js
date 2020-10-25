import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';
import swal from "sweetalert";


export class AddUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '', role:[] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };
    componentDidMount() {
        fetch('http://localhost:8080/user-role/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ role: data });
            })
    }
    handleSubmit(event) {

        event.preventDefault();

        fetch('http://localhost:8080/user/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'chathura'
            },
            body: JSON.stringify({
                type: event.target.type.value,
                password: event.target.password.value,
                name: event.target.name.value,
                dob: event.target.dob.value,
                user_name: event.target.user_name.value,
                status: event.target.status.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                swal({
                    icon: 'success',
                    title: 'User Added Successfully',
                    showConfirmButton: false,

                })
                }, (error) => {
                    // this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
                }

            )
    }

    //   handleSubmit = (event) => {

    //       return <Redirect to='/login' />

    //   }

    render() {
        const { role } = this.state;
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
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                        <Form.Group>
                                            <Form.Label>User Type</Form.Label>
                                            <Form.Control as="select" required name="type" >
                                                {role.map(userRole=>
                                                <option value={userRole.id}>{userRole.name}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>



                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Name *" />
                                    </Form.Group>
                                    <Form.Group controlId="dob">
                                        <Form.Label>Dob</Form.Label>
                                        <Form.Control type="text" name="dob" required placeholder="Dob *" />
                                    </Form.Group>
                                    <Form.Group controlId="User Name">
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control type="text" name="user_name" required placeholder="User Name" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="password" required placeholder="password *" />
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
                                            Add User
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