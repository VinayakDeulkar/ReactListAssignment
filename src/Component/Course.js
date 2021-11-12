import React from 'react'
import { Col, Row,Button } from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom'
import CourseList from './CourseList'
import UserList from './UserList'
export default function Course() {
    return (
        <div>
            <Router>
                <Row className="m-3">
                    <Col lg={2} >
                        <li className="m-2"><Link to='/Course'><Button variant="light"><label className="producttext">Courses</label ></Button></Link></li>
                        <li className="m-2"><Link to='/UserList'><Button variant="light"><label  className="producttext">User List</label></Button></Link></li> 
                    </Col>
                    <Col lg={10}>
                        <Switch>
                            <Route path='/Course' exact component={CourseList}/>
                            <Route path='/UserList' exact component={UserList}/>
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </div>
    )
}