import { Search } from '@material-ui/icons';
import React, { useRef } from 'react';
import { Row,Col,Table, Button, ButtonToolbar,Icon } from 'react-bootstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { useReactToPrint } from 'react-to-print';


export class GenReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = { del: [], addModalShow: false }
    }
    
    componentDidMount() {
        this.refreshList();
    }
    
    refreshList() {
        fetch('http://localhost:8080/delivery/all')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ del: data });
            })
    }

    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { del } = this.state;
        let AddModelClose = () => this.setState({ addModalShow: false })
      
        return (

             <div>
                <h1 style={{marginLeft:"40%",marginTop:"2%"}}>Delivery Report</h1><br></br><br></br>
            
                
                <div style={{width: "90%" ,marginLeft:"5%"}}>
                <div>
                        <Button variant="success" onClick={() => window.print()}>Print Report</Button>
                </div>
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
                         
                        </tr>
                    </thead>
                    <tbody>
                        {del.map(delivery =>
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
                            </tr>
                        )}
                    </tbody>
                </Table><br></br><br></br><br></br><br></br>     
              </div>
            </div>
        );

    }

}
export default GenReport;
