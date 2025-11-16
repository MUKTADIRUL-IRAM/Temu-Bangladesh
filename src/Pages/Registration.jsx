import google from "../assets/icons/Google__G__logo.svg.webp";
import facebook from "../assets/icons/Facebook-Logo.png";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Registration = () => {

    const {createUser,updateUserProfile,signInWithGoogle,signInWithFacebook,emailVerification} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleSubmit = (e)=>{

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;

        //Email and password Authentication
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

      function validateCredentials (email,password){

        const isEmailValid = emailRegex.test(email);// returns true/false
        const isPasswordValid = passwordRegex.test(password);

        return{
            isEmailValid,isPasswordValid
            //isEmailValid:isEmailValid,isPasswordValid:isPasswordValid
        };
    }
    
        const checked = validateCredentials(email,password);

        if(checked.isEmailValid && checked.isPasswordValid)
        {
         console.log("Email & password are valid");
         
        }

        createUser(email,password)
        .then((usercredentials)=>{
            const user = usercredentials.user;
            updateUserProfile({displayName: `${firstname} ${lastname}`})
            .then(()=>{
                console.log("Profile Updated");
                navigate('/login');

            }).catch((error)=>{
                const errorMessage = error.message;
                console.log("Error in profile update: ",errorMessage);
                
            });
            // emailVerification()
            // .then(()=>{
            //     console.log("Verification Email Sent");
            //     Swal.fire("Verification email has been sent. Please check your inbox.");
            // }).catch((error)=>{
            //     const errorMessage = error.message;
            //     console.log("Error in email verification : ",errorMessage);
                
            // });
            console.log("User Profile : ",user);
            e.target.reset();
            if(user.uid)
            {
             Swal.fire("Registration Completed Successfully");  
            }
        })
        .catch((error)=>{
            const errorMessage = error.message;
            console.log("Error in registration of user: ",errorMessage);
            
        });


    }

    const handleGoogle = ()=>
    {
      signInWithGoogle()
      .then((result)=>{
        const user = result.user;
        console.log(user);
        if(user.uid)
        {
            Swal.fire("Registration Completed Successfully");  
        }
           navigate('/login');
        
      })
      .catch((error)=>{
        const errorMesssage = error.message;
        console.log("Error : ",errorMesssage);
        
        
      })
    }

    const handleFacebook = ()=>
    {
        signInWithFacebook()
        .then((result)=>{
            const user = result.user;
            console.log(user);
            if(user.uid)
            {
             Swal.fire("Registration Completed Successfully");  
            }
               navigate('/login');
            
        }).catch((error)=>{
            const errorMessage = error.message;
            console.log("Error : ",errorMessage);
             
        })
    }



    

    return (
        <div>
            <h2 className="text-center font-bold text-6xl mt-6">Registration</h2>
           
                <div className="flex w-4xl mx-auto h-fit border rounded-2xl my-8">
                <form onSubmit={handleSubmit} className="p-4">
                    <fieldset className="fieldset">
                        <label className="label text-xl" htmlFor="First Name">First Name</label>
                        <input className="input" type="text" name="firstname" placeholder="" required/>
                        <label className="label text-xl" htmlFor="Last Name">Last Name</label>
                        <input className="input" type="text" name="lastname" placeholder="" required/>
                        <label className="label text-xl" htmlFor="Email">Email</label>
                        <input className="input" type="text" name="email" placeholder="Enter your valid E-mail" required/>
                        <label className="label text-xl" htmlFor="Password">Password</label>
                        <input className="input" type="password" name="password" placeholder="" required/>
                        <button type="submit" className="btn btn-primary w-80 mt-4">Submit</button>
                    </fieldset>
                </form>
                    <div className="border ml-16 h-96 mt-5"></div>

                <div className="flex flex-col justify-center">
                    {/* Google */}
                    <button onClick={handleGoogle} className="flex space-x-4 btn btn-neutral w-96 h-14 rounded-xl mt-12 ml-12">
                        <img className="h-8" src={google} alt="Google" />
                        <div className="text-xl">Continue with Google</div>
                    </button>

                     {/* Facebook */}
                    <button onClick={handleFacebook} className="flex btn btn-primary w-96 h-14 rounded-xl mt-12 ml-12">
                        <img className="h-10" src={facebook} alt="Facebook" />
                        <div className="text-xl">Continue with Facebook</div>
                    </button>
                </div>

                    
                </div>
                
           
        </div>
    );
};

export default Registration;