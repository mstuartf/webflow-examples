var APP_BASE_URL = "https://mikes-initial-project-9ce387.webflow.io";
var API_BASE_URL = "https://api.dev.quali-service.fr";
var TOKEN_KEY = "__setThisToSomethingBetter__";
var LOGIN_PAGE_PATH = "";

// this is a utility function for redirecting the user to internal pages
function redirectToAppPage(path) {
  window.location.href = APP_BASE_URL + path;
}

// this function checks local storage for a token and if one is not found redirects the user to the login page
function checkLoggedIn() {
  var token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    redirectToAppPage(LOGIN_PAGE_PATH)
  }
}

window.onload = function () {
  checkLoggedIn();
}
