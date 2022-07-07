import React from 'react'
import {FcGoogle}  from 'react-icons/fc'
import {app} from '../Config/firebase.config'
import {getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useStateValue } from '../Context/stateProvider.js';
import { actionType } from '../Context/reducer.js';
import { validateUser } from '../api/index.js';
import {LoginBg} from '../assets/video'

const Login = ({setauth}) => {
  
  const [{user},dispatch] = useStateValue() 
  const firebaseauth= getAuth(app);
  const provider= new GoogleAuthProvider();
  const navigate = useNavigate();

  const googlelogin= async ()=>{
      await signInWithPopup(firebaseauth,provider)
      .then((userCred)=>{
       if(userCred){
        setauth(true);
        window.localStorage.setItem('auth', 'true');
        firebaseauth.onAuthStateChanged((userCred)=>{
          if (userCred) {
            userCred.getIdToken().then((token)=>{
              validateUser(token).then((data)=>{
                dispatch({
                  type:actionType.SET_USER,
                  user:data,
                })
              })
            }) 
            navigate('/',{replace:true});
          }else{
            setauth(false);
            dispatch({
              type:actionType.SET_USER,
              user:null,
            })
            navigate('/login');
          }
        })
       }
      })
  }

  useEffect(() => {
    
  if (window.localStorage.getItem('auth')=== 'true') {
    navigate('/',{replace:true})
  }
    
  }, [])
  
  return (
    <div className="relative h-screen w-screen">
    <video src={LoginBg} type='video/mp4' autoPlay muted loop className='w-full h-full object-cover '/>
    <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
      <div className="w-full md:w-375 p-4  bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex
      flex-col items-center justify-center">
      <div className='flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all'
      onClick={googlelogin}>
      <FcGoogle className='text-xl font-medium'/>
      Sign in with google
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login