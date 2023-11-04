import { configureStore } from '@reduxjs/toolkit';
// import eventReducer from './Features/eventSlice';
import authReducer from './Features/auth/auth_slice';
import connectionsReducer from './Features/connections/connections_slice';
import jobsReducer from './Features/jobs/jobs_slice';
import jobsApplicationReducer from './Features/jobs-application/jobs_application_slice';
import postsReducer from './Features/posts/posts_slice';
import reportsReducer from './Features/reports/reports_slice';
import socialLinksReducer from './Features/social-links/social_links_slice';
import usersReducer from './Features/users/users_slice';
import forumsReducer from './Features/forums/forums_slice';
import newsReducer from './Features/news/news_slice';
import eventsReducer from './Features/events/events_slice';

export default configureStore({
  reducer: {
    // event: eventReducer,
    auth: authReducer,
    connections: connectionsReducer,
    jobs: jobsReducer,
    jobsApplication: jobsApplicationReducer,
    posts: postsReducer,
    reports: reportsReducer,
    socialLinks: socialLinksReducer,
    users: usersReducer,
    forums: forumsReducer,
    news: newsReducer,
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
