
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, FormCheck, FormControl, Row, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';

function App() {
  const [studentArray, setStudentArray] = useState([
    {name: 'Nguyen Van A', code: 'CODE12345', active: 'Active'},
    {name: 'Tran Van B', code: 'CODE67890', active: 'In-active'}
  ]);
  
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentActive, setStudentActive] = useState('In-active');
  const [totalSelectedStudent, setTotalSelectedStudent] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState([]);

  useEffect(() => {
    console.log("check array: ", studentArray);
  }, [studentArray])

  const handleAddStudent = (event) => {
    setStudentName('');
    setStudentCode('');
    const newStudent = {
      name: event.studentName,
      code: event.studentCode,
      active: event.studentActive,
    }
    setStudentArray([ ...studentArray, newStudent,]);
  }

  const handleDeleteAllStudent = () => {
    setStudentArray([]);
    setSelectedStudent([]);
    setTotalSelectedStudent(0);
  }

  const handleDeleteStudent = (indexStudent) => {
    let listUpdate = studentArray.filter((item, index) => index !== indexStudent);
    setStudentArray(listUpdate);
    
  }
  
  const handleSelectedStudent = (index, checked) => {
    let newSelected = [...selectedStudent];
    newSelected[index] = checked;
    setSelectedStudent(newSelected);
    setTotalSelectedStudent(checked ? totalSelectedStudent+1 : totalSelectedStudent-1);
  }

  return (
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
            onChange={(event) => setStudentName(event.target.value)}
          ></FormControl>
          <FormControl
            placeholder='Student Code'
            className='my-3'
            onChange={(event) => setStudentCode(event.target.value)}
          ></FormControl>
          <FormCheck
            type='checkbox'
            label='Still active'
            checked={studentActive === 'Active'}
            onChange={(event) => setStudentActive(event.target.checked ? 'Active' : 'In-active')}
          ></FormCheck>
        </Col>
        <Col>
          <Button onClick={() => handleAddStudent({ studentName, studentCode, studentActive })}>Add</Button>
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
                  return (
                    <tr key={index}>
                      <td><FormCheck type='checkbox' 
                      checked={selectedStudent[index] || false}
                      onChange={(event) => handleSelectedStudent(index, event.target.checked)}
                      /></td>
                      <td>{item.name}</td>
                      <td>{item.code}</td>
                      <td>
                        <Button className={item.active === 'Active' ? 'btn btn-info' : ''}>{item.active}</Button>
                      </td>
                      <td>
                        <Button 
                        className='btn btn-danger'
                        onClick={() => handleDeleteStudent(index)}
                        >Delete</Button>
                      </td>
                    </tr>
                  );
              })
            }

          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default App;
