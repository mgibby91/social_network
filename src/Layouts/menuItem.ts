import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { to: '/dashboard' },
  },
  {
    title: 'Profile',
    link: { to: '/user-profile' },
  },
  {
    title: 'Mentors',
    link: { to: '/mentor-list' },
  },
  {
    title: 'Students',
    link: { to: '/student-list' },
  },
  {
    title: 'User Rating',
    link: { to: '/user-rating' },
  },
  {
    title: 'Forms',
    link: { to: '/forms' },
  },
  // {
  //   title: 'Extra Components',
  //   icon: { name: 'star-outline' },
  //   children: [
  //     {
  //       title: 'Accordion',
  //       link: { to: '/extra-components/accordion' },
  //     },
  //     {
  //       title: 'Actions',
  //       link: { to: '/extra-components/actions' },
  //     },
  //     {
  //       title: 'Alert',
  //       link: { to: '/extra-components/alert' },
  //     },
  //     {
  //       title: 'List',
  //       link: { to: '/extra-components/list' },
  //     },
  //     {
  //       title: 'Spinner',
  //       link: { to: '/extra-components/spinner' },
  //     },
  //     {
  //       title: 'Tabs',
  //       link: { to: '/extra-components/tabs' },
  //     },
  //     {
  //       title: 'Chat',
  //       link: { to: '/extra-components/chat' },
  //     },
  //     {
  //       title: 'Cards',
  //       link: { to: '/extra-components/cards' },
  //     },
  //     {
  //       title: 'Flip Card',
  //       link: { to: '/extra-components/flip-card' },
  //     },
  //     {
  //       title: 'Reveal Card',
  //       link: { to: '/extra-components/reveal-card' },
  //     },
  //   ],
  // },

];

export default items;
