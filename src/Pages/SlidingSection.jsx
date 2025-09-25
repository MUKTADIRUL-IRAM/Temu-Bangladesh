import axios from "axios";


const SlidingSection = ({slide,idx,activeSlide,setActiveSlide,setShowCaseProducts}) => {

    const {sliding_name,endpoint} = slide;

    const handleClick = async ()=>{
        try
        {
            const res = await axios.get(`http://localhost:5000/${endpoint}`);
            setShowCaseProducts(res.data);
        }
        catch(err)
        {
           console.error("Error fetching showcase Products : ",err);
        }
    }

  

    return (
       <div>
            <div onClick={handleClick} onMouseEnter={()=>setActiveSlide(idx)} 
            className={`flex justify-center items-center text-center w-38 h-16 rounded-xl
            text-black font-bold bg-yellow-300 ${activeSlide === idx ? 'border-4 border-orange-600' : ''}`}>
            {sliding_name}
            </div>
       </div>
    );
};

export default SlidingSection;