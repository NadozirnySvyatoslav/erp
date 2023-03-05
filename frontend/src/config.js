
const config = {
  apiBasePath: 'http://' + window.location.hostname +':8001',
  reactAppMode: process.env.REACT_APP_MODE || 'dev',
};

export default config;
