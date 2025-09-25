import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const Featured = ({header,setActiveCategory}) => {
    const{name,endpoint} = header;
   

    return (
        <Link to={`${name}`} onMouseEnter={()=>setActiveCategory(endpoint)}
        className="flex justify-between items-center w-52 text-xl font-bold pl-3 py-1 mt-4 rounded-2xl text-black bg-slate-400">
            <div>{name}</div>
            <FaAngleRight></FaAngleRight>
        </Link>
    );
};

export default Featured;