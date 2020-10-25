import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import {Line} from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Profit',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

export class Profit extends Component {

    constructor(props) {
        super(props);

    }



    componentDidMount() {

    }



    componentDidUpdate() {

    }


    render() {

        let AddModelClose = () => this.setState({ addModalShow: false })
        return (

            <div>
                <Line
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Average Profit per month',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );

    }

}
export default Profit;