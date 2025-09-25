import { useState } from "react";
import Scroll from "./Scroll";
import CustomScroll from "./CustomScroll";


const CategoriesMenu = () => {
    const[activeCategory,setActiveCategory] = useState(null);
    return (
        <div className="flex">
            <Scroll setActiveCategory={setActiveCategory}></Scroll>
            <CustomScroll activeCategory={activeCategory}></CustomScroll>
        </div>
    );
};

export default CategoriesMenu;