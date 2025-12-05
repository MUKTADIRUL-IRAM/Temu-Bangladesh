import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Featured from "./Featured";


const Scroll = ({setActiveCategory}) => {
     const[section,setSection] = useState([]);
     const[thumbTop,setThumpTop] = useState(0);// position of draggable bar

       useEffect(()=>{
           axios.get('https://temu-bangladesh-server.onrender.com/categories')
          .then(res=>setSection(res.data));
    },[])

    const scrollBarRef = useRef(null);
    const amberRef = useRef(null);
    
    const dragging = useRef(false);
    const startY = useRef(0);
    const startTop = useRef(0);

    // sizes
    const viewportHeight = 550; // visible red box height
    const trackHeight = 550; // black scrollbar track height
    const contentHeight = 680; //total red content height

    const thumbHeight = Math.max((viewportHeight/contentHeight)*trackHeight,30);

    const trackMovable = trackHeight-thumbHeight;// scrollbar movement area
    const scrollRange = contentHeight-thumbHeight;// content scroll range

    const contentTranslateY = -(thumbTop/trackMovable)*scrollRange;

    const handleMouseDown = (e)=>{
        e.preventDefault(); // stop text selection immediately
        dragging.current = true;
        startY.current = e.clientY;
        startTop.current = thumbTop;
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
      };

       const handleMouseMove = (e)=>{

        if(!dragging.current)
            return;
        
        let newTop = startTop.current + (e.clientY-startY.current);

        newTop = Math.max(0,Math.min(trackMovable, newTop));

        setThumpTop(newTop);

      };

       const handleMouseUp = ()=>{
        dragging.current = false;
        document.removeEventListener('mousemove',handleMouseMove);
        document.removeEventListener('mouseup',handleMouseUp);
      };

        // --- Wheel scroll ---
      const handleWheel = (e)=>{
        e.preventDefault();// stop default page scroll
        const delta = e.deltaY; // + down, - up

        const currentContentY = -(thumbTop/trackMovable)*scrollRange;
        let newContentY = currentContentY-delta;

        newContentY = Math.max(-scrollRange,Math.min(0,newContentY));  // clamp content

        const newThumbTop = -(newContentY/scrollRange)*trackMovable;

         setThumpTop(newThumbTop);

      };

        // Attach wheel listener to both teal + scrollbar divs
       useEffect(()=>{
          const teal = amberRef.current;
          const bar = scrollBarRef.current;

          if(!teal || ! bar)
             return;

          teal.addEventListener('wheel',handleWheel,{passive:false});
          bar.addEventListener('wheel',handleWheel,{passive:false});

          return()=>{
            teal.removeEventListener('wheel',handleWheel);
            bar.removeEventListener('wheel',handleWheel);
          };


       });



    return (
        <div className="relative flex">

            {/* section div */}
            <div ref={amberRef} className="w-[270px] h-[782px] ml-1 bg-red-800" 
            style={{transform:`translateY(${contentTranslateY}px)`,
            transition: dragging.current? 'none' : "transform 0.1s linear"}}>
                 
                  <div className="ml-4 mt-2 space-y-3.5">
                    {
                        section.map(x=><Featured key={x._id} header={x} setActiveCategory={setActiveCategory}></Featured>)
                    }
                  </div>
                 
            </div>

    
      {/* Scrollbar */}    
    <div ref={scrollBarRef} className="w-2 h-[100px] absolute left-[269px] bg-black rounded-full cursor-pointer"
    style={{top:`${thumbTop}px`, height:`${thumbHeight}px`}}
    onMouseDown={handleMouseDown}></div>
            
        <div className="w-0 h-[550px] ml-1 border border-l-1 border-r-1 border-r-black border-l-black"></div>
        </div>
    );
};

export default Scroll;