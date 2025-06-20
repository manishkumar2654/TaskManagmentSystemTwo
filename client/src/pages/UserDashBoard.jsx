import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserDashBoard=()=>{
const navigate = useNavigate();

 const logout=()=>{
    localStorage.clear();
    navigate("/");
 }


    return(
        <>
        <div id="userheader">
              <h1> User DashBoard</h1>
              <h1>5555</h1>
        </div>
         <div id="userdisplayname">
           Welcome : {localStorage.getItem("username") } !
           <a href="#" onClick={logout}>Logout</a> 
         </div>
         <div id="usermenu">
           
             <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">User Area</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
            <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
            <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
            <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      

         </div>

        
          <Outlet/>


        </>
    )
}

export default UserDashBoard;