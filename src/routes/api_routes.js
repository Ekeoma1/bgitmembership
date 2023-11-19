const apiRoutes = {
  // auth
  signup: '/Auth/SignUp',
  signin: '/Auth/Login',

  // connections
  getAcceptedConnections: '/Connections/GetAcceptedConnections',
  getSentRejectedRequests: '/Connections/GetSentRejectedRequests',
  getPotentialConnections: '/Connections/GetPotentialConnections',
  sendConnectionRequest: '/Connections/SendConnectionRequest',
  getPendingRequestConnections: '/Connections/GetPendingRequestConnections',
  acceptConnectionRequest: '/Connections/AcceptConnectionRequest',
  rejectConnectionRequest: '/Connections/RejectConnectionRequest',
  getBlockedUsers: '/Connections/GetBlockedUsers',
  blockUser: '/Connections/BlockUser',
  unblockUser: '/Connections/UnblockUser',
  muteUser: '/Connections/MuteUser',
  unmuteUser: '/Connections/UnmuteUser',

  // jobs
  addJob: '/Jobs/AddJob',
  editJob: '/Jobs/EditJob',
  getAllJobs: '/Jobs/GetAllJobs',
  getAllInactiveJobs: '/Jobs/GetAllInactiveJobs',
  getAllClosedJobs: '/Jobs/GetAllClosedJobs',
  deleteJob: '/Jobs/DeleteJob',

  // jobs application
  applyForJob: '/JobsApplication/ApplyForJob',

  // posts
  createPost: '/Posts/CreatePost',
  likePost: '/Posts/LikePost',
  unlikePost: '/Posts/UnlikePost',
  getPostLikedUsers: '/Posts/GetPostLikedUsers',
  getAllPosts: '/Posts/GetAllPosts',
  getAllPostsByUserId: '/Posts/GetPostsByUserId',
  getMyPosts: '/Posts/GetMyPosts',
  createComment: '/Posts/CreateComment',
  likeComment: '/Posts/LikeComment',
  unlikeComment: '/Posts/UnlikeComment',
  getAllCommentsByPostId: '/Posts/GetAllCommentsByPostId',
  savePost: '/Posts/SavePost',
  unsavePost: '/Posts/UnsavePost',

  // reports
  reportUser: '/Reports/ReportUser',
  getAllReports: '/Reports/GetAllReports',

  // social links
  addSocialLinks: '/SocialLinks/AddSocialLinks',
  getSocialLinks: '/SocialLinks/GetSocialLinks',
  updateSocialLinks: '/SocialLinks/UpdateSocialLinks',
  deleteSocialLink: 'SocialLinks/DeleteSocialLink',

  // users
  getUserProfileById: '/Users/GetUserProfileById',
  getMyProfile: '/Users/GetMyProfile',
  changePassword: '/Users/ChangePassword',
  updateMyProfile: '/Users/UpdateMyProfile',
  getFeedPreference: '/Users/GetFeedPreference',
  updateFeedPreference: '/Users/UpdateFeedPreference',
  getPrivacySettings: '/Users/GetPrivacySettings',
  updatePrivacySettings: '/Users/UpdatePrivacySettings',
  closeAccount: '/Users/CloseAccount',
  updateProfilePicture: '/Users/UpdateProfilePicture',
  updateBackgroundPicture: '/Users/UpdateBackgroundPicture',
  getUsers: '/Users/GetUsers',

  // forums
  joinForum: '/Forums/JoinForum',
  leaveForum: '/Forums/LeaveForum',
  createForum: '/Forums/CreateForum',
  getAllForums: '/Forums/GetAllForums',
  getForumById: '/Forums/GetForumById',
  getAllForumsByIndustry: '/Forums/GetAllForumsByIndustry',
  getAllForumsByLocation: '/Forums/GetAllForumsByLocation',

  // News
  getAllNews: '/News/GetAllNews',
  getNewsById: '/News/GetNewsById',

  // Events
  getAllEvents: '/Events/GetAllEvents',
  getEventById: '/Events/GetEventById',
  applyForEvent: '/Events/ApplyForEvent',
};

export default apiRoutes;
