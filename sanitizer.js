'use strict';

/**
 * With Sanitizer, you can clean and ¤ sanitize ¤ various input
 */
export default class sanitizer {
  /**
   * Paranoid sanitization only left the alphanumeric set through
   * @param {string} string The input
   */
  static paranoid(string) {
    return string.replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * URL sanitization remove everything except: words , _ , . , - , :, /
   * @param {string} string The input
   */
  static url(string) {
    return string.replace(/[^\w\.\-\:\/]/, '');
  }

  /**
   * Login sanitization remove everything except: words , _ , -
   * @param {string} string The input
   */
  static login(string) {
    return string.replace(/[^\w\-]/, '');
  }

  /**
   * Char sanitization remove everything except: words , _ , -
   * @param {string} string The input
   */
  static char(string) {
    return string.replace(/[^\w\-]/, '');
  }

  /**
   * CharSpace sanitization remove everything except: words , _ , - , space
   * @param {string} string The input
   */
  static charSpace(string) {
    return string.replace(/[^\w\-\s]/, '');
  }

  /**
   * email sanitization remove everything except: words , _ , - , @ , .
   * @param {string} string The input
   */
  static email(string) {
    string.toLowerCase();
    return string.replace(/[^\w\-\@\.]/, '');
  }

  /**
   * int sanitization transform string, untyped number and float onto int
   * @param {string|number|float} number The input
   */
  static int(number) {
    return parseInt(number, 10);
  }

  /**
   * float sanitization transform string, untyped number and int onto float
   * @param {string|number|int} number The input
   */
  static float(number) {
    return parseFloat(number);
  }

  /**
   * email sanitization remove every special character onto it's html compatible version and every double space and more onto simple space
   * @param {string} string The input
   */
  static html(string) {
    string.replace(/\&/g, '&amp;');
    string.replace(/</g, '&lt;');
    string.replace(/>/g, '&gt;');
    string.replace(/\n/g, '<br>');
    string.replace(/"/g, '&quot;');
    string.replace(/'/g, '&#39;');
    string.replace(/%/g, '&#37;');
    string.replace(/\(/g, '&#40;');
    string.replace(/\)/g, '&#41;');
    string.replace(/\+/g, '&#43;');
    string.replace(/-/g, '&#45;');
    string.replace(/\s{2,}/g, ' ');
    return string;
  }

  /**
   * Pas de conversion effectuée car inutilisée ( code PHP )
    function sanitize_passwd_string($string) {
      $pattern=array('&','\\','!','$','"','<','>','\'');
      $replace=array('&amp;','&#092;','&#33;','&#036;','&quot;','&lt;','&gt;','&#39;');
      return str_replace($pattern, $replace, $string);
    }
  */
}
