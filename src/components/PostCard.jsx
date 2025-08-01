import React from "react"
import appwriteService from "../appwrite/configure"
import {Link} from 'react-router-dom'

function PostCard ({$id ,title,featuredImage,slug}){

    return(
        
                 <Link to={`/post/${$id}`}>
               
                <div className="w-full bg-white-100 rounded-xl  shadow-md overflow-hidden p-4">
                <div className="w-full justify-center mb-4">
                   
                    <img src={appwriteService.getFileView (featuredImage)} alt ={title}
                    className= 'rounded-xl w-full h-48 object-cover' />
                    
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                </div>
             </Link>
             
    )
}
 export default PostCard