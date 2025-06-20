import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

const MyTask = () => {
  
  const [mydata, setMydata] = useState([]);
  const loadData = async () => {
    let api = `${BackEndUrl}/user/mytask/?id=${localStorage.getItem("userid")}`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitTask =async (id) => {
        let api = `${BackEndUrl}/user/completetask/?id=${id}`
        try {
          const response = await axios.get(api);
          console.log(response);
          
        } catch (error) {
          console.log(error);
          
        }
        loadData();
  };

  const ans = mydata.map((key) => {
    return (
      <>
     
        <tr>
          <td>{key.title}</td>
          <td>{key.description}</td>
          <td>{key.comday}</td>
          <td>
                {key.taskstatus ? (<>
                  <Button style={{backgroundColor:"green"}} disabled>Task Submited</Button>
                </>) :(<>
                       <Button onClick={()=>{submitTask(key._id)}}>Submit Task</Button>
                </>)}
               
               
              </td>
        </tr>
      </>
    );
  });

  return (
    <>
     
      <h3> Task List Given By Admin</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title#</th>
            <th>Description</th>
            <th>Compelition Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{ans}</tbody>
      </Table>
    </>
  );
};

export default MyTask;
