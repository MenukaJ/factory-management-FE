import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup, Navbar } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class TopNav extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>

                <Navbar bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="/Dashbord">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
      Company Name
    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}
export default TopNav;