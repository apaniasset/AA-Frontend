import store from "../store/Index";
import moment from "moment";
import { setAuth } from "../store/slices/authentication";
import { API_CONFIG } from "../config/api";
const dispatch = store.dispatch;
const reduxState = store.getState();
const jwToken = reduxState?.auth?.jwToken;
const user = reduxState.user;

// Use AA backend base URL (same as Postman base_url)
const API_URL = (API_CONFIG.BASE_URL || "").replace(/\/?$/, "/");

function forceLogout(): void {
  try {
    const state = store.getState() as any;
    const currentUserId = state?.user?.id;
    console.log("forceLogout from ApiService, userId:", currentUserId);
    // In Menupalz this also calls asyncLogout and clears slices.
    // Here we just dispatch auth reset; UI can handle navigation on 401.
    // If you add slices/user & slices/authentication, wire them here.
  } catch (e) {
    console.log("forceLogout error:", e);
  }
}

var header: any = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
};
var formDataHeader: any = {
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json',
  'Authorization': jwToken || null,
  'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
};

jwToken ? header['Authorization'] = jwToken : null;

interface MyRequestOptions extends RequestInit {
  cache?: RequestCache;
}
export function setNewHeaderWithJwt(jwt: string) {
  jwt ? header['Authorization'] = jwt : null;
  jwt ? formDataHeader['Authorization'] = jwt : null;
}
export async function authentication() {
  var auth = store.getState().auth;
  if (auth.jwToken) {
    var minDiff = moment(auth?.jwTokenExpiryDate).diff(moment.utc(), 'minutes');
    if (minDiff < 1) {
      var refDiff = moment(auth?.refreshTokenExpiryDate).diff(moment.utc(), 'minutes');
      if (refDiff < 1) {
        // Logout
        // forceLogout(user.id)
        return false;
      } else {
        // call Refresh token
        const path = API_URL + 'refresh-token'
        const body = {
          "refresh_token": auth.refreshToken
        }
        const myHeader = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        try {
          const requestOptions = {
            method: 'POST',
            headers: myHeader,
            body: JSON.stringify(body)
          };
          const response = await fetch(path, requestOptions);
          if (response.status === 200 || response.status === 201) {
            const data: any = await response.json();
            dispatch(setAuth(data?.data?.authorization))
            var authorization = "Bearer " + data?.data?.authorization?.access_token;
            return authorization;
          } else if (response.status === 401) {
            // forceLogout(user.id)
            return false;
          }
        } catch (e) {
          console.log("refreshtoken", e);
          return false;
        }
      }
    } else {
      // return auth
      var authorization = auth.jwToken;
      return authorization;
    }
  }
  else {
    return false;
  }
}

export async function get(path: String, paramObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  var params = "";

  Object.keys(paramObject).forEach(function (key) {
    if (params == "") {
      params += "?" + key + "=" + paramObject[key];
    } else {
      params += "&" + key + "=" + paramObject[key];
    }
  });

  try {
    let requestOption: MyRequestOptions = {
      method: 'GET',
      cache: 'force-cache',
      headers: { ...header, ...headerObject },
    }
    const response: any = await fetch(apiURL + params, requestOption);
    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth)
        return get(path, paramObject, headerObject, true);
      }
    }
    const data: any = await response.json();
    data["status"] = response.status;
    return data;
  } catch (e) {
    console.log(e);
    return { "status": 500, "error": e };
  }
}

export async function getBlobFile(path: String, paramObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  let params = "";
  Object.keys(paramObject).forEach(function (key) {
    params += (params === "" ? "?" : "&") + key + "=" + paramObject[key];
  });

  try {
    let requestOption: MyRequestOptions = {
      method: 'GET',
      cache: 'force-cache',
      headers: { ...header, ...headerObject },
    };

    const response: any = await fetch(apiURL + params, requestOption);

    if (response.status === 503) {
      return false;
    } else if (response.status === 401) {
      forceLogout();
      return false;
    } else if (response.status === 401 && !isRefreshTokenCall) {
      // forceLogout();
      const newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth);
        return get(path, paramObject, headerObject, true);
      }
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      data["status"] = response.status;
      return data;
    } else {
      const blob = await response.blob();
      return {
        status: response.status,
        fileBlob: blob,
        contentDisposition: response.headers.get("content-disposition"),
      };
    }
  } catch (e) {
    return { status: 500, error: e };
  }
}

export async function post(path: String, bodyObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  try {
    const requestOptions = {
      method: 'POST',
      headers: { ...header, ...headerObject },
      body: JSON.stringify(bodyObject)
    };
    const response = await fetch(apiURL, requestOptions);

    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth)
        return post(path, bodyObject, headerObject, true);
      }
    }
    const data: any = await response.json();

    data["status"] = response.status;
    return data;
  } catch (e) {
    return { "status": 500, "error": e };
  }
}

export async function deleteApi(path: String, bodyObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { ...header, ...headerObject },
      body: JSON.stringify(bodyObject)
    };
    const response = await fetch(apiURL, requestOptions);
    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth)
        return deleteApi(path, bodyObject, headerObject, true);
      }
    }
    const data: any = await response.json();
    data["status"] = response.status;
    return data;

  } catch (e) {
    return { "status": 500, "error": e };
  }
}

export async function put(path: String, bodyObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { ...header, ...headerObject },
      body: JSON.stringify(bodyObject)
    };
    const response = await fetch(apiURL, requestOptions);
    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth);
        return put(path, bodyObject, headerObject, true);
      }
    }
    const data: any = await response.json();
    data["status"] = response.status;
    return data;
  } catch (e) {
    return { "status": 500, "error": e };
  }
}

export async function patch(path: String, bodyObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { ...header, ...headerObject },
      body: JSON.stringify(bodyObject)
    };
    const response = await fetch(apiURL, requestOptions);
    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth);
        return put(path, bodyObject, headerObject, true);
      }
    }
    const data: any = await response.json();
    data["status"] = response.status;
    return data;
  } catch (e) {
    return { "status": 500, "error": e };
  }
}

export async function postWithFormData(path: string, bodyObject: any, headerObject: any, isRefreshTokenCall: boolean = false) {
  let apiURL = API_URL + path;
  try {
    const requestOptions = {
      method: 'POST',
      headers: { ...formDataHeader, ...headerObject },
      body: bodyObject
    };
    const response = await fetch(apiURL, requestOptions);

    if (response.status === 503) {

      return false;
    } else if (response.status == 401) {
      forceLogout()
      return false;
    } else if (response.status == 401 && !isRefreshTokenCall) {
      // forceLogout()
      let newAuth: any = await authentication();
      if (newAuth) {
        setNewHeaderWithJwt(newAuth)
        return postWithFormData(path, bodyObject, headerObject, true);
      }
    }
    const data: any = await response.json();
    data["status"] = response.status;
    return data;
  } catch (e) {
    return { "status": 500, "error": e };
  }
}
