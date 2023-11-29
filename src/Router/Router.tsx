import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home'
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";


const Private = ({Item}:any) =>{
    const signed = false;
    return signed ? <Item />:<Signin />
}

function Router() 
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/home" element={<Private item={Home}/>}/>
            <Route path="/" element={<Signin />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="*" element={<Signin />}/>
        </Routes>
        
     </BrowserRouter>
    )
  
}

export default Router