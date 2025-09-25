import { Link } from "react-router-dom";


const Sample = ({prop}) => {
    const {image,product_name} = prop;
    return (
        <div className="flex flex-col justify-center items-center space-y-1.5">
            <Link to={`${product_name}`} className='w-24 h-24 rounded-full flex justify-center items-center overflow-hidden' >
               <img className="w-full h-full object-cover rounded-full" src={image} alt={product_name}/>
            </Link>
            <span className="text-black text-center">{product_name}</span>
        </div>
    );
};

export default Sample;