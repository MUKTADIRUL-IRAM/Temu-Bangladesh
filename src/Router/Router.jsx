import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import PriceDrop from "../Pages/PriceDrop";
import BestSeller from "../Pages/BestSeller";
import HomeSale from "../Pages/HomeSale";
import ActivePage from "../Pages/ActivePage";



const router = createBrowserRouter([
   {
    path:'/',
    element: <MainLayout></MainLayout>,
    errorElement: "Route Not Found",
    children:[
      {
         path:'/',
         element : <Home></Home>
      },
      {
         path:'/pricedrop',
         element:<PriceDrop></PriceDrop>
      },
      {
         path:'/bestseller',
         element:<BestSeller></BestSeller>
      },
      {
         path:'/homesale',
         element:<HomeSale></HomeSale>
      },

      {
         path:'/product/:endpoint',
         element:<ActivePage></ActivePage>
      },
     
    ]
   }
])

export default router;