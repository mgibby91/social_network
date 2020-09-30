import * as React from 'react';
import CommentsBlock from 'simple-react-comments';
import useApplicationData from "../../hooks/useApplicationData";

export default function Comments () {
  const { state } = useApplicationData();

  const comments = state.comments;
 
    return (
      <div>
        <CommentsBlock
          comments={comments}
          signinUrl={'/signin'}
          isLoggedIn
          reactRouter // set to true if you are using react-router
          onSubmit={text => {
            if (text.length > 0) {
              this.setState({
                comments: [
                  ...comments,
                  {
                    authorUrl: '#',
                    avatarUrl: '#avatarUrl',
                    createdAt: new Date(),
                    fullName: 'Name',
                    text,
                  },
                ],
              });
              console.log('submit:', text);
            }
          }}
        />
      </div>
    );
  }