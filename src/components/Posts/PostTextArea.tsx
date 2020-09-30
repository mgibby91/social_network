import React, { useEffect, useState} from "react";
import { InputGroup } from "@paljs/ui/Input";
import styled from "styled-components";
import { Button } from "@paljs/ui/Button";
import MessageButton from '../messages/MessageButton';

const Input = styled(InputGroup)`
margin-bottom: 10px;
`;

interface IProps {
	value: object,
	submitPost: (username: string) => void,
	username: "string",
	onChange: void;
}

export default function MessageTextArea(props: IProps) {

	const [newPost, setNewPost] = useState("")

  return (
    <div className='message-text-area-container'>
      <div className='error-container'>Please enter valid post!</div>
			<div className="post-text-area">
				<Input 
					fullWidth shape="Round">
					<textarea 
						id="post-text-area"
						name="post-text-area"
						rows={5} 
						cols={75} 
						value={newPost || ""}
						onChange={(event) => {
							setNewPost(event.target.value)}}
						placeholder="Post an offer to help or request help here..." />
				</Input>
			</div>
      <div className="message-send-btn" onClick={() => props.submitPost(props.username)}>
        <MessageButton
          name={'SEND'}
          send={true}
        />
      </div>
    </div>
  )

}



