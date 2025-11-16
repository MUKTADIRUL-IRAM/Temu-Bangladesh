import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouter = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

      if (loading) 
      {
           return (
                <div className="flex justify-center items-center h-16 bg-green-500 text-white">
                    <span className="loading loading-spinner loading-lg"></span>
                    <span className="ml-2">Checking user status...</span>
                </div>
          );
      }

    if(user)
    {
        return children;
    }
    
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default PrivateRouter;