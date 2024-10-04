// client/src/utils/sidebarData.jsx
import { FiHome, FiUser, FiLogOut, FiLogIn, FiUserPlus  } from 'react-icons/fi';
import {ToggleColorModeButton} from "../elements/ToggleColorModeButton.jsx";
import {ToggleMenuButton} from "../elements/ToggleMenuButton.jsx";
import {UserAvatar} from "../elements/UserAvatar.jsx";

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
    },
    {
        component: UserAvatar, // Pass component reference instead of JSX
        showWhenLoggedOut: false,
        group: 'footer',
        position: 1,
    },
    {
        component: ToggleColorModeButton, // Pass component reference
        showWhenLoggedOut: true,
        group: 'footer',
        position: 2,
    },
    {
        component: ToggleMenuButton, // Pass component reference
        showWhenLoggedOut: true,
        group: 'header',
        position: 1,
    },
];
