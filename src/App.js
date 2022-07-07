import './App.css';
import { Route,Routes,useNavigate} from 'react-router-dom'
import { Login,Home } from './Components';
import { useState,useEffect } from 'react';
import { app } from './Config/firebase.config';
import { getAuth } from 'firebase/auth';
import {AnimatePresence} from 'framer-motion';
import { validateUser } from './api/index';
import { useStateValue } from './Context/stateProvider';
import { actionType } from './Context/reducer';

const App=()=> {
  const firebase= getAuth(app);
  const [{user},dispatch] = useStateValue() 
  const [auth, setauth] = useState(false||window.localStorage.getItem('auth')==='true')

  
console.log(auth)
const Navigate= useNavigate();
  useEffect(() => {
    firebase.onAuthStateChanged((userCred)=>{
      if (userCred) {
        userCred.getIdToken().then((token)=>{
          validateUser(token).then((data)=>{
            dispatch({
              type:actionType.SET_USER,
              user:data,
            })
          })
        })
      }else{
        setauth(false);
        window.localStorage.setItem('auth','false');
        dispatch({
          type:actionType.SET_USER,
          user:null,
        })
        Navigate('/login');
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <AnimatePresence exitBeforeEnter>
    <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
    
    <Routes>
      <Route path='/login' element={<Login setauth={setauth} />}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
   
    </div>
    </AnimatePresence>
   
  );
}

export default App;
