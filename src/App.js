import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Category from './pages/Category';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';
function App() {
  return (
   <>
   <Router>
   {/* ${navigate = useNavigate()} */}
   <Routes>
        <Route path='/' element={<Explore />} /> 
        <Route path='/offers' element={<Offers />} />
        <Route path='/category/:categoryName' element={<Category />} />
        {/* private Route */}
        <Route path='/profile' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        </Route>
        {/* code section */}
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/create-listing' element={<CreateListing/>} />
        <Route path='/edit-listing/:listingId' element={<EditListing/>} />
        <Route path='/category/:categoryName/:listingId' element={<Listing />} />
        <Route path='/contact/:landlordId' element={<Contact />} />
      
      </Routes>
      <Navbar />
   </Router>
<ToastContainer />
    </>
  )
}

export default App
