import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';
import theme from './theme.js'; // for custom theme in chakraui
import { LoginProvider } from './contexts/LoginContext';



createRoot(document.getElementById('root')).render(
    <>
    {/* <StrictMode> */}
        {/* Initialize color mode script */}

        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <LoginProvider>
                <App />
            </LoginProvider>
        </ChakraProvider>
    {/* </StrictMode> */}
    </>
)


