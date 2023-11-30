import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from '../pages/Home/Home'
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import { PrivateRouter } from "./PrivateRoutes";





function Router() 
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signin />}/>

            <Route path="/home" element={<PrivateRouter />}>
            <Route path="/home" element={<Home />}/>
            </Route>
            <Route path="/Signin" element={<Signin />}/>
            <Route path="/Signup" element={<Signup />}/>
            <Route path="*" element={<Signin />}/>
        </Routes>
        
     </BrowserRouter>
    )
  
}

export default Router