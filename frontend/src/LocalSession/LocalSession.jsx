import { useEffect, useState } from "react"


/**
 * For manupilating data in local session
 */
export class LocalSession {

  /**
   * 
   * @param {String} sessionData 
   */
  static setSessionVariables(sessionData) {
    window.sessionStorage.setItem('uid', sessionData['uid'])
    window.sessionStorage.setItem('currency_id', Object.keys(sessionData.currencies)[0])
    window.sessionStorage.setItem('name', sessionData['name'])
    window.sessionStorage.setItem('username', sessionData['username'])
    window.sessionStorage.setItem('user_context_lang', sessionData.user_context.lang)
    window.sessionStorage.setItem('user_context_location', sessionData.user_context.tz)
    window.sessionStorage.setItem('partner_id', sessionData['partner_id'])
  };

  /**
   * 
   * @param {String} sessionData 
   */
  static setSessionCompany(sessionData) {
    console.log("session company", sessionData);
    window.sessionStorage.setItem('user_company_id', sessionData['parentId']);
    window.sessionStorage.setItem('user_company_name', sessionData['parentName']);
  };


  /**
   * 
   * @param {String} token 
   */
  static setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
  };



  /**
 * 
 * @param {String} access_token 
 */
  static setAccessToken(access_token) {
    localStorage.setItem('access_token', access_token)
  };


  static get getAccessToken() {
    // console.log("from static functions refresh token is", localStorage.getItem('refresh_token'))
    return localStorage.getItem('access_token')
  }


  /**
* 
* @param {String} token 
*/
  static setRefreshToken(refresh_token) {
    localStorage.setItem('refresh_token', refresh_token)
  };



  static get getRefreshToken() {
    // console.log("from static functions refresh token is", localStorage.getItem('refresh_token'))
    return localStorage.getItem('refresh_token')
  }


  /**
   * Debug mode for testing ONLY
   * @param {Bool} debug 
   */
  static setMode(debug) {
    localStorage.setItem('debug', JSON.stringify({ debug: debug }))
  }


  /**
   * 
   * @param {String} session_data JSON stringified user data
   */
  static setLocationVariables(session_data) {
    // console.log("set Location variables: ", session_data)
    localStorage.setItem('user_details', JSON.stringify(session_data))
  }


  /**
   * 
   * @returns {Number} user id
   */

  static get getUid() {
    const userUID = JSON.parse(localStorage.getItem('user_details'))?.email;
    return userUID
  }



  /**
   * @returns {String} username
   */
  static get getUsername() {
    const username = JSON.parse(localStorage.getItem('user_details'));
    return username?.email
  }

  /**
   * @returns {String} session_id for backend
   */
  static get getUserSessionID() {

    return Cookies.get('session_id');

  }

  /**
   * Clears all user data from browser
   */
  static clear() {

    localStorage.clear();
    sessionStorage.clear();


  };


  static get getTokenExp() {
    const userPartnerID = JSON.parse(localStorage.getItem('user_details'));
    return userPartnerID?.exp;
  };

  static get getTokenOrigIat() {
    const userPartnerID = JSON.parse(localStorage.getItem('user_details'));
    return userPartnerID?.origIat;
  };


  static get getToken() {
    const userToken = JSON.parse(localStorage.getItem('token'));
    return userToken?.token;
  };

  /**
   * @returns {Bool}
   */
  static get getMode() {
    const userMode = JSON.parse(localStorage.getItem('debug'))?.debug;
    return userMode
  }

  /**
   * 
   */
  static get getCsrfToken() {
    // return Cookies.get('csrfToken');
    console.log("doc cookies", document.cookie)
    var value = document.cookie.match("(^|;)\\s*" + 'csrftoken' + "\\s*=\\s*([^;]+)");
    console.log("csrf token is", value);
    return value ? value.pop() : ""
  }


};
























