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
import setUnseenTutor from '../helpers/setUnseenTutor';
import { ContextProviderComponent } from "../context/context";
import "./layout.scss"

import ProgressBar from "../components/ProgressBar/ProgressBar";
import ContextConsumer from "../context/context";


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
  let avatarUrl, userID, username;
  if (typeof localStorage !== 'undefined') {
    avatarUrl = typeof localStorage !== 'undefined' && localStorage.avatarUrl
    userID = typeof localStorage !== 'undefined' && localStorage.userID
    username = typeof localStorage !== 'undefined' && localStorage.usreUrl
  }
  // const { avatarUrl, userID, username } = localStorage;

  if (avatarUrl && userID) {

    // MATHIUS' FIND USER
    const currentUser = state.users.find(
      (user) => user.id == userID
    );

    // if (!currentUser) return null;
    console.log("current user in index layout: ", currentUser, userID);


    const rightNavContainer = typeof document !== 'undefined' && document.querySelector(".sc-kEqYlL.efNBuU.right");

    const userDisplay = typeof document !== 'undefined' && document.querySelector('.logged-in-username');

    // MATHIUS' XP BARS
    const leftNavContainer = typeof document !== 'undefined' && document.querySelector('.Header__HeaderStyle-hhdliK bxFSuo')
    const xpBars =
      <ContextConsumer>
        {({ data }) => {
          if (!data.state) return null;
          const currentUser = state.users.find(
            (user) => user.id === data.selected
          );
          return (
            `<div>
              <div>         
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
              </div>       
            </div>`
          )
        }}
      </ContextConsumer>

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
    }

    if (leftNavContainer) {
      rightNavContainer.insertAdjacentHTML("afterend", xpBars);
    }
  } else {
    const userDisplay = typeof document !== 'undefined' && document.querySelector('.logged-in-username');

    if (userDisplay) {
      userDisplay.remove();
    }
  }
  // MATT'S STUFF FOR SETTING LOGIN NAME *************************************************

  // MATT'S STUFF FOR MESSAGES + TUTOR NOTIFICATIONS *************************************************
  let unreadMessages, unreadTutor;
  if (typeof localStorage !== 'undefined') {
    unreadMessages = typeof localStorage !== 'undefined' && localStorage.unreadMessages;
    unreadTutor = typeof localStorage !== 'undefined' && localStorage.unreadTutor;
  }
  // const { unreadMessages, unreadTutor } = localStorage;

  setNotifications(unreadMessages);
  setUnseenTutor(unreadTutor);

  // MATT'S STUFF FOR MESSAGES + TUTOR NOTIFICATIONS *************************************************

  // LOGOUT FUNCTIONALITY ************************

  const logoutBtnTitle = typeof document !== 'undefined' && document.querySelector('.logout-btn-enabled');
  let logoutBtn;

  if (logoutBtnTitle) {
    logoutBtn = logoutBtnTitle.parentElement.parentElement

    logoutBtn.addEventListener('click', () => {

      const currentUserID = typeof document !== 'undefined' && document.cookie.split('=')[1];
      document.cookie = `userID=${currentUserID}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

      // MATT'S CODE************************************************************
      const userDisplay = typeof document !== 'undefined' && document.querySelector('.logged-in-username');

      if (userDisplay) {
        userDisplay.remove();
      }

      typeof localStorage !== 'undefined' && localStorage.removeItem('userID');
      typeof localStorage !== 'undefined' && localStorage.removeItem('username');
      typeof localStorage !== 'undefined' && localStorage.removeItem('avatarUrl');
      typeof localStorage !== 'undefined' && localStorage.removeItem('unreadMessages');
      typeof localStorage !== 'undefined' && localStorage.removeItem('unreadTutor');
      typeof localStorage !== 'undefined' && localStorage.removeItem('Login');

      logoutBtnTitle.textContent = 'Login';

      // MATT'S CODE************************************************************
    })
  }

  setTimeout(() => {
    const loginFormHeader = typeof document !== 'undefined' && document.querySelector('.login-form-header');
    if (typeof localStorage !== 'undefined' && localStorage.getItem('Login') && !loginFormHeader) {
      const allMenuTitles = typeof document !== 'undefined' && document.querySelectorAll('.menu-title');
      if (allMenuTitles) {

        for (let title of allMenuTitles) {
          if (title.textContent === 'Login') {
            title.textContent = 'Logout';
            title.classList.add('logout-btn-enabled');
          }
        }
      }
    }
  }, 1000);


  // LOGOUT FUNCTIONALITY ************************

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