import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, Outlet } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import theme from './components/Theme';
import Header from './components/Header';
import ArticleList from './pages/ArticleList';
import Article from './pages/Article';
import User from './pages/User';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Error from './components/Error';
import { useStateValue } from './StateProvider';
import Home from './pages/Home';
import CreateArticle from './pages/CreateArticle';
import UploadMedia from './pages/UploadMedia';
import CreateSummary from './pages/CreateSummary';
import About from './pages/About';
import UserArticleList from './components/UserArticleList';
import UserCommentList from './components/UserCommentList';
import UserSummaryList from './components/UserSummaryList';
import Profile from './components/Profile';
import PromptComponent from './components/PromptComponent';
import SideBar from './components/SideBar';

const StyledOulet = styled.div`
  height: calc(100vh - 64px);
  overflow: scroll;
  overflow-x: hidden;
  flex: 8;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

function App() {
  const [
    Loading,
    setLoading,
    error,
    setError,
    show,
    setShow,
    user,
    setUser,
    address,
    setAddress,
    contract,
    setContract,
  ] = useStateValue();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/intro" element={<PromptComponent />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/"
          element={
            <div>
              <Error message={error} setError={setError} />
              <Header />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <SideBar />
                <StyledOulet>
                  <Outlet />
                </StyledOulet>
              </div>
            </div>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="list/:page" element={<ArticleList />}></Route>
          <Route path="list" element={<ArticleList />}></Route>
          <Route path="create-article" element={<CreateArticle />}></Route>
          <Route path="article/:id" element={<Article />}></Route>
          <Route
            path="upload-media/0/:id"
            element={<UploadMedia action={0} />}
          ></Route>
          <Route path="create-summary/:id" element={<CreateSummary />}></Route>
          <Route
            path="upload-media/1/:id"
            element={<UploadMedia action={1} />}
          ></Route>
          <Route path="user/:address" element={<User />}>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route
              path="articles"
              element={<UserArticleList></UserArticleList>}
            ></Route>
            <Route
              path="comments"
              element={<UserCommentList></UserCommentList>}
            ></Route>
            <Route
              path="summaries"
              element={<UserSummaryList></UserSummaryList>}
            ></Route>
          </Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
