import { useLocation,useNavigate } from "react-router-dom"
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import { doc,setDoc,getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import GoogleIcon from '../assets/svg/googleIcon.svg'
function OAuth() {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async() =>{
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider)
            const user = result.user;

            // check for the user
            const docRef = doc(db,'users',user.uid);
            const docSnap = await getDoc(docRef);
            

            // If user does not exist then create user 
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name : user.displayName,
                    email : user.email,
                    timestamp : serverTimestamp(),
                });
            }
            navigate('/')
        }catch(error){
            toast.error("Google Authentication error !")
            console.log(error);
        }

    }
    
  console.log(location.pathname);
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/signin' ? 'in': 'up'}</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg'src={GoogleIcon} alt="Google Icon" />
      </button>
    </div>
  )
}

export default OAuth
