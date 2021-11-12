import React,{useState,useEffect} from 'react'
import { Card, Col, Row, Container, Button } from 'react-bootstrap'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/product"
})
export default function ProductList() {
    const [ProductData, setProductData] = useState({Data:[]})
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setProductData({...ProductData,Data:res.data})
        })
        console.log(ProductData.Data);
    }, [])
    return (
        <div>
            <Container>
            <Row>
                <Col lg={12}>
                    <Row >
                        {ProductData.Data.map((product)=>
                            <Col lg={3} key={product.Pro_id} className="mb-3 mt-3">
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={`images/${product.image}`} height="300px"/>
                                <Card.Body>
                                    <Card.Title>{product.pname}</Card.Title>
                                    <Card.Text>
                                    {product.price}
                                    </Card.Text>
                                    <Button >Add To cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                
                </Col>
            </Row>
            </Container>
            
        </div>
    )
}
