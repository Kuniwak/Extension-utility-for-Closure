// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Namespace for environment module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('orga.ex');
goog.provide('orga.ex.EnvironmentType');


/**
 * The constant means environment where the script runs on.
 * For example, if you want this script runing on Chrome extension background
 * page, change the value 0. See {@link orga.EnvironmentType}.
 * Environment:
 * <ul>
 * <li> Default: 0x00,
 * <li> Chrome extension: 0x10,
 * <li> Safari extension: 0x20,
 * <li> Opera extension: 0x20,
 * <li> Greasemonkey: 0x30,
 * </ul>
 * @define {number} The constant means anywhere on the script runs on.
 */
orga.ex.ENVIRONMENT = orga.ex.getEnvironment();


/** @enum {number} */
orga.ex.EnvironmentType = {
  /** @const */
  DEFAULT: 0x00,
  /** @const */
  CHROME_EX: 0x10,
  /** @const */
  SAFARI_EX: 0x20,
  /** @const */
  OPERA_EX: 0x30,
  /** @const */
  GREASEMONKEY: 0x40,
};


/**
 * @return {?number} Environment where the script runs on.
 */
orga.ex.getEnvironment = function() {
  if (orga.ex.isChromeExtension()) {
    return orga.ex.EnvironmentType.CHROME_EX;
  } else if (orga.ex.isSafariExtension()) {
    return orga.ex.EnvironmentType.SAFARI_EX;
  } else if (orga.ex.isOperaExtension()) {
    return orga.ex.EnvironmentType.OPERA_EX;
  } else if (orga.ex.isFirefoxExtension()) {
    return orga.ex.EnvironmentType.FIREFOX_EX;
  } else if (orga.ex.isGreasemonkey()) {
    return orga.ex.EnvironmentType.GREASEMONKEY;
  }
  return null;
};


/**
 * @return {boolean} Whether the script is a Chrome extension script.
 */
orga.ex.isChromeExtension = function() {
  return goog.isObject(chrome) && goog.isObject(chrome.extension);
};


/**
 * @return {boolean} Whether the script is a Chrome extension content script.
 */
orga.ex.isChromeExtensionContentScript = function() {
  return orga.ex.isChromeExtension() &&
      !goog.isFunction(window.chrome.extension.getBackgroundPage);
};


/**
 * @return {boolean} Whether the script is a Chrome extension but not content
 *    script such as popup, newtab, background.
 */
orga.ex.isChromeExtensionButNotContentScript = function() {
  return orga.ex.isChromeExtension() &&
      goog.isFunction(window.chrome.extension.getBackgroundPage);
};


/**
 * @return {boolean} Whether the script is a Chrome extension background page.
 */
orga.ex.isChromeExtensionBackgroundPage = function() {
  return orga.ex.isChromeExtensionButNotContentScript() &&
      window.chrome.extension.getBackgroundPage() === window;
};


/**
 * @return {boolean} Whether the script is a GreaseMonkey script.
 */
orga.ex.isGreaseMonkey = function() {
  return goog.isFunction(GM_LOG);
};


/**
 * @return {boolean} Whether the script is a FireFox extension script.
 */
orga.ex.isFirefoxExtension = function() {
    return goog.isObject(chlorine);
};


/**
 * @return {boolean} Whether the script is a Safari extension.
 */
orga.ex.isSafariExtension = function() {
    return goog.isObject(safari) && goog.isObject(safari.extension);
};


/**
 * @return {boolean} Whether the script runs on a Safari extension global page.
 */
orga.ex.isSafariExtensionGlobalPage = function() {
    return orga.ex.isSafariExtension() &&
        goog.isObject(safari.extension.globalPage) &&
        window === safari.extension.globalPage.contentWindow;
};


/**
 * @return {boolean} Whether the script is a Opera extension.
 */
orga.ex.isOperaExtension = function() {
    return goog.isObject(opera) && goog.isObject(opera.extension);
};


/**
 * @return {boolean} Whether the script runs on a Opera extension background
 *    process.
 */
orga.ex.isOperaExtensionBackgroundProcess = function() {
    return orga.ex.isOperaExtension() && goog.isObject(opera.contexts);
};
