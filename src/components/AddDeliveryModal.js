import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddDeliveryModal extends Component {
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
      
        fetch('http://localhost:8080/delivery/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'Anushka'
            },
            //asign delivery info values using parameters
            body: JSON.stringify({
               
                name: event.target.name.value,
                vehicleNo: event.target.vehicleNo.value,
                loadingPlace: event.target.loadingPlace.value,
                materials: event.target.materials.value,
                qty: event.target.qty.value,
                amount: event.target.amount.value,
                rate: event.target.rate.value,
                remarks: event.target.remarks.value
                
            })
        })
            .then(res => res.json())
            .then((result) => {
                
                this.setState({ snackbaropen: true, snackbarmsg: 'Success' });
                

                // console.log("result" , result.messages)
            }, (error) => {
              //   this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
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
                                <Form onSubmit={this.handleSubmit}>
                                <Row>
                                <Col sm={6}>
                             
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required placeholder="Supplier Name" />
                                    </Form.Group>
                                    <Form.Group controlId="vehicleNo">
                                        <Form.Label>Vehicle No</Form.Label>
                                        <Form.Control type="text" name="vehicleNo" required placeholder="Vehicle No" />
                                    </Form.Group>
                                    <Form.Group controlId="loadingPlace">
                                        <Form.Label>Loading Palce</Form.Label>
                                        <Form.Control type="text" name="loadingPlace" required placeholder="Loading Place" />
                                    </Form.Group>
                                    <Form.Group controlId="materials">
                                        <Form.Label>Materials</Form.Label>
                                        <Form.Control type="text" name="materials" required placeholder="Materials" />
                                    </Form.Group>
                                   
                                    
                            </Col>
                            <Col sm={6}>
                            <Form.Group controlId="qty">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" name="qty" required placeholder="Quantity" />
                                    </Form.Group>
                                    <Form.Group controlId="amount">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="text" name="amount" required placeholder="Amount" />
                                    </Form.Group>
                                    <Form.Group controlId="rate">
                                        <Form.Label>Rate</Form.Label>
                                        <Form.Control type="text" name="rate" required placeholder="Rate" />
                                    </Form.Group>
                                    <Form.Group controlId="remarks">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control type="text" name="remarks" required placeholder="Remarks" />
                                    </Form.Group>
                                  
                                    <Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Add Delivery
                                        </Button>
                                    </Form.Group>
                            </Col>
                        </Row>
                    </Form>
               
            </div>
        );
    }
}