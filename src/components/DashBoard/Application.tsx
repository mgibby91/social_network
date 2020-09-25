import React, {useState, useEffect} from "react";
// import useApplicationData from "../../hooks/useApplicationData";
import PostList from './PostList'
import { InputGroup } from "@paljs/ui/Input";
import styled from "styled-components";
import axios from 'axios'

function Application(props) {
  const [postList, setPostList] = useState({});
  useEffect(() => {

    const promise = axios.get('http://localhost:8001/api/posts')
      .then((data) => {
        const currentPosts = data.data;
				console.log("current data in dashboard: ", currentPosts);
				
				setPostList(currentPosts)
				


			})
			return promise;

	}, []);	
	console.log("postlist in dashboard component: ", postList);

	const Input = styled(InputGroup)`
	margin-bottom: 10px;
	`;

  return (
    <div className="App">	
			<Input fullWidth shape="Round">
            <textarea rows={5} placeholder="Comments..." />
      </Input>
			<PostList 
				posts={postList}
			/>
    </div>
  );
}

export default Application;
