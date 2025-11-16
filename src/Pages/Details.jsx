import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaChevronCircleLeft, FaChevronCircleRight, FaStar } from "react-icons/fa";
import Comment from "./Comment";
import AddToCart from "./AddToCart";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import moment from "moment";

const Details = ({prop}) => {
    
    const {user} = useContext(AuthContext);

    const{_id,desc,collectionName,image,ratings,number_of_items_sold,sold_by,current_price,previous_price,price_drop_percentage,number_of_persons_reviewed,review: initialReviews,qty,star} = prop;

    const imageList = Object.values(image || {});

    const[currentIndex,setCurrentIndex] = useState(0);
    const[showDropDown,setShowDropDown] = useState(false);
    const[quantity,setQuantity] = useState(null);

    const[thumbTop,setThumbTop] = useState(0);

    // ✅ Maintain review list in state
    const [reviews, setReviews] = useState(initialReviews || []);
  
    
    const imgColumn = useRef(null);
    const wrapperRef = useRef(null);

   // thumbnail sizes
    const thumbHeight = 66; // each thumbnail height incl. margin
    const visibleCount = 8; // how many thumbnails visible in column
    const maxScroll = Math.max(0, (imageList.length - visibleCount) * thumbHeight);

    // const imgWidth = 576+14; 
    const maxIndex = imageList.length-1;
    
    const handleDirection = (direction)=>{

        if(direction === 'right' && currentIndex < maxIndex)
           {
             setCurrentIndex(currentIndex+1);
           }

        else if(direction === 'left' && currentIndex > 0)
            {
                setCurrentIndex(currentIndex-1);
            }
     }

     const handleWheel = (e)=>{

        e.preventDefault();
        let newTop = thumbTop + e.deltaY;
        newTop = Math.max(0, Math.min(maxScroll, newTop));
        setThumbTop(newTop);
    };

     useEffect(()=>{
      
        const thumbnails = imgColumn.current;

        const handleClickedOutside = (e)=>{
            if(wrapperRef.current && !wrapperRef.current.contains(e.target))
            {
                setShowDropDown(false);
            }
        }
        

        if(!thumbnails)
            return;

        thumbnails.addEventListener('wheel',handleWheel,{passive:false});
        document.addEventListener('mousedown',handleClickedOutside);
      

        return()=>{
            thumbnails.removeEventListener('wheel',handleWheel);
            document.removeEventListener('mousedown',handleClickedOutside);
         
        }
    })

    const handleSelect = (num)=>{
        setQuantity(num);
        setShowDropDown(false);
    }

    const handleComment=(e)=>{

        e.preventDefault();
        const comment = e.target.comment.value;

        const newComment = { user_name:user?.displayName || "Anonymous",
                             date:moment().format("DD/MM/YY"),
                             comment:comment};
//['L-shape-sofa','drone','toy-airplane','futon-sofa-bed','portable-blender','bullet-filler','mens-casual-shirt','casual-sneakers','coffee-machine','corduroy-jacket','deep-fryer','dining-table-set','electric-bike','leather-handbag','juicer-machine','cotton-long-sleeve','ss-watch-men','nintendo-switch','non-stick-pan','long-sleeve','recliner-chair','rotating-spice-rack','e-sandwich-maker','smartwatch','uv-protection-sunglass','tote-bag','grooming-trimming-set','wooden-wine-bar','premium-women-perfume','portable-bbq']
        axios.post(`https://temu-bangladesh-server.vercel.app/new-comments/${_id}`,{...newComment,collection: collectionName})
        .then((res)=>{
            if(res.data.insertedId)
            {
               setReviews((prev)=>[...prev,newComment]);
               e.target.reset();//clear input field
            }
            else
            {
               console.error("Error: backend did not return insertedId");
            }
        })
        .catch((err) => {
            console.error("Error posting comment:", err);
        });

    }

    return (
        // flex flex-col space-y-6
        <div className="flex flex-col space-y-6">

           <div className="flex my-12 space-x-2.5">

                   <div ref={imgColumn} className="flex flex-col h-[590px] overflow-hidden">

                           <div className="space-y-2.5 transition-transform duration-150"
                            style={{ transform: `translateY(-${thumbTop}px)` }}>
                                {
                                    imageList.map((url,idx)=>(
                                    <img onMouseEnter={()=>setCurrentIndex(idx)}
                                    className={`w-14 h-14 ${currentIndex === idx ? "w-14 h-14  border-2 border-solid border-violet-400": ""}`}
                                    key={idx} src={url} alt={`image-${idx}`} />)) 
                                }
                           </div>

                  </div>


                           {/* <div className="relative w-xl ml-5">
                               <div className="w-full h-full overflow-hidden">
                                    <div style={{transform:`translateX(-${imgWidth*currentIndex}px)`}}
                                    className="flex space-x-3.5 transition-transform duration-500">
                                        {
                                        imageList.map((url,idx)=>(<img className="w-xl h-full object-cover mt-1.5" key={idx} src={url} alt={description}/>))
                                        }

                                    </div>
                               </div>

                               <button onClick={()=>handleDirection('right')} className="absolute top-1/2 -translate-y-1/2 left-[550px] text-black">
                               <FaChevronCircleRight size={40}></FaChevronCircleRight>
                               </button>

                               <button onClick={()=>handleDirection('left')} className="absolute top-1/2 -translate-y-1/2 right-[550px] text-black">
                               <FaChevronCircleLeft size={40}></FaChevronCircleLeft>
                               </button>
                            </div> */}

                          {/* <div>
                                {
                                   activeURL ?
                                    <>
                                     <div className="w-xl h-12/12">
                                       <img className="w-full h-full object-cover" src={activeURL} alt={description} />
                                     </div>
                                    </> : ""
                                  
                                }
                         </div> */}

                        {/* Img  */}
                    <div className="relative w-xl h-12/12 ml-5">
                            <img
                                src={imageList[currentIndex]}
                                alt={desc}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />

                            {/* Buttons */}
                            <button
                                onClick={() => handleDirection("left")}
                                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black"
                            >
                                <FaChevronCircleLeft size={40} />
                            </button>

                            <button
                                onClick={() => handleDirection("right")}
                                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black"
                            >
                                <FaChevronCircleRight size={40} />
                            </button>
                    </div>

                    <div className="w-xl">
                        {/* Desc */}
                        <div className="text-xl font-semibold">{desc}</div>
                       
                       {/* Items Sold,Ratings */}
                        <div className="flex justify-between items-center mt-2">
                          <p className="space-x-3">
                            <span>{number_of_items_sold}</span>
                            <span>|</span>
                            <span>{sold_by}</span>
                          </p>
                          <p className="flex items-center text-xl font-semibold space-x-1.5">
                            <span>{ratings}</span>
                            <span>{star}</span>
                          </p>
                        </div>

                        {/*Price  */}
                        <div className="flex items-center space-x-6 mt-12">
                            
                            <div className="flex justify-center items-center">
                            <span className="text-5xl">$</span>
                            <span className="text-5xl font-semibold">{current_price}</span>
                            <span className="font-semibold text-2xl ml-3 line-through">{previous_price}</span>
                            </div>

                           <div className="text-xl space-x-1.5">
                            <span className="">{price_drop_percentage}</span>
                            <span className="">price dropped</span>
                           </div>
                           
                        </div>

<div className="flex space-x-10 mt-3.5">
                               {/* Qty */}
    <div ref={wrapperRef} onClick={()=>setShowDropDown(!showDropDown)}
    className="relative flex items-center space-x-3.5 mt-8 ml-2 w-40">

    <label className="label" htmlFor="Qty">Qty</label>

    <div className="w-34 h-10 rounded-[4px] flex items-center pl-2.5 bg-amber-300">
        <span className="text-black text-xl">{quantity ?? "Select"}</span>
    </div>

    {
        showDropDown ? 
        <>
            <div 
            className="w-26 max-h-40 overflow-y-auto z-10  bg-amber-700 absolute top-29 left-10">
            
                {
                    Array.from({length:qty},(_i,i)=>i+1).map((num)=>
                    (
                        <div className="hover:bg-black h-9 px-3 py-1 text-xl" key={num} onClick={()=>handleSelect(num)}>
                            {num}
                        </div>
                        
                    ))
                }
            </div>
            <FaAngleUp className="absolute top-23 left-32 z-10"></FaAngleUp>
        </> :  <FaAngleDown className="absolute top-23 left-32 z-10"></FaAngleDown>
    }

        
    
    
    </div>

          {/* Add to Cart/Free Shipping */}
    <div className="flex flex-col space-y-3.5 mt-18 text-black">
                         <div className="font-semibold flex flex-col justify-center items-center w-88 h-18 rounded-3xl bg-amber-400">
                            <AddToCart id={_id} quantity={quantity}></AddToCart>
                         </div>
                         <div className="font-semibold flex flex-col justify-center items-center w-88 h-18 rounded-3xl bg-violet-400">
                             <div>Buy Now</div>
                             <div>Free Shipping & Faster Dispatch</div>
                         </div>
                        
    </div>

</div>

                     

                    



                    </div>

           </div>

           {/* Reviews/Ratings */}
           <div className="flex space-x-4">

                <div className="text-2xl space-x-2.5">
                    <span className="">{number_of_persons_reviewed}</span>
                    <span>reviews</span>
                </div>

                <div>|</div>

                <div className="text-2xl space-x-2">
                    <span>{ratings}</span>
                    <span>{star}</span>
                </div>
              
           </div>

           <hr />


           {/* Comments */}
           <div className="flex flex-col space-y-5">
              {
                reviews.map((x,idx)=><Comment key={idx} user={x}></Comment>)
              }
           </div>

         
        <div>
            <form onSubmit={handleComment}>
                <fieldset className="fieldset flex space-x-3">
                    <input className="input w-6xl h-12 my-3" type="text" name="comment"/>
                    <button type="submit"> <IoSend size={30}></IoSend> </button>
                </fieldset>
            </form>
        </div>
       



           

            


        </div>
    );
};

export default Details;