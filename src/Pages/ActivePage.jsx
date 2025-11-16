import axios from "axios";
import { useEffect, useState } from "react";
import Details from "./Details";
import { useParams } from "react-router-dom";

const ActivePage = () => {

    const {endpoint} = useParams();
    const[items,setItems] = useState([]);

      useEffect(()=>{
        axios.get(`https://temu-bangladesh-server.vercel.app/${endpoint}`)
        .then(res=>setItems(res.data))

      },[endpoint])

    return (
        <div>
            {
                items.map(x=><Details key={x._id} prop={x}></Details>)
            }
        </div>
    );
};

export default ActivePage;