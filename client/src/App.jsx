// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './elements/Navigation';
import {AuthProvider} from "./context/AuthContext.jsx";
import AppRoutes from './AppRoutes';

function App() {

    /* Use logout function from context */
    return (
        <AuthProvider>
            <Router>
                <Navigation/>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
