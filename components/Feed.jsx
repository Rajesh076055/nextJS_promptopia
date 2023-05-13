'use client';
import {useState,useEffect} from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
       
        <PromptCard
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />

     
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [posts,setPosts] = useState([]);
  const [postsBackup,setPostBackUp] = useState([]);

  

  useEffect(()=>{
    
    async function fetchPost(){
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setPostBackUp(data);
    }
    fetchPost();
  },[]);
  
  const handleSearchChange = (e) => {

    //defined a variable text to add the proper value

    const text = typeof(e) === 'object'?e.target.value:e;
    setSearchText(text);

    const regex = new RegExp(text,'i');
    const filteredPosts = postsBackup.filter(post => {
      return post.tag.match(regex) !== null 
      || post.creator.username.match(regex) !== null  
      //|| post.prompt.match(regex) !== null;
    });

    setPosts(filteredPosts);

  }
  return (
   <section className='feed'>
    <form className='relative w-full flex-center'>
      <input
        type = "text"
        placeholder = "Search for a tag or a username"
        onChange = {handleSearchChange}
        value = {searchText}
        required
        className='search_input peer'
      />
    </form>

    <PromptCardList 
      data = {posts}
      handleTagClick = {handleSearchChange}
    />
   </section>
  )
}

export default Feed
