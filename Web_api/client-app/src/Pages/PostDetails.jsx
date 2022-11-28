import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import DOMPurify from 'dompurify'

const PostDetails = () => {
    const [postDetail, setPostDetails] = useState([])
    const [loading, setLoading] = useState(true)
    //Hämta URL id 
    const {id} = useParams()
    console.log(id)
    var sanetizedId = DOMPurify.sanitize(id);
    console.log(sanetizedId)

    useEffect(()=>{

    const getDetails= async ()=>{
        // console.log(postid)
        setLoading(true)
        try{
            console.log(`"sanitized" ${sanetizedId}`)
            console.log("Går in och gör en fetch")
          const res1 = await fetch(`https://localhost:7170/api/Post/${sanetizedId}`)
        //   console.log(postid)
          if(!res1.ok){
            throw new Error(res1.status, res1.statusText)
          }
          const data1 = await res1.json()
          setPostDetails(data1)
          setLoading(false)
        }catch(err){
          console.log(err.message)
          setLoading(false)
        }
  
      }
      getDetails();
      
    },[])
    var dt = new Date(postDetail.createdDate)
    var getFullDate =dt.toDateString()
    if(loading){
        return<Loading/>
      }
  return (
<div className="container">
    <div className='mt-3'>
        <Link className='link-back' to={{pathname:`/`}}>Back to bloglist</Link>
    </div>

    <div id="Blogpost">
        
        <div className="container">
            
            <div className="row row-cols-2">
                
                {/* <!--Left side Page--> */}
                <div className="col blog-details-left">
                    {/* //Set allowtaggs for the inner Html */}
                    <h1 className="mt-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetail.title,{ALLOWED_TAGS:["em","strong"]})}}></h1>
                    <p>
                        By: <span className='text-turquoise pe-3 ps-1' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetail.author,{ALLOWED_TAGS:[]})}}></span>
                        Date: 
                        <span className="text-turquoise ps-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getFullDate)}}></span>
                    </p>
                    {/* <img className="img-fluid rounded mt-3" src="https://cdn.pixabay.com/photo/2022/09/29/17/15/halloween-7487706_960_720.jpg"></img> */}
                    <div className="pt-4 border-top" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDetail.content,{ALLOWED_TAGS:["em","strong","p"]})}}></div>
                </div>

                {/* <!--Right side of page--> */}
                <div className="col blog-details-right">
                    {/* <!--Recent posts--> */}
                    <div className="mt-5">
                        <h5 className="text-turquoise pb-3">Recent Post</h5>
                    </div>
                    {/* <!--Recent Instagaram //Not connected!--> */}
                    <div className="mt-5">
                        <h5 className="text-turquoise pb-3">Recent instagram </h5>
                        <div className="row ps-1">
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
    
  )
}

export default PostDetails