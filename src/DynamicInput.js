import React, { useState } from "react";
import { Col, Form, Row, Button,Modal } from "react-bootstrap";

function DynamicInput(props) {
    const [inputList, setInputList] = useState([{ subTaskName: "", timeSpent: "" }]);

    const onSubmit = (event) => {
        props.addSubmit(inputList);
        event.preventDefault();
    }

    const onClose = (event) => {
        props.subTaskClose();
        event.preventDefault();
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { subTaskName: "", timeSpent: "" }]);
    };

    return (
      
        <div>
           
            {inputList.map((x, i) => {
                return (
                  
                    
                    <div className="box">

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Sub Task Name</Form.Label>
                                <Form.Control type="text" placeholder="Sub Task Name" name="subTaskName" value={x.subTaskName} onChange={e => handleInputChange(e, i)} required />
                                <Form.Control.Feedback type="invalid" >
                                    Please provide a valid Error Message.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Time Spent</Form.Label>
                                <Form.Control type="text" placeholder="Time Spent" name="timeSpent" value={x.timeSpent} onChange={e => handleInputChange(e, i)} required />
                                <Form.Control.Feedback type="invalid" >
                                    Please provide a valid Error Message.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                        <Col xs="auto" className="my-1">
                                {inputList.length - 1 === i && <Button onClick={handleAddClick} md={{ offset: 7 }} >
                                    Add Subtask
                                </Button>}
                            </Col>
                            <Col xs="auto" className="my-1">
                                {inputList.length !== 1 && <Button variant="secondary"
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</Button>}
                            </Col>
                            
                        </Row>
                        <div class="modal-footer">
                        </div>
                    </div>
                    
                     
                );
            })}
            
            <Row className="mb-3" >
            <Col xs="auto" className="my-1" md={{ span: 1, offset: 7 }}>
                                    <Button  type="submit" onClick={onSubmit} >
                                        Submit
                                    </Button>
                                </Col>
                                <Col xs="auto" className="my-1" md={{ span: 1, offset: 2 }} >
                                    <Button variant="secondary"  onClick={onClose}>
                                        Close
                                    </Button>
                                </Col>
                                </Row>
        </div>
    );
}

export default DynamicInput;