'use strict';

// The cookie class allows' you to manipulate cookies as indicated by his name
export default class cookie {
  // Check if at least one cookie exist
  static isAny() {
    return document.cookie === '' ? false : true;
  }

  // Get all the cookies and convert them onto an object
  static getAll() {
    if (this.isAny()) {
      const allTheCookies = document.cookie.trim().split(';');
      let finalObject = {};
      for (let i = 0; i < allTheCookies.length; i++) {
        let cur = allTheCookies[i].split('=');
        finalObject[cur[0].trim()] = cur[1].trim();
      }
      return finalObject;
    } else {
      console.log('Error: No cookie detected!');
    }
  }

  // Get the value of named cookie
  static getValueOf(name) {
    const allTheCookies = this.getAll();
    for (const cookie in allTheCookies) {
      if (cookie == name) {
        return allTheCookies[cookie];
      } else {
        throw 'Error : No "' + name + '" cookie found...';
      }
    }
  }

  /**
   * Create a cookie
   * @param {string} name The name of the cookie
   * @param {string|number|any} value The value of the cookie
   * @param {string|number|date} expire Expiration date ( 0 = session )
   * @param {string} path Path for accessing to the cookie
   * @param {string} domain Domain ( url ) who grant access to the cookie
   */
  static create(name, value, expire, path, domain) {
    document.cookie = `${name}=${value}; expires=${expire}; path=${path}; domain=${domain}`;
  }
}
