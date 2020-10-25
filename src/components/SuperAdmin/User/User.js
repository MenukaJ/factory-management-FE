import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddUserModal } from './AddUserModal';

import jspdf  from "jspdf";
import autoTable from 'jspdf-autotable'



export class User extends Component {

    constructor(props) {
        super(props);
        this.state = { cat: [], addModalShow: false }
    }



    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:8080/user/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ cat: data });
            })

    }
    genaratePdf(){
        const doc = new jspdf();
        doc.text("Users List",5,10)
        autoTable(doc, { html: '#mydataTableAdmins' })
        doc.save("User.pdf");


    }

    print(){
        window.print();

    }


    componentDidUpdate() {
        this.refreshList();
    }


    render() {
        const { cat } = this.state;
        let AddModelClose = () => this.setState({ addModalShow: false })
        return (

            <div>
                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({ addModalShow: true })}
                    >Add User
                    </Button>
                    <AddUserModal
                        show={this.state.addModalShow}
                        onHide={AddModelClose}
                    />
                    <Button variant='primary' className="mt-2 mr-3"
                            onClick={this.genaratePdf}
                    >Download
                    </Button>
                    <Button variant='primary'
                            onClick={this.print}
                    >Print
                    </Button>
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm" id='mydataTableAdmins'  >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>User Type Id</th>
                        <th>Status</th>
                        <th>Created User</th>
                        <th>Created Date</th>
                        <th>Version</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cat.map(category =>
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.user_name}</td>
                            <td>{category.type}</td>
                            <td>{category.status}</td>
                            <td>{category.createdUser}</td>
                            <td>{category.createdDate}</td>
                            <td>{category.version}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>
        );

    }

}
export default User;