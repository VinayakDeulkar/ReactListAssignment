import React,{useEffect,useState,useRef} from 'react'
import { Form,Button, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/product"
})
export default function ProductForm() {
    const [ProductData, setProductData] = useState({Data:[]})
    const Productname = useRef(null)
    const Price = useRef(null)
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setProductData({...ProductData,Data:res.data})
        })
        console.log(ProductData.Data);
    }, [])
    const AddProduct=(event)=>{
        event.preventDefault();
        console.log(Price.current.value);
        console.log(Productname.current.value);
    }
    return (
        <div>
            <Row>
                <Col lg={2}/>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                        <Card.Title>Add Product</Card.Title>
                            <Form>
                                <Form.Group  className="mb-3" controlId="frombasicName">
                                    <Form.Label className="float-left">Product Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product" ref={Productname} />
                                </Form.Group>
                                <Form.Group  className="mb-3" controlId="frombasicPrice">
                                    <Form.Label className="float-left">Product Price</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Price" ref={Price} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="frombasicImage">
                                    <Form.Label className="float-left">Product Image</Form.Label>
                                    <Form.Control type="file" placeholder="Enter Price" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={AddProduct}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={2}/>
            </Row>
            
        </div>
    )
}
