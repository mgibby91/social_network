import React, { useEffect, useState} from "react";
import PostListItem from "./PostListItem";
import axios from 'axios'

export default function PostList(props) {
	
	
  const [postList, setPostList] = useState([]);
  useEffect(() => {

    axios.get('http://localhost:8001/api/posts')
      .then((data) => {				
        const currentPosts = data.data;
				setPostList(currentPosts)
			})
	}, []);		
	
	const postData = postList.map((post, index) => {
		console.log("post in map: ", post);
	
		return <PostListItem
			key={index}
			post={post}
		/>
	})

	return ( 
		<div>
			<section>
				<h1>Feed</h1>
				<ul>{postData}</ul>
			</section>
		</div>
	);
}