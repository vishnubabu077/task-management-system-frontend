import React, { Component } from 'react';
import { Button, Col, Container, Form, Navbar, Row, Table } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import AddLog from './AddLog';
import { Severity } from './severity';
import SubTask from './Subtask';

class LogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logs: [], toggleAddLog: false, toggleSubTask: false, data: []
        };

        // this.handleSubmit = this.handleSubmit.bind(this)
        //this.handleInputChange = this.handleInputChange.bind(this)

        this.addLog = this.addLog.bind(this);
        this.toggleAddLog = this.toggleAddLog.bind(this);
        this.toggleSubTask = this.toggleSubTask.bind(this);

    }

    componentWillMount() {
        console.log("t2")
        fetch(`http://localhost:8080/task/getAll`)
            .then(response => response.json())
            .then(data => this.setState({ logs: data }));
    }

    toggleAddLog = () => {
        this.setState({ toggleAddLog: !this.state.toggleAddLog });
    }

    toggleSubTask = (subTaskData) => {
        this.setState({ toggleSubTask: !this.state.toggleSubTask });
        this.setState({ data: subTaskData });
    }

    render() {
        const { logs } = this.state;
        const logList = logs.map(log => {
            var d = new Date(log.creationtime);

            return <tr key={log.id}>

                <td style={{ whiteSpace: 'nowrap' }}>{log.taskName}</td>
                <td>{log.timeSpent}</td>
                <td>{log.taskGroup}</td>
                <td>{log.taskAssignee}</td>
                <td>{log.taskFinished ? "Finished" : "In-Progress"}</td>
                <td>{log.details}</td>
                <td> <Button variant="primary" onClick={() => this.toggleSubTask(log.subTasks)} disabled={!log.subTasks[0]}>Sub tasks</Button>{''}</td>
            </tr>
        });



        return (
            <div>

                <Navbar bg="dark" variant="dark" >
                    <Container>
                        <Navbar.Brand >Task Management System</Navbar.Brand>
                        <Button onClick={() => this.toggleAddLog()}>Add New Task</Button>{''}
                    </Container>
                </Navbar>


                <Container fluid>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Row >

                            </Row>
                            <Row>
                                <Col xs="auto" className="my-1" md={{ span: 4, offset: 11 }}>


                                    <AddLog toggle={this.state.toggleAddLog} addLog={(e) => this.addLog(e)} closeAddModel={() => this.toggleAddLog()}></AddLog>
                                    <SubTask subTaskData={this.state.data} toggle={this.state.toggleSubTask} addLog={(e) => this.addLog(e)} closeAddModel={() => this.toggleSubTask()}></SubTask>
                                </Col>
                            </Row>

                        </Form.Group>
                    </Form>
                    <Row>
                        <Col>

                            <Table size="sm" className="mt-4" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th width="20%">Task Name</th>
                                        <th width="30%">Time Spent (hr)</th>
                                        <th width="10%">Task Group</th>
                                        <th width="10%">Task Assignee</th>
                                        <th width="20%">Status</th>
                                        <th width="20%">Details</th>
                                        <th width="40%">View Sub-Tasks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logList}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Container>
            </div>
        );
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value });

    }

    reload() {
      
        fetch(`http://localhost:8080/task/getAll`)
            .then(response => response.json())
            .then(data => this.setState({ logs: data }));
    }


    async addLog(e, subTaskData) {
        console.log("inside add", e, subTaskData)
        const sev = new Severity(e.severity);
        const data = { taskName: e.taskName ? e.taskName : '', timeSpent: e.timeSpent ? e.timeSpent : '', taskGroup: e.taskGroup ? e.taskGroup : '', taskAssignee: e.taskAssignee ? e.taskAssignee : '', subTasks: e.subTaskData, details: e.details ? e.details : '' };
        fetch(
            'http://localhost:8080/task/save',


            {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }
        )

            .then(data => {
                this.toggleAddLog();
              this.reload();


            }).catch((error) => {
                console.error('Error:', error);
            });

    }


}





export default LogList;