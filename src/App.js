import './assets/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Layout from './Layout';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Updates from './pages/Updates';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import JobBoard from './pages/JobBoard';
import Resources from './pages/Resources';
import EventsAndNews from './pages/EventsAndNews';
import Event from './pages/Event';
import CommunityForums from './pages/CommunityForums';
import CommunityForumsAllForums from './pages/CommunityForumsAllForums';
import Forum from './pages/Forum';
import User from './pages/User';
import { ThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { AppContext } from './context/Context';
import { darkTheme, lightTheme } from './utils/themes/themes';
import { GlobalStyles } from './utils/themes/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SeeMore from './pages/SeeMore';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { theme } = useContext(AppContext);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const PrivateRoute = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to='/landing' />;
  };

  const AuthRoute = () => {
    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <PrivateRoute />,

          children: [
            {
              path: '',
              element: <Home />,
            },
            {
              path: ':user',
              element: <User />,
            },
            {
              path: 'updates',
              element: <Updates />,
            },
            {
              path: 'users/:id',
              element: <Dashboard />,
            },
            {
              path: 'users/:id/:more',
              element: <SeeMore />,
            },
            {
              path: 'settings',
              element: <Settings />,
            },
            {
              path: 'forums',
              element: <CommunityForums />,
            },
            {
              path: 'forums/all',
              element: <CommunityForumsAllForums />,
            },
            {
              path: '/forums/:forumId',
              element: <Forum />,
            },
            {
              path: 'events-and-news',
              element: <EventsAndNews />,
            },
            {
              path: 'events-and-news/event/:id',
              element: <Event />,
            },
            {
              path: 'events-and-news/news/:id',
              element: <Event />,
            },
            {
              path: 'job-board',
              element: <JobBoard />,
            },
            {
              path: 'resources',
              element: <Resources />,
            },
          ],
        },

        {
          path: '',
          element: <AuthRoute />,
          children: [
            {
              path: 'landing',
              element: <LandingPage />,
            },
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <SignUp />,
            },
            {
              path: 'forgot-password',
              element: <ForgotPassword />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={themeMode}>
      <ToastContainer
        className={'custom-toastify'}
        position='top-center'
        autoClose={2000}
      />
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
