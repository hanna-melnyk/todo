// client/src/utils/sidebarData.jsx
import { FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus  } from 'react-icons/fi';

export const sidebarData = [
    {
        link: '/',
        text: 'Home',
        icon: FiHome, // Use component reference
        showWhenLoggedOut: false,
        group: 'body',
        position: 1,
    },
    {
        link: '/profile',
        text: 'Profile',
        icon: FiUser,
        showWhenLoggedOut: false,
        group: 'body',
        position: 2,
    },
    {
        link: null,
        text: 'Logout',
        icon: FiLogOut,
        showWhenLoggedOut: false,
        group: 'body',
        position: 3,
    },
    {
        link: '/login',
        text: 'Login',
        icon: FiLogIn,
        showWhenLoggedOut: true,
        group: 'body',
        position: 4,
    },
    {
        link: '/register',
        text: 'Register',
        icon: FiUserPlus,
        showWhenLoggedOut: true,
        group: 'body',
        position: 5,
    }
];
