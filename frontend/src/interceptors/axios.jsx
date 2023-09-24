import axios from "axios";
import { LocalSession } from "../LocalSession/LocalSession";

const CONFIG_BASEURL = import.meta.env.VITE_CONFIG_BASE_URL

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    withCredentials: true,
    crossDomain: true,

    baseURL: CONFIG_BASEURL
}

export const fetch = axios.create(requestConfig)



// request intercept
fetch.interceptors.request.use(config => {
    console.log("intercept fetch axios request config is", config)
    if (!config.data.includes("refreshToken")) {

        const token = LocalSession.getAccessToken;
        console.log("attahced token is", token);
        // config.headers['Authorization'] = token ? `JWT ${token}` : '';
    } else {
        console.log("*************THIS IS REFRESH TOKEN REQUEST**************")
        config.headers['Authorization'] = '';
    }

    console.log("Returnes config", config)
    return config
})

var refresh = false
// response intercept
fetch.interceptors.response.use(async response => {
    console.log("fetch axios, response is", response)
    //  In case request is for auth. the storage variables will be set
    if (response.status == 200 && response.data.data?.tokenAuth) {
        LocalSession.setAccessToken(response.data.data.tokenAuth.token)
        // console.log("refresh_token is ", resp.data.data.tokenAuth.refreshToken)
        LocalSession.setRefreshToken(response.data.data.tokenAuth.refreshToken)
        // console.log("refresh_token is ", resp.data.data.tokenAuth.payload)
        LocalSession.setLocationVariables(response.data.data.tokenAuth.payload)
        return ({ status: true, data: response.data.data })
    }
    if (response?.data?.errors) {
        var error = response.data.errors[0].message;
        console.error("fetch axios response error msg", response.data.errors)
        console.error("fetch axios response", response, "refresh = ", refresh)
        switch (error) {
            case "Signature has expired":
                // if (!refresh) {
                //     // send refresh token request
                //     refresh = !refresh
                //     const resp = await Requests.RefreshToken2()
                //     if (resp.status) {
                //         // token is refreshed already
                //         // try to send initial request again
                //         refresh = !refresh
                //         return await fetch({ data: response.config.data })
                //     } else {
                //         //  has to be logout and redirect to main page

                //     }

                // }
                // // check if already refreshed when logout
                // // if refresh is false send refresh token
                return ({ status: false, data: [], error: response.data.errors[0].message })

            default:
                return ({ status: false, data: response.data.data, error: response.data.errors[0].message })
        }


    }
    else {
        console.log("fetch axios response msg", response.data.data)
        return ({ status: true, data: response.data.data })
    }
},
    err => {
        // TODO catch different error responses before returning it to user
        console.log("fetch axios,  error is", err)
        return ({ status: false, data: [], error: err })
    })


