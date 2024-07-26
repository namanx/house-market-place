import { useEffect,useState } from "react";
import { getAuth,updateProfile } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
import {doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase.config";



function Profile() {
  const auth = getAuth();
  const [changeDetails,setChangeDetails] = useState(false);
  const [formdata,setformdata] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  });

  const {name,email} = formdata;


  const navigate = useNavigate();


  const onLogout = () =>{
    auth.signOut();
    navigate('/');
  }

  const onSubmit = async () =>{
    try{
      if(auth.currentUser.displayName !== name){
        // Update display name inside the firebase ...
        await updateProfile(auth.currentUser, {
          displayName : name
        })

        // Update in firestore
        const userRef = doc(db , 'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          name
        })
      }
    }catch(error){
      toast.error("Error occured !")
    }
  }

  const onChange = (e) =>{
    e.preventDefault();
    setformdata((prevState) =>({
      ...prevState,
      [e.target.id] : e.target.value,
    }));
    // console.log(e.target.value);
  }


  return <div className="profile">
    <header className="profileHeader">
        <p className="pageHeader">
          My Profile
        </p>
        <button type="button" onClick={onLogout} className="logOut">
            Logout
        </button>
    </header>
    <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">
              Personal Detail
            </p>
            <p className="changePersonalDetails" onClick={() =>{
              changeDetails && onSubmit();
              setChangeDetails(!changeDetails);
            }}>
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>
        </main>

        <div className="profileCard">
          <form >
            <input type="text" id="name" className={changeDetails ? 'profileNameActive' : 'profileName'} 
            disabled={!changeDetails}
            value={name}
            onChange={onChange}/>
            <input type="email" id="name" className={changeDetails ? 'profileEmailActive' : 'profileEmail'} 
            disabled={!changeDetails}
            value={email}
            onChange={onChange}/>
          </form>
        </div>
  </div>
}

export default Profile
