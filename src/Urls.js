
//const BASE_URL = "https://mindpurity.com/?mode=webview";
const PURE_URL = "mindpurity.com";

const BASE_URL = "https://"+PURE_URL;
const LOGIN_URL = BASE_URL + "/login";
const MY_ACCOUNT_URL = BASE_URL + "/membership-account/membership-checkout/?level=1";


const PARAM_MODE = {"mode":"webview"}
const PARAM_DEVICE_IOS = {"device":"ios"}

export default {
    PURE_URL,
    BASE_URL,
    LOGIN_URL,
    MY_ACCOUNT_URL,
    PARAM_MODE,
    PARAM_DEVICE_IOS
};

