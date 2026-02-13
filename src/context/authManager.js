let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

export const logoutFromInterceptor = () => {
  if (logoutHandler) {
    logoutHandler();
  }
};
