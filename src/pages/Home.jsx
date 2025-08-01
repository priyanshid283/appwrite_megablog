
import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/configure";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';
function Home() {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  const userData = useSelector((state)=>state.auth.userData)
    if (!userData) {
        return (
            <div className="w-full py-4 mt-2 text-center">
                <Container>
 
<div className="w-full py-5 min-h-[50vh] flex flex-col items-center justify-center text-center rounded-xl shadow-md bg-gray-50">
  <div className="flex flex-col items-center justify-center text-center">
    <img
      src="https://www.shutterstock.com/shutterstock/photos/2204429633/display_1500/stock-photo-businesswoman-using-computer-network-security-system-personal-data-information-information-and-2204429633.jpg"
      alt="Login illustration"
      className="w-80 h-auto mb-8 drop-shadow-lg rounded-lg"
    />
    <h1 className="text-4xl font-bold text-gray-800 mb-4">
      Welcome to MegaBlog 
    </h1>
    <p className="text-gray-600 text-lg">
      Please <span className="font-semibold text-blue-600">login</span> to read posts
    </p>
  </div>
</div>
                   
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard 
                            id = {post.$id}
                            title={post.title}
                            featuredImage={post.featuredImage}
                            slug={post.$id}
                            {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home