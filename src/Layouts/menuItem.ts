import { MenuItemType } from "@paljs/ui/types";

const items: MenuItemType[] = [
  {
    title: "Home Page",
    icon: { name: "home" },
    link: { to: "/dashboard" },
  },
  {
    title: "Profile",
    icon: { name: "person" },
    link: { to: "/user-profiles" },
  },
  {
    title: "Messages",
    icon: { name: "message-square-outline" },
    link: { to: "/messages" },
  },
  {
    title: "Users",
    icon: { name: "people-outline" },
    link: { to: "/user-list" },
  },
  {
    title: 'Tutor Sessions',
    icon: { name: "browser-outline" },
    link: { to: '/tutor-sessions' },
  },
  // {
  //   title: "Register",
  //   icon: { name: "lock-outline" },
  //   link: { to: "/register" },
  // },
];

export default items;
