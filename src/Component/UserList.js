import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Card,Container ,Row,Col, Table } from 'react-bootstrap'
const client=axios.create({
    baseURL:"http://localhost:3001/user"
})
export default function UserList() {
    const [UserData, setUserData] = useState({Data:[]})
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setUserData({...UserData,Data:res.data})
        })
    }, [])
    return (
        <div>
            <Container>
            <Row>
                <Col lg={12}>
                    <Row >
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                        {UserData.Data.map((user)=>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.MobileNumber}</td>
                                <td>{user.CourseName}</td>
                            </tr>
                        )}
                        </tbody>
                        </Table>
                    </Row>
                
                </Col>
            </Row>
            </Container>
        </div>
    )
}
