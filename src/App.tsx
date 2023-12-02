import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/Router'
import { AuthProvider } from './context/auth/Auth';
import './Styled/globalStyled.css'

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  
  )
}

export default App