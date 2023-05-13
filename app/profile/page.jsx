'use client';


import React, {useState, useEffect} from 'react'
import {useSession} from 'next-auth/react';
import {useRouter,useSearchParams} from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

    const {data: session} = useSession();
    const [posts,setPosts] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(()=>{
    
      
        async function fetchPost(){
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json();
    

          setPosts(data);
        }
        fetchPost();
        
    },[id]);

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) 
        {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter((p)=>p._id!=post._id);
                
                setPosts(filteredPosts);
            } catch (err) {
                
            }
        }
    }

    const handleEdit = (post) => {
     
        router.push(`/update-prompt?id=${post._id}`);

    }

  if (id === session?.user.id)
  {
    return (
        <Profile    
            name = "My"
            desc = "Welcome to your personalized profile page"
            data = {posts}
            handleEdit = {handleEdit}
            handleDelete = {handleDelete}
        />
      )
  }  

  else
  {
    return (
        <Profile    
        name = "Their"
        desc = "You are currently viewing other user's profile"
        data = {posts}

    />
    )
  }
 
}

export default MyProfile
