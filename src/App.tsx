import React from 'react';
import { Router } from '@reach/router';
import Index from './routes/index';
import Editor from './routes/editor';
import NotFound from './routes/404';
import { GalleryProvider } from './GalleryContext';
import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './themes/default';
import GlobalStyles from './globalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <GalleryProvider>
          <Router>
            <Index path='/' />
            <Editor path='/editor/:id' />
            <Editor path='/editor/new' />
            <NotFound default />
          </Router>
        </GalleryProvider>
      </>
    </ThemeProvider>
  );
};

export default App;
