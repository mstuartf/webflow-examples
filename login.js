var APP_BASE_URL = "https://mikes-initial-project-9ce387.webflow.io";
var API_BASE_URL = "https://api.dev.quali-service.fr";
var TOKEN_KEY = "__setThisToSomethingBetter__";
var HOME_PAGE_PATH = "/home";

// this is a utility function for redirecting the user to internal pages
function redirectToAppPage(path) {
  window.location.href = APP_BASE_URL + path;
}

// this function checks local storage for a token and if one is found redirects the user to the home page
function checkNotLoggedIn() {
  var token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    redirectToAppPage(HOME_PAGE_PATH)
  }
}

function loginRequest(email, password) {
  var payload = {email: email, password: password};
  var http = new XMLHttpRequest();
  http.open('POST', API_BASE_URL + '/accounts/auth/');
  http.setRequestHeader('Content-type', 'application/json');
  http.send(JSON.stringify(payload));
  http.onload = function () {
    var body = JSON.parse(http.responseText);
    if (http.status === 200) {
      loginSuccess(body);
    } else {
      loginError(body);
    }
  }
}

function loginSuccess(body) {
  localStorage.clear()
  localStorage.setItem(TOKEN_KEY, body.token);
  redirectToAppPage(HOME_PAGE_PATH);
}

function loginError(body) {
  if (body.hasOwnProperty("non_field_errors")) {
    alert(body.non_field_errors[0]);
  }
}

window.onload = function () {
  checkNotLoggedIn();
  var loginBtn = document.getElementById("loginBtn");
  var emailInput = document.getElementById("emailInput");
  var passwordInput = document.getElementById("passwordInput");
  loginBtn.onclick = function () {
    var email = emailInput.value;
    var password = passwordInput.value;
    if (!email || !password) {
      return;
    }
    loginRequest(email, password);
  }
}
