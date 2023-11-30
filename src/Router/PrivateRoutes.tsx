import { useContext } from "react"
import { AuthContext } from "../context/auth/Auth"
import { Navigate, Outlet } from "react-router-dom"





export const PrivateRouter = () =>{

    const {signed} = useContext(AuthContext)
    // se signed for true, ele terá acesso a todas as rotas da aplicação, se não ele navegara para a página de login.
    return signed ? <Outlet /> : <Navigate to="/signup" />

}

export default PrivateRouter;