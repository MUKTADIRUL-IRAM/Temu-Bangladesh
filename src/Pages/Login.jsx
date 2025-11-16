import google from "../assets/icons/Google__G__logo.svg.webp";
import facebook from "../assets/icons/Facebook-Logo.png";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {

    const {signInUser,signInWithGoogle,signInWithFacebook} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state || '/';
    

    const handleLogin = (e)=>{

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email,password)
        .then((usercredentials)=>{
            const user = usercredentials.user;
            console.log(user);
            e.target.reset();
            if(user.uid)
            {
                Swal.fire("Logged in Successfully"); 
            }
            navigate(from);
                    
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log("Error : ",errorMessage);
        })



    }

    const handleGoogle = ()=>{
        signInWithGoogle()
        .then((result)=>{
            const user = result.user;
            console.log(user);
            if(user.id)
            {
              Swal.fire("Logged in Successfully");
            }
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log('Error in Google login : ',errorMessage);
        })
    }

    const handleFacebookLogin = ()=>{
        signInWithFacebook()
        .then((result)=>{
            const user = result.user;
            console.log(user);
            if(user.id)
            {
                Swal.fire("Logged in Successfully");
            }
            
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log("Error in facebook login : ",errorMessage);
            
        })
    }

    return (
        <div>
            <h2 className="text-center font-bold text-6xl mt-6">Login</h2>
             <div className="flex justify-center w-4xl mx-auto h-fit border rounded-2xl my-8">
                <form onSubmit={handleLogin} className="flex items-center p-4">
                    <fieldset className="fieldset">
                        <label className="label text-xl" htmlFor="Email">Email</label>
                        <input className="input" type="text" name="email" placeholder="" required/>
                        <label className="label text-xl" htmlFor="Password">Password</label>
                        <input className="input" type="password" name="password" placeholder="" required/>
                        <button type="submit" className="btn btn-primary w-80 mt-4">Submit</button>
                    </fieldset>
                </form>
                  <div className="border ml-10 h-72 my-2"></div>
                  <div className="flex flex-col justify-center">
                                      {/* Google */}
                                      <button onClick={handleGoogle} className="flex space-x-4 btn btn-neutral w-96 h-14 rounded-xl mt-12 ml-12">
                                          <img className="h-8" src={google} alt="Google" />
                                          <div className="text-xl">Continue with Google</div>
                                      </button>
                  
                                       {/* Facebook */}
                                      <button onClick={handleFacebookLogin} className="flex btn btn-primary w-96 h-14 rounded-xl mt-12 ml-12">
                                          <img className="h-10" src={facebook} alt="Facebook" />
                                          <div className="text-xl">Continue with Facebook</div>
                                      </button>
                  </div>
             </div>
          
        </div>
    );
};

export default Login;