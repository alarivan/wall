import React from 'react';
import { Router, Link } from '@reach/router';
import Index from './routes/index';
import Editor from './routes/editor';
import NotFound from './routes/404';
import { GalleryProvider } from './GalleryContext';

const App: React.FC = () => {
  return (
    <GalleryProvider>
      <Link to='/'>Home</Link>
      <Link to='/editor/new'>New</Link>

      <Router>
        <Index path='/' />
        <Editor path='/editor/:id' />
        <Editor path='/editor/new' />
        <NotFound default />
      </Router>
    </GalleryProvider>
  );
};

export default App;
