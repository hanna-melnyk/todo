// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './elements/Navigation';
import AppRoutes from './AppRoutes';
import './background.css';



function App() {
    /* Use logout function from context */
    return (


            <Router>
                <Navigation/>
                {/* Main content with left margin to make space for the sidebar */}
                <div style={{ marginLeft: '60px', padding: '20px' }}>
                    <AppRoutes />
                </div>
            </Router>
    );
}

export default App;
