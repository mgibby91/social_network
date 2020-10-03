import React, { useState, useRef } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import themes from "./themes";
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
} from "@paljs/ui/Layout";
import icons from "@paljs/icons";
import { SidebarRefObject } from "@paljs/ui/Sidebar";
import Header from "./Header";
import SimpleLayout from "./SimpleLayout";
import SidebarCustom from "./Sidebar";
import useApplicationData from "../hooks/useApplicationData";
import globalAppData from '../hooks/globalAppData';
import setNotifications from '../helpers/setNotifications';
import { ContextProviderComponent } from "../context/context";
import "./layout.scss"
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import ProgressBar from "../Components/ProgressBar/ProgressBar";

const LayoutPage: React.FC<{ pageContext: { layout: string } }> = ({
  children,
  pageContext,
}) => {
  const { state } = useApplicationData();

  const [theme, setTheme] = useState<DefaultTheme["name"]>("dark");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const sidebarRef = useRef<SidebarRefObject>(null);

  const changeTheme = (newTheme: DefaultTheme["name"]) => {
    setTheme(newTheme);
  };

  const changeDir = () => {
    const newDir = dir === "ltr" ? "rtl" : "ltr";
    setDir(newDir);
  };
  const props = {}

  // MATT'S STUFF FOR SETTING LOGIN NAME *************************************************
  const { avatarUrl, userID, username } = localStorage;

  if (avatarUrl && userID) {

    // MATHIUS' FIND USER
    const currentUser = state.users.find(
      (user) => user.id == userID
    );

    if (!currentUser) return null;
    console.log("current user in index layout: ", currentUser, userID);
    
    
    const rightNavContainer = document.querySelector(".sc-kEqYlL.gyZWym.right");

    const userDisplay = document.querySelector('.logged-in-username');
    
    // MATHIUS' XP BARS
    const xpBars =
    `<Col breakPoint={{ xs: 6, sm: 6, md: 8, lg: 6 }}>
      <Row>         
          ${currentUser.mentorrating ? 
            <h4>Mentor Level</h4>
          : ""}
          ${currentUser.mentorrating ? 
            <ProgressBar 
              experience={Number(currentUser.mentorrating)}
            />
          : ""}
          ${currentUser.studentrating ? 
            <h4>Student Level</h4>
          : ""}
          ${currentUser.studentrating ? 
            <ProgressBar
              experience={Number(currentUser.studentrating)}
            />
          : ""}
      </Row>       
    </Col>`
    
    if (userDisplay) {
      userDisplay.remove();
    }

    const usernameHTML = `
    <div class='logged-in-username' style='display: flex; align-items: center; justify-content: center'>
    <p style='margin-right: 0.5rem;'>Welcome <strong>${username}!</strong></p>
    <img src='${avatarUrl}' />
    </div>
      `;

    if (rightNavContainer) {
      rightNavContainer.insertAdjacentHTML("afterbegin", usernameHTML)
      rightNavContainer.insertAdjacentHTML("afterbegin", xpBars)
    }
    // if (rightNavContainer) {
    //   rightNavContainer.insertAdjacentHTML("afterbegin", xpBars);
    // }
  } else {
    const userDisplay = document.querySelector('.logged-in-username');

    if (userDisplay) {
      userDisplay.remove();
    }
  }
  // MATT'S STUFF FOR SETTING LOGIN NAME *************************************************

  // MATT'S STUFF FOR MESSAGES NOTIFICATIONS *************************************************
  const { unreadMessages } = localStorage;

  setNotifications(unreadMessages);


  // MATT'S STUFF FOR MESSAGES NOTIFICATIONS *************************************************

  return (
    <ContextProviderComponent>
      <ThemeProvider theme={themes(theme, dir)}>
        <>
          <SimpleLayout />
          <Layout
            evaIcons={icons}
            dir={dir}
            className={pageContext.layout === "auth" ? "auth-layout" : ""}
          >
            {pageContext.layout !== "auth" && (
              <Header
                dir={dir}
                changeDir={changeDir}
                changeTheme={changeTheme}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
              {pageContext.layout !== "auth" && (
                <SidebarCustom ref={sidebarRef} />
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">
                    {children}
                  </LayoutColumn>
                </LayoutColumns>
                {/* {pageContext.layout !== 'auth' && <LayoutFooter>Footer</LayoutFooter>} */}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </>
      </ThemeProvider>
    </ContextProviderComponent>
  );
};

export default LayoutPage;