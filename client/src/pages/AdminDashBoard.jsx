import {Link, Outlet} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const AdminDashBoard=()=>{

    const navigate= useNavigate();

  const logout=()=>{
     localStorage.clear();
      navigate("/");
  }


    return(
         <>
           <div id="dashboard">
                <h1 align="center"> Welcome To Admin DashBorad</h1>            
            </div> 
             <div>
                     <h5> Welcome : {localStorage.getItem("adminuser")} 
                        <a href="#" onClick={logout}>Logout</a></h5>
                </div>   
            <div id="admindata">
                <div id="adminleftmenu">
                 <Link to="createuser" className="adminmenu">
                 
                  Create New User

                 </Link> 
                  <br/> <br />

                  <Link to="assigntask" className="adminmenu">
                 
                  Assign Task

                 </Link> 
          
          <br/> <br />


                  <Link to="taskdetail" className="adminmenu">
                 
                   Task Details

                 </Link> 
                   
                </div>
               
                <div id="rightdata">
                  
                        <Outlet/>

                </div>
                
            </div>  
        </>
    )
}

export default AdminDashBoard;