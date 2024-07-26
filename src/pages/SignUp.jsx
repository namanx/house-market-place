import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import { getAuth ,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { setDoc ,doc ,serverTimestamp } from "firebase/firestore";
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import visibilityIconTrue from '../assets/svg/visibilityIconTrue.svg';

function Signup() {

  const [showpassword,setshowpassword] = useState(false);
  const [formdata,setformdata] = useState({
      name : '',
      email : '',
      password : '',
  })

  const {name,email,password} = formdata;
  const navigate = useNavigate();
  const onChange = (e) =>{
    setformdata((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const register = async (e) =>{
        e.preventDefault();
        try{
          const auth = getAuth();

          const userCredential = await createUserWithEmailAndPassword(auth,email,password);

          const user = userCredential.user

          updateProfile(auth.currentUser , {
            displayName : name,
          })

          const formDataCopy = {...formdata}
          delete formDataCopy.password;
          formDataCopy.timestamp = serverTimestamp();
          await setDoc(doc(db , 'users' ,user.uid) , formDataCopy)
          // redirecting to the home page
          navigate('/');

        }catch(error){
          console.log(error);
          toast.error("Something is wrong with the registration !")
        }
  }
  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back !</p>
      </header>

      <main>
        <form onSubmit={register}>

          <input type="text" className="nameInput" placeholder="Name :"
          id="name" value={name} onChange={onChange}/>

          <input type="email" className="emailInput" placeholder="Email :"
          id="email" value={email} onChange={onChange}/>
 
          <div >
          <input type={showpassword ? 'text' : 'password'} 
              className="passwordInput"
              placeholder="Password :" id='password' value = {password} 
              onChange={onChange}/>
          <img color='green'src={showpassword ? visibilityIconTrue : visibilityIcon} alt="No Image available " className="showPassword" onClick={() => setshowpassword(!showpassword)}/>
          </div>

          
          
          {/* <Link to='/forgot-password' className="forgotPasswordLink">
            Forgot Password
          </Link> */}

          <div className="signInBar">
            <p className="signInText">
              Sign Up
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

export default Signup
