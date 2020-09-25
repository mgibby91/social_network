// import "components/studentList.scss"
import React from "react";
import PostListItem from "./PostListItem";


interface IProps {
	students: Istudents
}

interface Istudents {
	[index: number]: {username: string; studentrating: string}
}

export default function PostList(props) {
		
	const { posts } = props;
	console.log("posts in list: ", Object.keys(posts));
	
	// const postData = posts.map((post, index) => {

	// 	return <PostListItem
	// 	key={index}
	// 	posts={post}
	// 	// selected={student.id === props.value}
	// 	// setstudent={props.setstudent}
	// 	/>
	// })
		return ( 
			<section>
				<h1>Students</h1>
				{/* <ul>{postData}</ul> */}
			</section>
		);
}