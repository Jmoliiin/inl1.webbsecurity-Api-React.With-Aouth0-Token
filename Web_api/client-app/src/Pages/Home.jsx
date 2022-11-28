
import React from 'react'
import { useState,useEffect } from 'react'
import Loading from '../components/Loading'
import Post from '../components/Post'

const Home = () => {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    const getPosts= async ()=>{
      setLoading(true)
      try{
        console.log("fetch Home")
        const res = await fetch("https://localhost:7170/api/Post")
        if(!res.ok){
          throw new Error(res.status, res.statusText)
        }
        const data = await res.json()
        setPosts(data)
        setLoading(false)
      }catch(err){
        console.log(err.message)
        setLoading(false)
      }

    }
    
    getPosts();
  },[])

  if(loading){
    return<Loading/>
  }
  return (
    <div className="container d-flex mt-5 mb-5" id="Blog">
      <div className="arthurs">
        <h5>Filter by arthur</h5>
        <p>
          <a className="arthure-link" >Show all posts</a>
        </p>
      </div>
    <div className="row justify-content-between row-cols-1 row-cols-lg-2 row-cols-xl-3">
        
        {
          posts.length>0 ? posts.map(post =>(
            <Post key={post.id} post={post}/>
          ))
          : <p>no post to show</p>
        }
    </div>
</div>
  )
}
export default Home
