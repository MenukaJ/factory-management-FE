import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        //event.preventDefault();
        //alert(event.target.name.value);
        //     fetch('http://localhost:8080/category/add', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'username': 'menuka'
        //         },
        //         body: JSON.stringify({
        //             name: event.target.name.value,
        //             status: event.target.status.value
        //         })
        //     })
        //         .then(res => res.json())
        //         .then((result) => {
        //             //alert("Success");
        //             if (result.name === undefined && result.status === undefined) {
        //                 this.setState({ snackbaropen: true, snackbarmsg: result.messages })
        //             }
        //             else if (result.name === undefined && result.status !== undefined) {
        //                 this.setState({ snackbaropen: true, snackbarmsg: result.status })
        //             }
        //             else if (result.name !== undefined && result.status === undefined) {
        //                 this.setState({ snackbaropen: true, snackbarmsg: result.name })
        //             }

        //             // console.log("result" , result.messages)
        //         }, (error) => {
        //             // this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
        //         }

        //         )
        //return <Redirect to='/SideNav' />
        this.props.history.push('/Dashbord');

    }

    // handleSubmit = (event) => {

    //     return <Redirect to='/SideNav' />

    // }


    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} >
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" required />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
    }
}

export default Login;