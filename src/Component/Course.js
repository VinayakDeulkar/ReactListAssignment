import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom'
import CourseList from './CourseList'
import UserList from './UserList'
export default function Course() {
    return (
        <div>
            <Router>
                <Row className="m-3">
                    <Col lg={2} >
                        <li><Link to='/Course'><label className="producttext">Courses</label ></Link></li>
                        <li><Link to='/UserList'><label  className="producttext">User List</label></Link></li> 
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