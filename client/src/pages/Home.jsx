import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
//import BackEndUrl from '../config/backendUrl';
import BackEndUrl from '../config/BackendUrl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [adminid, setAsminid]=useState("");
    const [password, setPassword]=useState("");
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

      try {
         let api=`${BackEndUrl}/admin/logincheck`
        const resposne = await axios.post(api, {adminid:adminid, password:password});
        console.log(resposne);
        localStorage.setItem("adminuser", resposne.data.admin.name);
        navigate("admindashboard");
      } catch (error) {
        alert(error.response.data.msg);
      }


       
    }

    return(
        <>

        <h2 id='frm'>admin login form</h2>
        <Form id='frm'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email id</Form.Label>
        <Form.Control type="text" value={adminid} onChange={(e)=>{setAsminid(e.target.value)}} placeholder="Enter id" />
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit" onClick={handleSubmit} >
        login Home
      </Button>
    </Form>
        
        
        
        </>
    )
}

export default Home;