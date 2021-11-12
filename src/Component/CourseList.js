import React, { useEffect,useState,useRef } from 'react'
import { Card, Col, Container, Row,Button, Form, Toast } from 'react-bootstrap'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/courses"
})
const clientuser=axios.create({
    baseURL:"http://localhost:3001/user"
})
export default function CourseList() {
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForName=RegExp(/[A-Za-z ]+/);
    const regForMobilenum=RegExp(/[7-9]{1}[0-9]{9}/)
    const [course, setcourse] = useState({courseData:[]})
    const FullName = useRef(null)
    const Email = useRef(null)
    const MobileNumber = useRef(null)
    const [NameError, setNameError] = useState('')
    const [EmailError, setEmailError] = useState('')
    const [MobileNumberError, setMobileNumberError] = useState('')
    const [SelectedCourse, setSelectedCourse] = useState('')
    const [form, setform] = useState(false)
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setcourse({...course,courseData:res.data})
        })
        console.log(course.courseData);
    }, [])

    const handler=(event)=>{
        const name=event.target.name;
        switch (name) {
            case 'Fullname':
                const checkfullname=regForName.test(FullName.current.value)?'':"Enter valid Name"
                setNameError(checkfullname)
                break;
            case 'email':
                const checkemail=regForEmail.test(Email.current.value)?'':"Enter Valid Email pattern"
                setEmailError(checkemail)
                break;
            case 'mobilenumber':
                const checkmobileno=regForMobilenum.test(MobileNumber.current.value)?'':'Enter Valid Number'
                setMobileNumberError(checkmobileno)
                break;
            default:
                break;
        }
    }

    const Enquire=(key)=>{
        console.log(key);
        setform(true)
        setSelectedCourse(key)
    }

    const submit=()=>{
        console.log(SelectedCourse);
        let SelectedCourseName;
        course.courseData.forEach(element => {
            if(element.courses_id==SelectedCourse){
                SelectedCourseName=element.courses_name;
            }
        });
        if(FullName.current.value!='' && Email.current.value!='' && MobileNumber.current.value!=''&& NameError==''&&EmailError==''&&MobileNumberError==''){
            const formData={id:Math.random(),Name:FullName.current.value,Email:Email.current.value,MobileNumber:MobileNumber.current.value,CourseId:SelectedCourse,CourseName:SelectedCourseName}
            console.log(formData);
            clientuser.post("/",formData)
            setform(false)
        }
        else{
            alert("Please Fill the form")
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col lg={12}>
                        <Row>
                            {course.courseData.map((Course)=>
                                <Col lg={3} key={Course.courses_id} className="mb-3 mt-3">
                                    <Card style={{ width: '18rem' }} className="p-2">
                                    <Card.Img variant="top" src={`images/${Course.image}`} height="200px"/>
                                    <Card.Body>
                                        <Card.Title>{Course.courses_name}</Card.Title>
                                        <Card.Text>
                                            {Course.price}<br/>
                                            {Course.Description}<br/>
                                            <Button variant="outline-primary" onClick={()=>Enquire(Course.courses_id)}>Enquire</Button>{' '}
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        {form?
                        <Col lg={12}>
                            <Row>
                                <Col lg={3} />
                                <Col lg={6}>
                                    <Card className="mt-5">
                                        <Card.Body>
                                            <Form>
                                                
                                                <Form.Group  className="mb-2" controlId="frombasicName">
                                                    <Form.Label className="float-left">Full Name</Form.Label>
                                                    <Form.Control type="text" name="Fullname" placeholder="Enter Full Name" onChange={handler} ref={FullName} />
                                                </Form.Group>
                                                {NameError?
                                                <Toast>
                                                    <Toast.Body className="red">{NameError}</Toast.Body>
                                                </Toast>:''}
                                                <Form.Group  className="mb-2" controlId="frombasicEMail">
                                                    <Form.Label className="float-left"> Email</Form.Label>
                                                    <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handler} ref={Email} />
                                                </Form.Group>
                                                {EmailError?
                                                <Toast>
                                                    <Toast.Body className="red">{EmailError}</Toast.Body>
                                                </Toast>:''}
                                                <Form.Group  className="mb-2" controlId="frombasicMobileNumber">
                                                    <Form.Label className="float-left ">Mobile Number</Form.Label>
                                                    <Form.Control type="text" name="mobilenumber" placeholder="Enter Mobile Number" onChange={handler} ref={MobileNumber} />
                                                </Form.Group>
                                                {MobileNumberError?
                                                <Toast>
                                                    <Toast.Body className="red">{MobileNumberError}</Toast.Body>
                                                </Toast>:''}
                                                <Button variant="outline-primary" onClick={submit}>Submit</Button>{' '}
                                                
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                    
                                </Col>
                            </Row>
                        </Col>:''}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
