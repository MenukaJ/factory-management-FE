import { Search } from '@material-ui/icons';
import React, { Component } from 'react';
import { Row,Col,Table, Button, ButtonToolbar,Icon } from 'react-bootstrap';
import { generatePath } from 'react-router-dom';
import { AddDeliveryModal } from './AddDeliveryModal';
import {Scrollbars} from 'react-custom-scrollbars'

export class Delivery extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        deliveries: [], 
        search: "",
        addModalShow: false }
    }
    
    componentDidMount() {
        this.refreshList();
    }
    
    refreshList() {
        fetch('http://localhost:8080/delivery/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ deliveries: data });
            })
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDel(id)
    {
        if(window.confirm('Are you sure?')) {
            fetch('http://localhost:8080/delivery/id/'+id,{
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
        }
    }
    onChange = e =>{
        console.log(e.target.value);
        this.setState({ search : e.target.value});
    }

    render() {
        let filteredDelivery = this.state.deliveries.filter(
            (delivery) => {
                return delivery.name.toLowerCase().indexOf(this.state.
                    search.toLowerCase()) !== -1;
            }
        );
       
      let AddModelClose = () => this.setState({ addModalShow: false })
      
        return (

             <div>
            
            
                <h1 align="center">Delivery Information</h1><br></br>
                
                
                    <Col md="3 active-purple mb-1" >
                        <input class="form-control" type="text" placeholder="Search Name" aria-label="Search" onChange={this.onChange} value={this.state.search} ></input>
                    </Col>
                
                 <div style={{width: "100%" ,height: "250",border:"1"}}>
                 <Scrollbars >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Vehicle NO</th>
                            <th>Loading Place</th>
                            <th>Delivery Date</th>
                            <th>Materials</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Rate</th>
                            <th>Remark</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDelivery.map(delivery =>
                            <tr key={delivery.id}>
                                <td>{delivery.id}</td>
                                <td>{delivery.name}</td>
                                <td>{delivery.vehicleNo}</td>
                                <td>{delivery.loadingPlace}</td>
                                <td>{delivery.deliveryDate}</td>
                                <td>{delivery.materials}</td>
                                <td>{delivery.qty}</td>
                                <td>{delivery.amount}</td>
                                <td>{delivery.rate}</td>
                                <td>{delivery.remarks}</td>
                                <td>
                                <ButtonToolbar>
                                   <Button className="mr-2" variant="danger"
                                         onClick={()=> this.deleteDel(delivery.id)}>
                                        Cancel
                                        </Button>
                                    </ButtonToolbar>
                                   
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
              
                </Scrollbars>  
                </div><br></br><br></br>
                <div>
                <h1 align="center">Delivery Form</h1><br></br>
                <ButtonToolbar>
                    <AddDeliveryModal/>
                </ButtonToolbar>      
              </div>
            </div>
        );

    }

}
export default Delivery;