import React, { Component } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import DynamicInput from './DynamicInput';



class AddLog extends Component {

    constructor(props) {

        super(props);
        this.state = {
            show: false, validated: false, setValidated: false,
            applicationName: '', logMessage: '', severity: '', subTaskData: [], form: []
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
                taskName: '', timeSpent: '', taskGroup: '', taskAssignee: '', details: ''
            });
        }
        this.setState({ show: props.toggle })
    }

    handleClose() {
        console.log("closed")
        this.setState({
            validated: false, setValidated: false,
            applicationName: '', logMessage: '', severity: ''
        });
        this.props.closeAddModel();

    }

    handleSubmitSubTask = (subtaskData) => {
        console.log("got cicked", subtaskData)
        this.handleSubmit(subtaskData);


    }

    handleCloseFromSubtask = (subtaskData) => {
        console.log("got cicked", subtaskData)
        this.handleClose();
    }

    handleSubmit = (subtaskData) => {

        console.log("submit clicked$$$$", this.input)
        // this.setState({subTaskData: subtaskData})
        this.setState({ subTaskData: subtaskData }, () => {
            this.props.addLog(this.state, subtaskData);
        });
        this.setState({ validated: true })
    };



    render() {
        const setHide = () => this.setState({ show: false, validated: false });
        return (
            <div>
                <Modal show={this.state.show} >
                    <Modal.Header >
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.state.validated}   >

                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" name="taskName" placeholder="Task Name" value={this.state.taskName} onChange={this.applicationNameChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Application Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Task Group</Form.Label>
                                    <Form.Control type="text" placeholder="Task Group" name="taskGroup" value={this.state.taskGroup} onChange={this.applicationNameChange} required />
                                    <Form.Control.Feedback type="invalid" >
                                        Please provide a valid Error Message.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Time Spent (hr)</Form.Label>
                                    <Form.Control type="text" name="timeSpent" placeholder="Time Spent" value={this.state.timeSpent} onChange={this.applicationNameChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Application Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Task Assignee</Form.Label>
                                    <Form.Control type="text" placeholder="Task Assignee" name="taskAssignee" value={this.state.taskAssignee} onChange={this.applicationNameChange} required />
                                    <Form.Control.Feedback type="invalid" >
                                        Please provide a valid Error Message.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Details</Form.Label>
                                    <Form.Control type="text" name="details" placeholder="details" value={this.state.details} onChange={this.applicationNameChange} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Application Name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <DynamicInput addSubmit={this.handleSubmitSubTask} subTaskClose={this.handleCloseFromSubtask}> </DynamicInput>

                            <Row className="mb-3">
                            </Row>
                        </Form>


                    </Modal.Body>

                </Modal>

            </div>
        );
    }


}


export default AddLog;