import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import PriceDrop from "../Pages/PriceDrop";
import BestSeller from "../Pages/BestSeller";
import HomeSale from "../Pages/HomeSale";
import ActivePage from "../Pages/ActivePage";
import SearchProduct from "../Pages/SearchProduct";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import PrivateRouter from "./PrivateRouter";



const router = createBrowserRouter([
   {
    path:'/',
    element: <MainLayout></MainLayout>,
    errorElement: "Route Not Found",
    children:[
      {
         path:'/',
         element : <PrivateRouter><Home></Home></PrivateRouter>
      },
      {
         path:'/pricedrop',
         element:<PrivateRouter><PriceDrop></PriceDrop></PrivateRouter>
      },
      {
         path:'/bestseller',
         element:<PrivateRouter><BestSeller></BestSeller></PrivateRouter>
      },
      {
         path:'/homesale',
         element:<PrivateRouter><HomeSale></HomeSale></PrivateRouter>
      },

      {
         path:'/product/:endpoint',
         element:<PrivateRouter><ActivePage></ActivePage></PrivateRouter>
      },
      {
         path:'/search',
         element:<SearchProduct></SearchProduct>
      },

      {
         path:'/registration',
         element:<Registration></Registration>
      },

      {
         path:'/login',
         element:<Login></Login>
      },

     
    ]
   }
])

export default router;