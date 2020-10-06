import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Checkbox } from "@paljs/ui/Checkbox";
import Tags from "./StackTag";
import ContextConsumer from "../../context/context";
import Col from "@paljs/ui/Col";
import "./Editor.scss";

function Editor(props) {
  const [value, setValue] = React.useState();
  const [checkbox, setCheckbox] = React.useState({
    1: false,
  });

  const onChangeCheckbox = (value: boolean, name: number) => {
    setCheckbox({ ...checkbox, [name]: value });
  };

  const { avatarUrl, userID, username } = localStorage;

  return (
    <>
      <ContextConsumer>
        {({ data }) => {
          if (!data.state) return null;
          const currentUser = props.users.find(
            (user) => user.id === data.selected
          );

          let techTags = [];
          const onChangeInput = (selectedTags) => {
            // console.log("HELLOOOOO");
            techTags = selectedTags;
          };

          const postObj = {
            text: value,
            mentor: checkbox[1],
            avatar: avatarUrl,
            username: username,
            stack: techTags,
          };
          const onSave = () => {
            //check for empty input here
            console.log("from editor", techTags);
            props.createPost(postObj, techTags, currentUser.id).then(() => {
              setValue("");
            });
          };

          return (
            <>
            <div className="flex">
              <MDEditor className="editor" value={value} onChange={setValue} />  
              <div className="flex-row">
                <div className="checkbox">
                  <Checkbox
                    checked={checkbox[1]}
                    status="Success"
                    onChange={(value) => onChangeCheckbox(value, 1)}
                  >
                    Mentor Help Needed
                  </Checkbox>
                </div>
                <div className="tags">
                  <Tags suggested={props.suggestion} onChange={onChangeInput} />
                </div>
              </div>
              <Col key={1} offset={{ xs: 11 - 1 }} breakPoint={{ xs: 1 + 1 }}>
                <div
                  className="post-btn post-button-transition"
                  onClick={() => onSave()}
                >
                  Post
                </div>
              </Col>
            </div>
            </>
          );
        }}
      </ContextConsumer>
    </>
  );
}

export default Editor;
