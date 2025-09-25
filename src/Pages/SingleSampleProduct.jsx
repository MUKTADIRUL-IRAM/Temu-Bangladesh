import { useState } from "react";



const SingleSampleProduct = ({sample}) => {
    const {_id,image,price,discount_percentage,rating} = sample;
    const[cost,setCost] = useState([price]);
    const[review,setReview] = useState([rating]);
    return (
        <div>
            <div className="w-72 h-64">
                <img className="w-full h-full object-cover" src={image} alt="#" />
            </div>


              <div className="bg-black">

               {
                cost.map((x,idx)=><div key={idx}>
                                  <span className="font-semibold text-xl">$</span><strong className="text-2xl">{x.current}</strong>
                                  <span className="ml-2.5 line-through">{x.previous}</span>
                                  <span className="ml-2.5">{x.sold}</span>

                                  </div>)
               }

            </div>

            <div className="bg-black"><strong>{discount_percentage}</strong> limited time</div>

            <div className="bg-black">
                {
                   review.map((x,idx)=><div className="flex space-x-3.5 ml-1.5" key={idx}>
                                        <span>{x.stars}</span>
                                        <span>{x.rated_by}</span>
                                       </div>)
                }
            </div>

           


        </div>
    );
};

export default SingleSampleProduct;