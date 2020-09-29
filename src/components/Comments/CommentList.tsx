import React, { useEffect, useState} from "react";
import CommentListItem from "./CommentListItem";
import axios from 'axios'

export default function CommentList(props) {
	
	
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {

    axios.get('http://localhost:8001/api/comments')
      .then((data) => {				
        const currentComments = data.data;
				setCommentList(currentComments)
			})
	}, []);		
	console.log("comment list in comment list: ", commentList);
	
	const commentsData = commentList.map((comment, index) => {
	
		return <CommentListItem
			key={index}
			comment={comment}
		/>
	})

	return ( 
		<div>
			<section>
				<h1>Feed</h1>
				<ul>{commentsData}</ul>
			</section>
		</div>
	);
}