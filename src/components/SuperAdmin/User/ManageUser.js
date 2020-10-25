import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { EditUserModal } from './EditUserModal';
import swal from "sweetalert";

export class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = { cate: [] , editModalShow: false}
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:8080/user/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ cate: data });
            })
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteCat(id)
    {

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch('http://localhost:8080/user/delete/'+id,{
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'username': 'chathura'
                        }
                    }).then((result) => {
                        swal("Deleted!", "Your imaginary file has been deleted!", "success");
                    })


                }
            });

    }

    render() {
        const { cate, id, name,status,version } = this.state;
        let EditModelClose = () => this.setState({ editModalShow: false })
        return (
            <div>
                <ButtonToolbar>

                    <EditUserModal
                        show={this.state.editModalShow}
                        onHide={EditModelClose}
                        id={id}
                        name={name}
                        status={status}
                        version={version}
                    />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Status</th>
                        <th>Modified User</th>
                        <th>Modified Date</th>
                        <th>Version</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cate.map(category =>
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.user_name}</td>
                            <td>{category.status}</td>
                            <td>{category.modifiedUser}</td>
                            <td>{category.modifiedDate}</td>
                            <td>{category.version}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="danger"
                                            onClick={()=> this.deleteCat(category.id)}>
                                        Delete
                                    </Button>
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