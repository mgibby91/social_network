import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, Tab } from "@paljs/ui/Tabs";

function Editor() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <Tabs activeIndex={0} fullWidth>
      <Tab title="Editor" icon="icon ion-ios-home" responsive>
        <MDEditor value={value} onChange={setValue} />
      </Tab>
      <Tab title="Preview" icon="icon ion-ios-star-outline" responsive>
        <MDEditor.Markdown source={value} />
      </Tab>
    </Tabs>
  );
}

export default Editor;
