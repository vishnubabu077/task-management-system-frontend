import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';



class SubTask extends Component {

    constructor(props) {

        super(props);
        this.state = {
            show: false, validated: false, setValidated: false,
            applicationName: '', logMessage: '', severity: '', subTask: [],checked:false,radioValue:1
        };

        this.applicationNameChange = this.applicationNameChange.bind(this);
        this.handleClose = this.handleClose.bind(this);



    }

    applicationNameChange(event) {
        console.log("chane", event.target.name)
        const value = event.target.value;
        this.setState({ [event.target.name]: value });

    }

    componentWillReceiveProps(props) {
        if (!props.toggle) {
            this.setState({
                validated: false, setValidated: false,
                applicationName: '', logMessage: '', severity: ''
            });
        }
        this.setState({ show: props.toggle })
        this.setState({ subTask: props.subTaskData })
    }

    handleClose() {
        this.props.closeAddModel();
        console.log("closed")
        this.setState({
            validated: false, setValidated: false,
            applicationName: '', logMessage: '', severity: '', subTask: []
        });

    }


    render() {
        const setRadioValue = () =>{};
        const setHide = () => this.setState({ show: false, validated: false });

        const { subTask } = this.state;

        let logList = [];
        if (subTask != undefined) {

            logList = subTask.map(log => {
                var d = new Date(log.creationtime);

                return <tr key={log.id}>

                    <td style={{ whiteSpace: 'nowrap' }}>{log.subTaskName}</td>
                    <td>{log.timeSpent}</td>
                    <input checked={log.subTaskFinished} type="checkbox" className="checkbox" 
               name={'completed'} id={'completed'} />
               <label for="completed">Finished</label><br></br>


                </tr>
            });
        }


        const handleSubmit = (event) => {

            const form = event.currentTarget;

            if (form.checkValidity() === false) {
                console.log("submit in if ")
                event.preventDefault();
                event.stopPropagation();
            } else {

                console.log("submit clicked")
                this.props.addLog(this.state, setHide);
            }

            this.setState({ validated: true })
        };

        return (
            <div>
                <Modal show={this.state.show} size="lg">
                    <Modal.Header >
                        <Modal.Title>Sub Tasks</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.state.validated} onSubmit={handleSubmit}>

                            <Row className="mb-3">
                                <Table size="sm" className="mt-4" striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th width="20%">Sub Task Name</th>
                                            <th width="30%">Time Spent (hr)</th>
                                            <th width="10%">Completed</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logList}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">


                                </Form.Group>
                            </Row>



                            <Row className="mb-3">
                                <Col xs="auto" className="my-1" md={{ offset: 7 }}>
                                    <Button variant="secondary" onClick={() => this.handleClose()}>
                                        Close
                                    </Button>
                                </Col>

                            </Row>
                        </Form>


                    </Modal.Body>

                </Modal>

            </div>
        );
    }


}


export default SubTask;