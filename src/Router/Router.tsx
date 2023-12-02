import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from '../pages/Home/Home'
// import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import { PrivateRouter } from "./PrivateRoutes";
import Course from "../pages/Courses/Course";
import CourseEdit from "../pages/CourseEdit/CourseEdit";





function Router() 
{
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
  
          <Route path="/home" element={<PrivateRouter />}>
          {/* Home Rota padrão */}
            <Route index element={<Home />} />
          </Route>
  
          
          
          <Route path="/cursos/:id" element={<PrivateRouter />}>
            {/* Rota /home/cursos/id privada */}
            <Route index element={<CourseEdit />} />
          </Route>

          <Route exact path="/cursos" element={<PrivateRouter />}>
            {/* Rota /home/cursos privada */}
            <Route index element={<Course />} />
          </Route>
          
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    );
  
}

export default Router