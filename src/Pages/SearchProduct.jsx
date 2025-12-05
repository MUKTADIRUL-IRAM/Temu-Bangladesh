import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowCaseProducts from "./ShowCaseProducts";


const SearchProduct = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
   

    // Extract the query parameter from the URL (?q=mens-cloth)
    const query = new URLSearchParams(location.search).get("q");

    useEffect(()=>{
        if (!query) return;
        axios.get(`https://temu-bangladesh-server.onrender.com/${query}`)
        .then(res=>setResults(res.data));
    },[query]);

    return (
    <div>
        <button onClick={() => navigate('/')} className="text-blue-500 mb-4 underline">← Back to Home</button>
        <h2 className="text-2xl font-semibold mb-6">Search Results for: <span className="text-orange-500">{query}</span></h2>
        <div>
        {
            results.length !== 0 ? 
            (<>
            <div className="grid grid-cols-5 gap-4">
                {
                    results.map(x=><ShowCaseProducts key={x._id} prop={x}></ShowCaseProducts>)
                }
            </div>
            </>) : <p>No results found for "{query}"</p>
        }
        </div>
            
    </div>
    );
};

export default SearchProduct;