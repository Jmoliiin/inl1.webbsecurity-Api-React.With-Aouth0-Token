import React from 'react';
import { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './Auth0/ProtectedRoute';
import { Navbar } from './components/Navbar';
import CreatePost from './Pages/CreatePost';
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import { useAuth0 } from '@auth0/auth0-react';
import PostDetails from './Pages/PostDetails';
import Post from './components/Post';

const App = () => {
  const {getAccessTokenSilently, isAuthenticated} = useAuth0()

  useEffect(()=>{

    const getTocken = async()=>{
    if(isAuthenticated){
      //är inloggade och spara i local stoarge
      try{
        //lägg in options annars?
        const token = await getAccessTokenSilently({
          audience:process.env.REACT_APP_AUTH_AUDIENCE
        })

        console.log(token)

        //spara i localstorage
        localStorage.setItem('accesToken' , token)
      }catch(err){

      }
    }else{
      //vi har loggat ut, ta bort accestken från loccal storage
      localStorage.removeItem('accesToken')
    }
  }

  //kör getaccess()
  getTocken()
    //kollar ändringar i isautenticated och körs då
  },[getAccessTokenSilently, isAuthenticated])
  return (
    <>
      <Navbar/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* profile has a is authenicated in the file to controle the user and it has an userid, otherwise ridirects to login */}
        <Route path="/Profile" element={<Profile />} />
        <Route path='/PostDetails/:id' element={<PostDetails/>}/>
        {/* <Route path='/PostDetails/:id' element={<PostDetails />} /> */}
        {/* <Route path='/CreatePost' element={<CreatePost/>}/> */}
        {/* here we wrap the createpost component in an withAuthenticationrequier.
        When you wrap your components in this Higher Order Component and an anonymous user visits your component they will be redirected to the login page and returned to the page they we're redirected from after login. */}
        <Route path='/CreatePost' element={<ProtectedRoute component={CreatePost}/>}/>
      </Routes>
      </div>
      
    </>
  )
}

export default App