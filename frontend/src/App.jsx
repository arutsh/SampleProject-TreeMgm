import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import './interceptors/axios'

// Import pages

import TreeTypes from './modules/TreeType/pages/TreeTypes';
import Tree from './modules/Tree/pages/Tree';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Tree />} />
        <Route exact path="/trees/types" element={<TreeTypes />} />
        <Route exact path="/trees" element={<Tree />} />

      </Routes>
    </>
  );
}

export default App;
