import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const AssignTask=()=>{
    const [mydata, setMydata]= useState([]);
    const [input, setInput] = useState({});
    const [show, setShow] = useState(false);
    const [userid, setUserid]= useState("");
   const handleClose = () => setShow(false);

   const handleShow = (uid) =>{
    setUserid(uid);
    setShow(true);
   } 

    const loadData=async()=>{
         let api=`${BackEndUrl}/admin/showuserdata`;
         try {
               const response= await axios.get(api);
               setMydata(response.data);
               console.log(response.data);
         } catch (error) {
             console.log(error);
         }
    }

useEffect(()=>{
    loadData();
}, [])


const handleInput=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  setInput(values=>({...values, [name]:value}));
  console.log(input);
}


const handleSubmit=async(e)=>{
    e.preventDefault();
      let api=`${BackEndUrl}/admin/assigntask`;
      try {
          const response = await axios.post(api, {...input, userid});
          console.log(response.data);
      } catch (error) {
         console.log(error);
      }
    
}





let no=0;
const ans=mydata.map((key)=>{
    no++;
     return(
        <>
          <tr>
            <td> {no} </td>
            <td> {key.name} </td>
            <td> {key.email} </td>
            <td> {key.designation} </td>
            <td> 
                <Button variant="outline-info"  onClick={()=>{handleShow(key._id)}}>Assign Task</Button>
            </td>
          </tr>
        </>
     )
})



    return(
        <>
          <h2> Assign Task To User</h2>
          <hr />
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Designation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
     </Table>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

           <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Task Title</Form.Label>
        <Form.Control type="text" name="title" onChange={handleInput}/>
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Description</Form.Label>
        <Form.Control type="text" name="description" onChange={handleInput}/>
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Completion Day</Form.Label>
        <Form.Control type="text" name="complday" onChange={handleInput}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>



        </Modal.Body>
      </Modal>
        </>
    )
}

export default AssignTask;