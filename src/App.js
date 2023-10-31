import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NavBar from './navbar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <h1>My Awesome Blog</h1>
      <div id="page-body">
        <Routes>
          <Route path='/' element = {<HomePage />} />
          <Route path='/about' element = {<AboutPage />} />
          <Route path='/articles/:articleId' element = {<ArticlePage />} />
          <Route path='/articles' element = {<ArticlesListPage />} />
          <Route path='/*' element = {<NotFoundPage />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
