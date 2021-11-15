import React, { useEffect,useState,useRef } from 'react'
import { Card, Col,  Row,Button, Form, Modal } from 'react-bootstrap'
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
    const [zoomimage, setzoomimage] = useState('')
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
        
        client.get(`?courses_id=${SelectedCourse}`)
        .then(res=>{
            console.log(res.data[0].courses_name);
            let SelectedCourseName=res.data[0].courses_name;
            console.log(SelectedCourseName);
            if(FullName.current.value!='' && Email.current.value!='' && MobileNumber.current.value!=''&& NameError==''&&EmailError==''&&MobileNumberError==''){
            const formData={id:Math.random(),Name:FullName.current.value,Email:Email.current.value,MobileNumber:MobileNumber.current.value,CourseId:SelectedCourse,CourseName:SelectedCourseName}
            console.log(formData);
            clientuser.post("/",formData)
            setform(false)
        }
        else{
            alert("Please Fill the form")
        }
        })
    }
    const images=(imageurl)=>{
        setzoomimage(imageurl)
    }
    const normal=()=>{
        setzoomimage('')
    }
    return (
        <div>
                <Row>
                    <Col lg={12}>
                        <Row>
                            {course.courseData.map((Course)=>
                                <Col lg={3} key={Course.courses_id} className="mb-3 mt-3 ">
                                    <Card style={{ width: '18rem' }} onMouseOver={()=>images(Course.image)} onMouseOut={()=>normal()}  className="p-2 course-card"  >
                                    <Card.Img variant="top" src={`images/${Course.image}`} height="200px" className={`  ${Course.image==zoomimage?'zoom':''}`}/>
                                    <Card.Body>
                                        <Card.Title>{Course.courses_name}</Card.Title>
                                        <Card.Text>
                                            {Course.price}<br/>
                                            {Course.Description}<br/>
                                            <div className="d-grid gap-2">
                                            <Button variant="outline-dark" className="mt-2" size="lg" onClick={()=>Enquire(Course.courses_id)}>Register</Button>{' '}</div>
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                        {form?
                        <Modal
                        show={form}
                        onHide={() => setform(false)}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton/>
                        <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                            Register
                            </Modal.Title>
                         <Modal.Body >
                            <Form.Group  className="mb-2" controlId="frombasicName">
                                    <Form.Label className="float-left">Full Name</Form.Label>
                                    <Form.Control type="text" name="Fullname" placeholder="Enter Full Name" onChange={handler} ref={FullName} />
                                </Form.Group>
                                <span className="red">{NameError}</span>
                                <Form.Group  className="mb-2" controlId="frombasicEMail">
                                    <Form.Label className="float-left"> Email</Form.Label>
                                    <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handler} ref={Email} />
                                </Form.Group>
                                <span className="red">{EmailError}</span>
                                <Form.Group  className="mb-2" controlId="frombasicMobileNumber">
                                    <Form.Label className="float-left ">Mobile Number</Form.Label>
                                    <Form.Control type="text" name="mobilenumber" placeholder="Enter Mobile Number" onChange={handler} ref={MobileNumber} />
                                </Form.Group>
                                <span className="red">{MobileNumberError}</span>
                                </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="outline-primary" onClick={submit}>Submit</Button>{' '}
                                    </Modal.Footer>
                        </Modal>:''}
                        
                    </Col>
                </Row>
        </div>
    )
}
