let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'admin.securella.com') {
  backendHost = 'http://api.securella.com';
} else if(hostname === 'admin.staging.securella.com') {
  backendHost = 'http://api.staging.securella.com';
} else {
  backendHost = 'http://127.0.0.1:3000';
}

const apiVersion = 'v1';
const API_ROOT = `${backendHost}/api/${apiVersion}/`;

const ApiURL = (slug) => {
  return API_ROOT + slug;
}

export default ApiURL;
