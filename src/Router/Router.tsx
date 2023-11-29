import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";


function Router() 
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/sign in" element={<Signup />}/>
        </Routes>
        
     </BrowserRouter>
    )
  
}

export default Router