import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from '../pages/Home/Home'
// import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import { PrivateRouter } from "./PrivateRoutes";
import Course from "../pages/Courses/Course";





function Router() 
{
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
  
          <Route path="/home" element={<PrivateRouter />}>
            {/* Defina a rota padrão para "/home" */}
            <Route index element={<Home />} />
            {/* Adicione outras rotas dentro de "/home" conforme necessário */}
          </Route>
  
          <Route path="/signin" element={<Signin />} />
          
          {/* Use "/cursos" fora de "/home" */}
          <Route path="cursos" element={<PrivateRouter />}>
            {/* Rota /home/cursos privada */}
            <Route index element={<Course />} />
          </Route>
          
          {/* Rota padrão, pode ser "/" ou qualquer outra rota que deseje */}
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    );
  
}

export default Router