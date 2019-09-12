import React from 'react';
import { Router, Link } from '@reach/router';
import Index from './routes/index';
import Editor from './routes/editor';
import NotFound from './routes/404';

const App: React.FC = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/editor'>Editor</Link>

      <Router>
        <Index path='/' />
        <Editor path='/editor' />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
