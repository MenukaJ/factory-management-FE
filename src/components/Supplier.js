import React, { Component } from 'react';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { AddSupplierModal } from './AddSupplierModal';
import Dashbord from './Dashbord';

export class Supplier extends Component {

    constructor(props) {
        super(props);
        this.state = {
        suppliers:[],
        search:'',  
         addModalShow: false }
    }



    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:8080/supplier/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ suppliers: data });
            })
    }

    componentDidUpdate() {
        this.refreshList();
    }

    onChange = e =>{
        console.log(e.target.value);
        this.setState({ search : e.target.value});
    }


    render() {
        let filteredSupplier = this.state.suppliers.filter(
            (supplier) => {
                return supplier.name.toLowerCase().indexOf(this.state.
                    search.toLowerCase()) !== -1;
            }
        );
       
        let AddModelClose = () => this.setState({ addModalShow: false })
        return (

            <div>
                <h1 align="center">Supplier Information</h1><br></br><br></br>
               <div>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Suppliers
                    </Button>
                    <AddSupplierModal
                        show={this.state.addModalShow}
                        onHide={AddModelClose}
                    />     
                    </div>    
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSupplier.map(supplier =>
                            <tr key={supplier.id}>
                                <td>{supplier.id}</td>
                                <td>{supplier.name}</td>
                                <td>{supplier.address}</td>
                                <td>{supplier.contact}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.date}</td>
                                <td>{supplier.version}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );

    }

}
export default Supplier;