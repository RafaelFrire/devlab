import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/Router'
import { AuthProvider } from './context/auth/Auth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  
  )
}

export default App