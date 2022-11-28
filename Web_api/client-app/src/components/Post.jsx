import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const Post = ({ post }) => {
    var dt = new Date(post.createdDate)
    var id = post.id

  return (
    <div className="col">
              <img src=""></img>
              <div className="blog-details">
                  <div className="d-flex flex-column blog-created justify-content-center align-items-center">
                        <h2>{dt.getDate()}</h2> 
                       <p>{dt.toDateString()}</p>
                  </div>
                  <div className="blog-content text-white">
                    {/* can choose what taggs that are allowed. Here I dont want allow any taggs */}
                      <span>By <a className="text-white" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.author, {ALLOWED_TAGS:[""]})}}></a></span>
                      <p className="text-turquoise" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.title,{ALLOWED_TAGS:[""]})}}></p>
                      <div className="d-flex">
                      </div>
                      <div className="mt-4 mb-4">
                      <Link className='white-button' to={{pathname:`/PostDetails/${id}`}}> Read Blogpost</Link>
                      </div>
          
                  </div>
              </div>
            </div>
  )
}

export default Post