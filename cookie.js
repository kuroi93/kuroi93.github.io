'use strict';

/**
 * The cookie class allows you to manipulate cookies as indicated by his name
 */
export default class cookie {
  /**
   * Create a cookie with all the properties
   * @param {string} name Name of the cookie
   * @param {string|number|any} value Value of the cookie
   * @param {object()} options List of all the options needed
   * @example
   * // return document.cookie = 'key=value; expires=0; samesite=lax; path=/; domain=/; secure=true';
   * cookie.set('key', 'value', { expires: 0, domain: '/', secure: true});
   */
  static set(name, value, options = {}) {
    // Path is required no matter what so it's automatically included!
    options = {
      path: '/',
      samesite: 'lax',
      ...options,
    };

    // If expires use the Date API, convert it into UTC format
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    // Update the value of the cookie first
    let updatedCookie =
      encodeURIComponent(name) + '=' + encodeURIComponent(value);

    // And for each options, add it
    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    // Finally, create the cookie
    document.cookie = updatedCookie;
  }

  /**
   * Find the cookie with x name
   * @param {string} name The cookie's name to find
   * @example
   * // return "bar" with this cookie: foo=bar
   * cookie.get('foo');
   */
  static get(name) {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  /**
   * Delete the x cookie by changing his exipration date to negative
   * @param {string} name The cookie to delete
   * @example
   * // delete the "foo" cookie
   * cookie.delete('foo');
   */
  static delete(name) {
    // To delete the cookie, we use the get() method and modify the max-age to -1 to force expiration
    this.set(name, '', {
      'max-age': -1,
    });
  }

  /**
   * Get the list of all cookies
   * @return {object()} returns all cookies as an object
   * @example
   * // return {'cookie1':'value1','cookie2':'value2'}
   * cookie.getAll();
   */
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
      let err = 'Error: No cookie detected!';
      console.log(err);
      throw err;
    }
  }
}
