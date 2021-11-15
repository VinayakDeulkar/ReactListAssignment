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
                    <Col lg={2} className="sidebar" >
                        <li className="m-2"><Link to='/Course'><label className="producttext">Courses</label ></Link></li>
                        <li className="m-2"><Link to='/UserList'><label className="producttext">User List</label></Link></li> 
                    </Col>
                    <Col lg={10} className="maindata">
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