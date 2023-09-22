import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './Features/authSlice';
import eventReducer from './Features/eventSlice';
// import signupReducer from './Features/signup/signup_slice';
// import signinReducer from './Features/signin/signin_slice';
import authReducer from './Features/auth/auth_slice';
import connectionsReducer from './Features/connections/connections_slice';
import jobsReducer from './Features/jobs/jobs_slice';
import jobsApplicationReducer from './Features/jobs-application/jobs_application_slice';
import postsReducer from './Features/posts/posts_slice';
import reportsReducer from './Features/reports/reports_slice';
import socialLinksReducer from './Features/social-links/social_links_slice';
import usersReducer from './Features/users/users_slice';

export default configureStore({
  reducer: {
    // auth: authReducer,
    event: eventReducer,
    // signup: signupReducer,
    // signin: signinReducer,
    auth: authReducer,
    connections: connectionsReducer,
    jobs: jobsReducer,
    jobsApplication: jobsApplicationReducer,
    posts: postsReducer,
    reports: reportsReducer,
    socialLinks: socialLinksReducer,
    users: usersReducer,
  },
});
