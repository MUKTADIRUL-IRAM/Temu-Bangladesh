import { FaAngleRight, FaSortDown, FaSortUp } from "react-icons/fa";
import logi from "../assets/icons/fast-delivery 1.png";
import { CiMobile3 } from "react-icons/ci";
import techi from "../assets/icons/techi.jpg";
import temu from "../assets/icons/temu-1.jpg";
import { AiOutlineLike } from "react-icons/ai";
import { RxStarFilled } from "react-icons/rx";
import leaf from "../assets/icons/leaf.png";
import { IoIosArrowDown, IoIosArrowUp, IoMdPerson } from "react-icons/io";
import { MdWhatsapp } from "react-icons/md";
import { easeInOut, motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Featured from "../Pages/Featured";
import CustomScroll from "../Pages/CustomScroll";
import Scroll from "../Pages/Scroll";
import CategoriesMenu from "../Pages/CategoriesMenu";



const Navbar = () => {

    const[hovered,setHovered] = useState(false);
    // const[section,setSection] = useState([]);
    // const[currentHeight,setCurrentHeight] = useState(0);

    // useEffect(()=>{
    //       axios.get('http://localhost:5000/categories')
    //       .then(res=>setSection(res.data));
    // },[])
   

    return (
        <div>
            {/* 1st Navbar */}
             <div className="bg-black flex justify-between items-center px-12 py-2">
            {/* Free Shipping */}
            <div className="flex space-x-4">
                <img className="w-12 h-12" src={logi} alt="LogisticVan" />
                 <div className="hover:underline">
                        <div className="flex">
                            <h2 className="font-bold">Free Shipping</h2>
                            <FaAngleRight className="relative top-1"></FaAngleRight>
                         </div>
                         <h4>Special for you</h4>
                 </div>
            </div>

            <div className="w-0 h-12 border-r-1 border-r-blue-500"></div>

            {/* Free Returns */}
            {/* <div className="flex">
              
                 <div>
                        <div className="hover:underline">
                            <h2>Free Returns</h2>
                            <h4>Up to 90 days</h4>
                         </div>
                         
                 </div>
            </div> */}

          <div className="relative h-14 overflow-hidden">
               <motion.div animate={{y:[0,-80,0]}}
                           transition={{duration:15,repeat:Infinity,ease:"easeInOut"}} className="">
                    <div className="h-14 hover:underline">
                        <h2>Free Returns</h2>
                        <h4>Up to 90 days</h4>
                    </div>
                    <div className="h-14 hover:underline">
                        <h2>Price Adjustments</h2>
                        <h4>Within 30 days</h4>
                    </div>
               </motion.div>
          </div>

            <div className="w-0 h-12 border-r-1 border-r-blue-500"></div>


            {/* Get Temu App */}
            <div className="flex items-center space-x-2">
                <CiMobile3 size={40}></CiMobile3>
                 <div>
                    <h2 className="hover:underline">Get the Temu App</h2>
                </div>
            </div>

            <div className="w-0 h-12 border-r-1 border-r-blue-500"></div>

            {/* Become a Seller */}
            <div className="relative flex w-80 h-14 border border-solid border-gray-400 hover:border-2 hover:border-[#FFF] rounded-[8px] overflow-hidden">
                
                <img className="w-full h-full object-cover" src={techi} alt="techi boy" />

                <div className="absolute inset-0 bg-black/70">

                    <div className="flex justify-center items-center space-x-3">
                            <p className="font-semibold">Become a Seller</p>
                            <button className="flex justify-center items-center w-36 h-10 bg-[#fa7500] rounded-3xl mt-1.5">
                            <span>Join Now</span>
                            <FaAngleRight></FaAngleRight>
                            </button>
                     </div>
                
                
                </div>

            </div>

        
             </div>

             {/* 2nd Navbar */}
             <div className="flex items-center justify-between bg-green-500">
                <div> <img className="w-16 h-16" src={temu} alt="temulogo" /> </div>

                <NavLink to='/best-items' className="flex hover:w-40 hover:h-12 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400">
                    <AiOutlineLike size={20}></AiOutlineLike>
                    <span>Best-selling items</span>
                </NavLink>

                <NavLink to='/star-rated' className="flex hover:w-30 hover:h-14 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400">
                    <RxStarFilled className="relative" size={20}></RxStarFilled>
                    <span className="">5-Star Rated</span>
                </NavLink>

                <NavLink to='/fall-arrival' className="flex hover:w-30 hover:h-14 justify-center items-center hover:rounded-3xl hover:bg-fuchsia-400">
                    <img className="w-8 h-8" src={leaf} alt="leaf" />
                    <span className="relative">Fall Arrival</span>
                </NavLink>

                <NavLink to='/new' className="flex  hover:w-16 hover:h-14 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400">
                    <span>New In</span>
                </NavLink>
                
                  <div 
                    className="relative flex hover:w-28 hover:h-14 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400"
                    onMouseEnter={()=>setHovered(true)}
                    onMouseLeave={()=>setHovered(false)}>

                            <span className="border-b-0">Categories</span>

                            {
                                hovered ?
                                <>
                                  <IoIosArrowUp size={20}></IoIosArrowUp>
                                  <div className="absolute top-full w-4xl h-[550px] mt-1 z-10 overflow-hidden bg-white">
                                    <CategoriesMenu></CategoriesMenu>
                                  </div>
                                </> : <IoIosArrowDown size={20}></IoIosArrowDown>
                            }
                            
                  </div>

                   
                    
                 






                 {/* Search Bar */}
                  <label className="flex justify-between input rounded-3xl h-12 bg-white/20 border-2 border-solid border-[#FFF]">
               
                    <input className='w-48  placeholder-[#FFF]  font-semibold' type="search" required placeholder="Search" />
                    <div className="w-13 h-10 flex justify-center items-center bg-black rounded-4xl">

                         <svg className="w-[2em] h-[2em] text-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg> 
                    </div>
             </label>

             {/* Sign in/Register */}
             <div className="flex  hover:w-48 hover:h-14 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400">
                <IoMdPerson size={40}></IoMdPerson>
                <div>
                    <span>Sign in / Register</span>
                    <p className="font-semibold">Order & Account</p>
                </div>
             </div>

             {/* Support */}
             <div className="flex space-x-1.5 items-center hover:w-24 hover:h-14 hover:justify-center hover:items-center hover:rounded-3xl hover:bg-fuchsia-400">
                <MdWhatsapp size={30}></MdWhatsapp>
                <span>Support</span>
             </div>


             </div>
              

        </div>
    );
};

export default Navbar;