
//const BASE_URL = "https://mindpurity.com/?mode=webview";
const PURE_URL = "mindpurity.com";

const BASE_URL = "https://"+PURE_URL;

const LOGIN_URL = BASE_URL + "/login";
const MY_ACCOUNT_URL = BASE_URL + "/membership-account/membership-checkout/?level=1";

const MY_ACCOUNT_URL_LOGIN = BASE_URL + "/membership-account";
const LOGOUT_URL = BASE_URL + "/logout";

const PARAM_MODE = {"mode":"webview"}
const PARAM_DEVICE_IOS = {"device":"ios"}

//const LOGIN_FACEBOOK_URL = "https://mindpurity.com/wp-login.php?action=wordpress_social_"
const LOGIN_FACEBOOK_URL = "wordpress-social-login"

export default {
    PURE_URL,
    BASE_URL,
    LOGIN_URL,
    MY_ACCOUNT_URL_LOGIN,
    LOGOUT_URL,
    MY_ACCOUNT_URL,
    PARAM_MODE,
    PARAM_DEVICE_IOS,
    LOGIN_FACEBOOK_URL
};

