import { BsFillLightningChargeFill } from "react-icons/bs";
import desh from "../assets/icons/TIM.webp";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleSampleProduct from "./SingleSampleProduct";
import { FaCaretRight, FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PiSealPercent } from "react-icons/pi";
import { transform } from "motion";
import SlidingSection from "./SlidingSection";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import ShowCaseProducts from "./ShowCaseProducts";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";



const Home = () => {

    const[sampleProducts,setSampleProducts] = useState([]);
    const[slideName,setSlideName] = useState([]);
    const[showCaseProducts,setShowCaseProducts] = useState([]);
    const[currentIndex,setCurrentIndex] = useState(0);
    const[index,setIndex] = useState(0);
    const[activeSlide,setActiveSlide] = useState(0);
   
  

    useEffect(()=>{

        axios.get('https://temu-bangladesh-server.vercel.app/sampleproducts')
        .then(res=>setSampleProducts(res.data));

        axios.get('https://temu-bangladesh-server.vercel.app/sliding-section')
        .then(res=>setSlideName(res.data));
//[https://temu-bangladesh-server.vercel.app/showcase-products]
        axios.get('http://localhost:5000/showcase-products',{withCredentials:true})
        .then(res=>setShowCaseProducts(res.data));
        
    },[]);
     
    // Sample Pics 
    const cardWidth = 288+32;
    const maxIndex = sampleProducts.length-4;

    const slideWidth = 152+8;
    const highestIndex = slideName.length-8;

    const handleDirection = (direction)=>{
        if(direction === 'right' && currentIndex < maxIndex)
        {
            setCurrentIndex(currentIndex+4);
          
        }

        else if(direction === 'left')
        {
            setCurrentIndex(currentIndex-4); 
        }
    }

    const handleSlideDirection = (direction)=>{

        if(direction === 'right' && index < highestIndex)
        {
            setIndex(index+3);
        }
        else if(direction === 'left')
        {
            setIndex(index-3);
        }
    }



    return (
        <div className="">
            <div className="w-full h-96"> 
                <img className="w-full h-full object-cover" src={desh} alt="BangladeshFlag" />
            </div>

            <div className="flex justify-center items-center h-12 my-6 space-x-4 bg-[#5f8f38]">
               <div className="flex items-center space-x-2 ">
                    <BsFillLightningChargeFill></BsFillLightningChargeFill>
                    <span className="font-bold text-3xl"><i>Lightning deals</i></span>
               </div>
              <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Limited time offer</span>
                    <MdOutlineKeyboardArrowRight></MdOutlineKeyboardArrowRight>
              </div>
            </div>

        {/* Sample Products */}
        <div className="relative">
           
           {/* Parent Div(overflow-hidden) */}
            <div className="overflow-hidden">
                
                {/* Child Div(width:3400px) width:`${cardWidth*sampleProducts.length}px`*/}
                <div className="flex space-x-8 transition-transform duration-500"
                    style={{transform:`translateX(-${cardWidth*currentIndex}px)`}}>
                        {
                            sampleProducts.map((x)=><SingleSampleProduct key={x._id} sample={x}></SingleSampleProduct>)
                        }
                </div>

            </div>

                <button className="absolute top-1/2 left-[1220px] -translate-y-1/2" onClick={()=>handleDirection("right")} disabled={currentIndex === maxIndex}>
                    <FaCircleChevronRight size={60}></FaCircleChevronRight>
                </button>

            <button className="absolute top-1/2 right-[1250px] -translate-y-1/2" onClick={()=>handleDirection("left")} disabled={currentIndex === 0}>
                    <FaCircleChevronLeft size={60}></FaCircleChevronLeft>
            </button>

               
               
        </div>

        {/* 3 Boxes */}
        <div className="flex justify-center space-x-5 my-4">
             {/* 1st box */}
            <Link to='/pricedrop' className="flex flex-col justify-between items-center w-xl h-96 bg-cyan-400">
                  <div className="w-80 h-8 mt-6 flex justify-center items-center text-3xl font-bold bg-teal-500">SAVE UP TO $50</div>
                  <div className="text-6xl font-bold text-white">PRICE DROP</div>
                  <button className="flex justify-center items-center text-3xl w-64 h-14 rounded-2xl mb-6 bg-blue-600 ">SHOP NOW<FaCaretRight></FaCaretRight></button>
            </Link>

             {/* 2nd box */}
             <Link to='/bestseller' className="flex flex-col justify-between items-center w-xl h-96 bg-purple-400">
                  <div className="w-80 h-8 mt-6 flex justify-center items-center text-3xl font-bold bg-teal-500">72-HOUR</div>
                  <div className="text-6xl font-bold text-white">BEST SELLERS</div>
                  <button className="flex justify-center items-center text-3xl w-64 h-14 rounded-2xl mb-6 bg-blue-600 ">SHOP NOW<FaCaretRight></FaCaretRight></button>
            </Link>

            {/* 3rd box */}
            <Link to='/homesale' className="flex flex-col justify-between items-center w-xl h-96 bg-blue-500">
                  <div className="w-84 h-10 mt-5 flex justify-center items-center text-3xl font-bold bg-teal-500">HOME SALE DOWN TO</div>
                  <div className="text-6xl font-bold text-white">$1.28</div>
                  <button className="flex justify-center items-center text-3xl w-64 h-14 rounded-2xl mb-6 bg-blue-600 ">SHOP NOW<FaCaretRight></FaCaretRight></button>
            </Link>

        </div>
       
       {/* Labour Day Deals */}
        <div className="mt-6">
            <div className="flex justify-center"><PiSealPercent size={40}></PiSealPercent><span className="text-3xl font-bold text-red-600">LABOUR DAY</span><PiSealPercent size={40}></PiSealPercent></div>
            <div className="flex justify-center text-3xl font-bold text-white">EXPLORE YOUR INTERESTS</div>
        </div>

        
        {/* Sliding Options */}
       <div className="mt-4 relative">

        {/* Parent Div(overflow-hidden) */}
           <div className="overflow-hidden ">

                  {/* Child Div(Style) width:`${slideWidth*slideName.length}` */}
                   <div className="flex space-x-2 transition-transform duration-500"
                   style={{transform:`translateX(-${slideWidth*index}px)`}}>
                        {
                          slideName.map((x,idx)=><SlidingSection 
                          key={x._id} 
                          slide={x} 
                          idx={idx}
                          activeSlide = {activeSlide}
                          setActiveSlide = {setActiveSlide}
                          setShowCaseProducts={setShowCaseProducts}
                          ></SlidingSection>)
                        }
                  </div>
           </div>

           <button className="absolute bottom-3 left-[1260px]"
           onClick={()=>handleSlideDirection('right')}>
           <CiCircleChevRight size={40}></CiCircleChevRight></button>

            <button className="absolute bottom-3 right-[1260px]"
            onClick={()=>handleSlideDirection('left')}>
            <CiCircleChevLeft size={40}></CiCircleChevLeft></button>
       </div>

       {/*Showcase - Products */}
       <div className="grid grid-cols-5 gap-8 mt-6">
          {
            showCaseProducts.map(x=><ShowCaseProducts key={x._id} prop={x}></ShowCaseProducts>)
          }
       </div>

       <div className="mt-3"> <Footer></Footer> </div>
    </div>
    );
};

export default Home;