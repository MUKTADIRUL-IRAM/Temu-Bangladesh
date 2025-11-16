import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";


const AddToCart = ({id,quantity}) => {

     const [cartCount, setCartCount] = useState(0); // Store total quantity in cart

    // 🟢 Load cart count when component mounts.Sums up all item quantities from existing cart.
    useEffect(()=>{

        const storedCart = localStorage.getItem('cart');

        if(storedCart)
        {
           const cart = JSON.parse(storedCart);
           const totalQty = cart.reduce((sum,item)=>sum+item.quantity,0);//Sums up all item quantities from existing cart.
           setCartCount(totalQty);
        }

    },[]); 

    const handleAddToCart = (id)=>{

        if (!quantity || quantity <= 0) 
        {
            alert("Please select a quantity before adding to cart!");
            return;
        }

        // 1️⃣ Get the current cart from localStorage (if any)
        let cart = localStorage.getItem('cart');

        // 2️⃣ Convert it from string to array (JSON.parse) or start with empty array
        cart = cart ? JSON.parse(cart) : [];

        // 3️⃣ Check if the product already exists in the cart
        const existingItemIndex = cart.findIndex((item)=>item.id === id);//findIndex returns -1 if not found other returns the Index position

        // 4️⃣ If it exists, increase its quantity
        if(existingItemIndex >= 0)
        {
           cart[existingItemIndex].quantity =  cart[existingItemIndex].quantity+quantity;
        }

        // 5️⃣ If not, add it to cart with quantity = quantity
        else
        {
            const newItem = {id:id,quantity:quantity};
            cart.push(newItem);
        }

        // 6️⃣ Save the updated cart back into localStorage
        localStorage.setItem('cart',JSON.stringify(cart));

        //Recalculates the new total after adding more item.
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);

        // 7️⃣ (Optional) Confirmation for user
        Swal.fire('🛒 Added to cart successfully!');

        
    }

    return (
        <div className="relative cursor-default">
           
            <div onClick={()=>handleAddToCart(id)} className="hover:scale-105 transition text-center bg-red-600 rounded-xl">Add to Cart</div>
            <div>Lowest Price Ever</div>
            {
             cartCount > 0 && <span className={`absolute bottom-6 text-3xl ${cartCount > 9 ? 'left-41' : 'left-42'}`}>{cartCount}</span>
            }
            <FaShoppingCart className="absolute left-40 bottom-0" size={30}></FaShoppingCart>
        </div>
    );
};

export default AddToCart;