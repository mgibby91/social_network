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
import { ContextProviderComponent } from "../context/context";
import "./layout.scss"
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
  console.log('localStorage', localStorage);
  const { avatarUrl, userID, username } = localStorage;
  console.log('avatarUrl', avatarUrl);
  console.log('avatarUrl', userID);
  console.log('avatarUrl', username);

  if (avatarUrl && userID) {

    const rightNavContainer = document.querySelector(".sc-kEqYlL.gyZWym.right");

    const userDisplay = document.querySelector('.logged-in-username');

    if (userDisplay) {
      userDisplay.remove();
    }

    console.log(rightNavContainer);

    const usernameHTML = `
    <div class='logged-in-username' style='display: flex; align-items: center; justify-content: center'>
    <p style='margin-right: 0.5rem;'>Welcome <strong>${username}!</strong></p>
    <img src='${avatarUrl}' />
    </div>
      `;

    if (rightNavContainer) {
      rightNavContainer.insertAdjacentHTML("afterbegin", usernameHTML);
    }
  } else {
    const userDisplay = document.querySelector('.logged-in-username');

    if (userDisplay) {
      userDisplay.remove();
    }
  }

  // MATT'S STUFF FOR SETTING LOGIN NAME *************************************************

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