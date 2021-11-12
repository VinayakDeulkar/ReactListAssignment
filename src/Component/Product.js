import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom'
import ProductForm from './ProductForm'
import ProductList from './ProductList'

export default function Product() {
    return (
        <div>
            <Router>
                <Row className="m-3">
                    {/* <Col lg={2} >
                        <li><Link to=''><label className="producttext">Product</label ></Link></li>
                        <li><Link to='/AddProduct'><label  className="producttext">Add Product</label></Link></li> 
                    </Col> */}
                    <Col lg={12}>
                        <Switch>
                            <Route path='/' exact component={ProductList}/>
                            {/* <Route path='/AddProduct' exact component={ProductForm}/> */}
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </div>
    )
}
