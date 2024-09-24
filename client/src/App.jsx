// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './elements/Navigation';
import AppRoutes from './AppRoutes';


function App() {

    /* Use logout function from context */
    return (


            <Router>
                <Navigation/>
                <AppRoutes />
            </Router>
    );
}

export default App;
