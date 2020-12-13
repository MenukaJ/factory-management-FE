import React, { Component } from 'react';
import { Table, Button, ButtonToolbar,Col } from 'react-bootstrap';
import { EditSuppliersModal } from './EditSuppliersModal';
import Rodal from 'rodal';

export class ManageSuppliers extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        suppliers: [], 
        search: "",
        editModalShow: false}
    }
    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
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

    deleteSup(id)
    {
        if(window.confirm('Are you sure?')) {
            fetch('http://localhost:8080/supplier/id/'+id,{
                method: 'DELETE',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
        }
    }

    render() {
        const { suppliers, id, name,address,contact,email,date,version } = this.state;
        let EditModelClose = () => this.setState({ editModalShow: false })
        let filteredSuppliers = this.state.suppliers.filter(
            (supplier) => {
                return supplier.name.toLowerCase().indexOf(this.state.
                    search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <h1 align="center">Manage Suppliers</h1><br></br><br></br>
                
                <Col md="3 active-purple mb-1" >
                <input class="form-control" type="text" placeholder="Search Name" aria-label="Search" onChange={this.onChange} value={this.state.search} ></input>
                </Col>
                <ButtonToolbar>
                    
                    <EditSuppliersModal
                        show={this.state.editModalShow}
                        onHide={EditModelClose}
                        id={id}
                        name={name}
                        address={address}
                        contact={contact}
                        email={email}
                        date={date}
                        version={version}
                    />
                </ButtonToolbar>
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
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(supplier =>
                            <tr key={supplier.id}>
                                <td>{supplier.id}</td>
                                <td>{supplier.name}</td>
                                <td>{supplier.address}</td>
                                <td>{supplier.contact}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.date}</td>
                                <td>{supplier.version}</td>
                                <td>
                                    <ButtonToolbar>
                                   <Button className="mr-2" variant="warning"
                                    onClick={()=> this.setState({editModalShow:true, id:supplier.id, name:supplier.name, address:supplier.address, contact:supplier.contact,email:supplier.email, version:supplier.version})}>
                                        Edit
                                        </Button>
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=> this.deleteSup(supplier.id)}>
                                        Delete
                                        </Button>
                                        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                                        <div>Content</div>
                                        </Rodal>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );

    }

}