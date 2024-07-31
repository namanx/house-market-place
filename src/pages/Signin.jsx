import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import visibilityIconTrue from '../assets/svg/visibilityIconTrue.svg';

function Signin() {

  const [showpassword,setshowpassword] = useState(false);
  const [formdata,setformdata] = useState({
      email : '',
      password : '',
  })

  const {email,password} = formdata;
  const navigate = useNavigate();
  const onChange = (e) =>{
    setformdata((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const LogginUser = async(e) =>{
    e.preventDefault();
    console.log("logged in")
    // toast.apply("hello");
    try{
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      if(userCredential.user){
        navigate('/profile');
      }
    }catch(error){
      toast.error("Bad user Credentials !");
    }

  }
  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back !</p>
      </header>

      <main>
        <form onSubmit={LogginUser}>
          <input type="email" className="emailInput" placeholder="Email :"
          id="email" value={email} onChange={onChange}/>
 
          <div>
          <input type={showpassword ? 'text' : 'password'} 
              className="passwordInput"
              placeholder="Password :" id='password' value = {password} 
              onChange={onChange}/>
              <div>
              <img color='green'src={showpassword ? visibilityIconTrue : visibilityIcon} alt="No Image available " className="showPassword" onClick={() => setshowpassword(!showpassword)}/>
              </div>
          
          </div>

          
          
          <Link to='/forgot-password' className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill="white" width='34px' height='34px'></ArrowRightIcon>
            </button>
          </div>
        </form>

        {/* Google Auth */}
       
        <Link to='/sign-up' className="registerLink">
          Sign Up Instead
        </Link>
      </main>
    </div>
    </>
  )
}

export default Signin
