import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from "react-bootstrap/Table";
import right from "../images/right.avif";
import wrong from "../images/w.webp";
import Button from "react-bootstrap/esm/Button";
import Pagination from "react-bootstrap/Pagination";

const TaskDetail = () => {
  const [mydata, setMydata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const loadData = async () => {
    let api = `${BackEndUrl}/admin/taskdetail`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeTaskStatus = async (id) => {
    let api = `${BackEndUrl}/admin/changetaskstatus/?id=${id}`;
    try {
      await axios.get(api);
    } catch (error) {
      console.log(error);
    }
    loadData();
  };

  const deleteTask = async (id) => {
    let api = `${BackEndUrl}/admin/deletetask/?id=${id}`;
    try {
      await axios(api);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = mydata.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(mydata.length / tasksPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2>Task Detail List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Status</th>
            <th>S.No</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Task Title</th>
            <th>Description</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((key, index) => (
            <tr key={key._id}>
              <td>
                {key.taskstatus ? (
                  <img src={right} width="30" height="30" />
                ) : (
                  <img src={wrong} width="30" height="30" />
                )}
              </td>
              <td>{indexOfFirstTask + index + 1}</td>
              <td>{key.userid.name}</td>
              <td>{key.userid.email}</td>
              <td>{key.title}</td>
              <td>{key.description}</td>
              <td>
                {key.taskstatus ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => changeTaskStatus(key._id)}
                  >
                    ReAssign
                  </Button>
                ) : (
                  <Button variant="danger" size="sm" disabled>
                    Pending...
                  </Button>
                )}
              </td>
              <td
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => deleteTask(key._id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default TaskDetail;
