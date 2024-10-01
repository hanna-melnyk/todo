// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './elements/Navigation';
import AppRoutes from './AppRoutes';
import './background.css';


function App() {

    /* Use logout function from context */
    return (

        <div className="dotted-background">
            <Router>
                <Navigation/>
                <AppRoutes />
            </Router>
        </div>
    );
}

export default App;
