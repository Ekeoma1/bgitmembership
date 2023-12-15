const apiRoutes = {
  // auth
  signup: '/Auth/SignUp',
  signin: '/Auth/Login',

  // connections
  getAcceptedConnections: '/Connections/GetAcceptedConnections',
  getSentRejectedRequests: '/Connections/GetSentRejectedRequests',
  getPotentialConnections: '/Connections/GetPotentialConnections',
  sendConnectionRequest: '/Connections/SendConnectionRequest',
  cancelConnectionRequest: '/Connections/CancelConnectionRequest',
  getPendingRequestConnections: '/Connections/GetPendingRequestConnections',
  acceptConnectionRequest: '/Connections/AcceptConnectionRequest',
  rejectConnectionRequest: '/Connections/RejectConnectionRequest',

  // account privacies
  getBlockedUsers: '/AccountPrivacies/GetBlockedUsers',
  blockUser: '/AccountPrivacies/BlockUser',
  unblockUser: '/AccountPrivacies/UnblockUser',
  muteUser: '/AccountPrivacies/MuteUser',
  unmuteUser: '/AccountPrivacies/UnmuteUser',

  // jobs
  getAllJobs: '/Jobs/GetAllJobs',
  saveJob: '/Jobs/SaveJob',
  unsaveJob: '/Jobs/UnSaveJob',
  getSavedJobs: '/Jobs/GetSavedJobs',
  addJob: '/Company/Jobs/AddJob',
  editJob: '/Company/Jobs/EditJob',
  getAllInactiveJobs: '/Company/Jobs/GetAllInactiveJobs',
  getAllClosedJobs: '/Company/Jobs/GetAllClosedJobs',
  deleteJob: '/Company/Jobs/DeleteJob',

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
  replyComment: '/Posts/ReplyComment',
  likeComment: '/Posts/LikeComment',
  unlikeComment: '/Posts/UnlikeComment',
  likeReply: '/Posts/LikeReply',
  unlikReply: '/Posts/UnlikeReply',
  getCommentsByPostId: '/Posts/GetAllCommentsByPostId',
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
  getConnectionStatusByUserId: '/Users/GetConnectionStatus',

  // forums
  joinForum: '/Forums/JoinForum',
  leaveForum: '/Forums/LeaveForum',
  cancelJoinForumRequest: '/Forums/CancelJoinForumRequest',
  createForum: '/Forums/CreateForum',
  getAllForums: '/Forums/GetAllForums',
  getForumById: '/Forums/GetForumById',
  getForumConnectionStatusById: '/Forums/GetForumMembershipStatus',
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
