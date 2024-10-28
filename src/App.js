
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, FormCheck, FormControl, Row, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserDetail } from './DetailStudent';
import * as userService from "../src/services/UserService"

function App() {
  const [studentArray, setStudentArray] = useState([]);
  
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentActive, setStudentActive] = useState(false);
  const [totalSelectedStudent, setTotalSelectedStudent] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("check array: ", studentArray);
  }, [studentArray])

  useEffect(() => {
    getAllStudent();
  }, []);

  const handleAddStudent = async () => {
    const res = await userService.createStudent(studentCode, studentName, studentActive);
    if (res && res.data && res.data.data) {
      const newStudent = {
        name: res.data.data.name,
        studentCode: res.data.data.studentCode,
        isActive: res.data.data.isActive,
      };
      setStudentArray([...studentArray, newStudent]);
      setStudentName('');
      setStudentCode('');
      setStudentActive(false);
    }
  };
  

  const handleDeleteAllStudent = () => {
    setStudentArray([]);
    setSelectedStudent([]);
    setTotalSelectedStudent(0);
  }

  const handleDeleteStudent = async(_id) => {
    let res = await userService.deleteStudent(_id);
    if(res && res.data){
      let listUpdate = studentArray.filter((item) => item._id !== _id);
      setStudentArray(listUpdate);
    }
    
    
  }
  
  const handleSelectedStudent = (index, checked) => {
    let newSelected = [...selectedStudent];
    newSelected[index] = checked;
    setSelectedStudent(newSelected);
    setTotalSelectedStudent(checked ? totalSelectedStudent+1 : totalSelectedStudent-1);
  }

  const handleNavigate = (item) => {
    navigate('/student', {state: item})
  }

  const getAllStudent = async() => {
    let res = await userService.getListStudent();
    if (res && res.data && res.data.data) {
      setStudentArray(res.data.data);
    }
  }

  return (
    <Routes>
      <Route path='/' element={
    <Container className='mt-5'>
      <Row>
        <Col>
          <h2>Total Selected Student: {totalSelectedStudent}</h2>
        </Col>
        <Col>
          <Button onClick={handleDeleteAllStudent}>Clear</Button>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
          <FormControl
            placeholder='Student Name'
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          ></FormControl>
          <FormControl
            placeholder='Student Code'
            className='my-3'
            value={studentCode}
            onChange={(event) => setStudentCode(event.target.value)}
          ></FormControl>
          <FormCheck
            type='checkbox'
            label='Still active'
            checked={studentActive}
            onChange={(event) => setStudentActive(event.target.checked ? true : false)}
          ></FormCheck>
        </Col>
        <Col>
          <Button onClick={handleAddStudent}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentArray && studentArray.length > 0 &&
              studentArray.map((item, index) => {
                if(item.isActive){
                  return (
                    <tr key={index}>
                      <td><FormCheck type='checkbox' 
                      checked={selectedStudent[index] || false}
                      onChange={(event) => handleSelectedStudent(index, event.target.checked)}
                      /></td>
                      <td onClick={() => handleNavigate(item)}>{item.name}</td>
                      <td>{item.studentCode}</td>
                      <td>
                        
                        <Button>Active</Button>
                      </td>
                      <td>
                        <Button 
                        className='btn btn-danger'
                        onClick={() => handleDeleteStudent(item._id)}
                        >Delete</Button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index}>
                      <td><FormCheck type='checkbox' 
                      checked={selectedStudent[index] || false}
                      onChange={(event) => handleSelectedStudent(index, event.target.checked)}
                      /></td>
                      <td onClick={() => handleNavigate(item)}>{item.name}</td>
                      <td>{item.studentCode}</td>
                      <td>
                        
                        <Button>In-active</Button>
                      </td>
                      <td>
                        <Button 
                        className='btn btn-danger'
                        onClick={() => handleDeleteStudent(item._id)}
                        >Delete</Button>
                      </td>
                    </tr>
                  );
                }
                  
              })
            }

          </tbody>
        </Table>
      </Row>
    </Container>
    }/>
    <Route path='/student' element={<UserDetail/>}/>
    </Routes>
  );
}

export default App;
