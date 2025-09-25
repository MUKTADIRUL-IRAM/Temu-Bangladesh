import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaSortUp } from "react-icons/fa";
import Sample from "./Sample";


const CustomScroll = ({activeCategory}) => {

    const[items,setItems] = useState([]);

     useEffect(()=>{
      
      if(!activeCategory)
       {
         axios.get('http://localhost:5000/featured')
        .then(res=>setItems(res.data))
         return;
       }

        axios.get(`http://localhost:5000/${activeCategory}`)
        .then(res=>setItems(res.data))
        .catch(err=>console.error("Error fetching category data : ",err));
        
    },[activeCategory]);

    const tealRef = useRef(null);
    const scrollBarRef = useRef(null);

      const[thumbTop,setThumpTop] = useState(0); // position of draggable bar
      const dragging = useRef(false);
      const startY = useRef(0);
      const startTop = useRef(0);

   
   // sizes    
  const contentHeight = 1200;   // total teal content height
  const viewportHeight = 550;  // visible teal box height
  const trackHeight = 550;     // amber scrollbar track height

  const thumbHeight = Math.max((viewportHeight/contentHeight)*trackHeight,30);

  // total scrollable ranges
  const trackMovable = trackHeight - thumbHeight; // scrollbar movement area
  const scrollRange = contentHeight - viewportHeight; // content scroll range

      // map thumb movement to teal div translate
      const contentTranslateY = -(thumbTop / trackMovable) * scrollRange;

  
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
          const teal = tealRef.current;
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
        <div>
{/* Track height = 550px

Thumb height = 100px

Scrollable range for thumb = 550 - 100 = 450px

Content height = 1200px

Visible area = 550px

Scrollable range for content = 1100 - 550 = 550px

So the thumb’s 0 → 450px movement should map to the teal div’s 0 → -550px movement. */}

         <div className="flex">
               <div ref={tealRef} className="w-[600px] h-[1200px] ml-1 mt-1 bg-white" 
                style={{height:`${contentHeight}px`,
                transform:`translateY(${contentTranslateY}px)`,
                transition: dragging.current? 'none' : "transform 0.1s linear"}}>

               <div className="grid grid-cols-5 gap-3 pt-2 pl-3">
                  {
                    items.map(x=><Sample key={x._id} prop={x}></Sample>)
                  }

               </div>
              </div>

                {/* ScrollBar */}
                <div ref={scrollBarRef} className="bg-white relative w-3 h-[550px]">
                    
                    <div className="w-2 h-[100px] absolute left-0.5 bg-black rounded-full cursor-pointer"
                    style={{top:`${thumbTop}px`, height:`${thumbHeight}px`}}
                    onMouseDown={handleMouseDown}></div>

                </div>

         </div>

  




        </div>
    );
};

export default CustomScroll;