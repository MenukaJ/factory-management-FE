import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddCategoryModal } from './AddCategoryModal';
import Dashbord from './Dashbord';

export class Category extends Component {

    constructor(props) {
        super(props);
        this.state = { cat: [], addModalShow: false }
    }



    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:8080/category/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ cat: data });
            })
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
                    >Add Category
                    </Button>
                    <AddCategoryModal
                        show={this.state.addModalShow}
                        onHide={AddModelClose}
                    />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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
export default Category;