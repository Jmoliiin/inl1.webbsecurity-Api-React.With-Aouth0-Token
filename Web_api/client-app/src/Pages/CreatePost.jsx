import React, { useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
//Ska spara in quill i ett state
//useRef gör att komonenten inte uppdateras varje knapptryck?
import { useState, useRef} from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import DOMPurify from 'dompurify'
import { json } from 'react-router-dom'

const CreatePost = () => {
    const [error, setError] = useState(false)
    const [quill,setQuill] = useState()
    const titleRef = useRef()
    const arthureRef = useRef()
    // const qWrapper = useRef()
    const navigate = useNavigate()

    const handleSubmit = async e=>{
        e.preventDefault()
        // console.log(titleRef.current.value)

        const post = {
            //Lägg in json namnen från apit här 
            arthure:DOMPurify.sanitize(arthureRef.current.value,{ALLOWED_TAGS:[]}),
            title:DOMPurify.sanitize(titleRef.current.value,{ALLOWED_TAGS:[]}),
            content:DOMPurify.sanitize(quill.root.innerHTML,{ALLOWED_TAGS:["em","strong","p"]}) 
        }
        console.log(post.content);

        try{
            const token = localStorage.getItem('accesToken')
            const res = await fetch('https://localhost:7170/api/Post',{
                method:'POST',
                body: JSON.stringify(post),
                headers:{
                    'content-type': 'application/json',
                    //skickar med en token till api
                    'authorization':`Bearer ${token}`
                }
            })
            if(!res.ok){
                throw new Error(res.status, res.statusText)
            }
            //om ok, töm fälten
            // titleRef.current.value = ""
            // body: quill.root.innerHTML=""
            //Istället för att tömma navigera användaren vid ok till annan sida
            setError(false)
            //redirekt efter att den sparats
            navigate('/')
        }catch(err){
            setError(true)
            console.log(err.message)
        }
        console.log(post)
    }
    // ny instans av quill, bara en gång []
    // 
    
    const qWrapper = useCallback(wrapper=>{
        if(wrapper ==null) return

        const TOOLBAR_OPTIONS =[
            ['bold', 'italic'], 
            // ['image'],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'color': [] }],
            // [{ 'font': [] }],
            // [{ 'align': [] }],
            ['clean']  
        ]
        //töm
        wrapper.innerHTML =''
        //skap nytt element
        const editor = document.createElement('div')
        //lägg in editor
        wrapper.append(editor)
        //skapa qill
        const q = new Quill(editor,{
            modules:{
                toolbar:TOOLBAR_OPTIONS
            },
        theme:'snow'
        });
        setQuill(q)

    },[])


  return (
   <div className="container">
     <div className='mt-5 mb-5'>
        <div className='mb-4 border-bottom'>
        <h3>Create a new blogpost</h3>
        </div>
     
      {
      error &&
        <div className="alert alert-danger" role="alert">
            kunde inte skapa post
        </div>
        }
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor='title' className='form-label'></label>
            <input type="text" id='title' ref={titleRef} placeholder="Enter title..." className='form-control'/>
        </div>
        <div className='mb-3'>
            <label htmlFor='arthure' className='form-label'></label>
            <input type="text" id='arthure' ref={arthureRef} placeholder="Enter your name.." className='form-control'/>
        </div>
        <div id='q-wrapper' ref={qWrapper} className='mb-3'>

        </div>
        <button className='blue-button'>Create</button>
      </form>
    </div>
   </div>
  )
}

export default CreatePost