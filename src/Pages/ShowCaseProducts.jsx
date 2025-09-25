import { Link } from "react-router-dom";


const ShowCaseProducts = ({prop}) => {
    const {image,desc,updated_price,previous_price,sold_items,star,ratings_count,brand_official_store,keyword,endpoint} = prop;
    
    return (
        <Link to={`/product/${endpoint}`} className="card w-64 shadow-sm text-black bg-amber-600">
                <figure>
                    <img className="w-64 h-64 object-cover" src={image} alt="#" />
                </figure>

                <div className="card-body flex flex-col">
                    
                   <div className="mt-4 font-bold">{desc}</div>

                    <div className="mb-auto">

                        {
                                keyword ? <>
                                <div className="flex justify-center items-center w-18 h-6 border-2 border-black font-bold text-center rounded-[4px]">{keyword}</div>
                                </> : ""
                        }
                    </div>

                     <div className="flex items-center space-x-1">
                        <div className="text-2xl">${updated_price}</div>
                        <div className="line-through">{previous_price}</div>
                        <div>{sold_items}sold</div>
                    </div>

                    <div className="flex space-x-2 text-2xl">
                        <div>{star}</div>
                        <span>{ratings_count}</span>
                   </div>



                    {/* <p>A card component has a figure, a body part, and inside body there are title and actions parts</p> */}
                    <div className="card-actions justify-start items-center mt-auto">
                         <div className="bg-red-500 w-full">
                             <div className="flex justify-center font-semibold rounded-[3px]">{brand_official_store}</div>
                         </div>
                    </div>
                </div>
        </Link>
    );
};

export default ShowCaseProducts;