import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import moment from "moment";
import axios from "axios";


const SslPayment = ({price,cartCount}) => {

    const {user} = useContext(AuthContext);

    const handleCreatePayment = async()=>{

        const payment = {
            email:user.email,
            price:price*cartCount,
            transactionId: '',
            date: moment().format("DD/MM/YY"),
            status:"pending",

        };//https://temu-bangladesh-server.onrender.com
      const response = await axios.post("https://temu-bangladesh-server.onrender.com/create-ssl-payment",payment);//http://localhost:5000/create-ssl-payment

      console.log("Payment : ",response);

      if(response.data?.gateWayUrl)
      {
        window.location.replace(response.data.gateWayUrl);
      }
      
      
    };

    return (
        <div>
            <div className="w-44 h-12 rounded-2xl pt-1 flex justify-center bg-cyan-300 cursor-default" onClick={()=>handleCreatePayment()}>Payment</div>
        </div>
    );
};

export default SslPayment;