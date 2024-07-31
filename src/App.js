import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
function App() {
  return (
   <>
   <Router>
   {/* ${navigate = useNavigate()} */}
   <Routes>
        <Route path='/' element={<Explore />} /> 
        <Route path='/offers' element={<Offers />} />
        {/* private Route */}
        <Route path='/profile' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        </Route>
        {/* code section */}
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        
      </Routes>
      <Navbar />
   </Router>
<ToastContainer />
    </>
  )
}

export default App
