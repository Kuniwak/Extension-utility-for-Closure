// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview A script for adaption utility module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('orga.ex.adapt');

goog.require('goog.asserts');
goog.require('goog.array');
goog.require('orga.ex');


/**
 * @private
 * @type {Object.<Object.<Function>}
 */
orga.ex.adapt.defaultConstructorsMap_ = {};


/**
 * @private
 * @return {Object} The map contains adapted constructors.
 */
orga.ex.adapt.getAdaptedConstructorsMap_ = function() {
  var map = orga.ex.adapt.defaultConstructorsMap_;
  if (!map[orga.ex.ENVIRONMENT]) {
    return map[orga.ex.ENVIRONMENT] = {};
  }
  return map[orga.ex.ENVIRONMENT];
};


/**
 * @param {Array.<number>|number} environment An environment where the
 *    constructor can works.
 * @param {string} key The unique string that means a constructors group.
 * @param {Function} ctor A constructor will returns a
 *    default constructor.
 */
orga.ex.adapt.setDefaultConstructor = function(environment, key, ctor) {
  goog.asserts.assertFunction(ctor);
  if (goog.isArray(environment)) {
    goog.array.forEach(environment, function(num) {
      orga.ex.adapt.setDefaultConstructor(num, key, ctor);
    });
  } else {
    var map = orga.ex.adapt.defaultConstructorsMap_[environment];
    if (!goog.isDefAndNotNull(map)) {
      map = orga.ex.adapt.defaultConstructorsMap_[environment] = {};
    }
    map[key] = ctor;
  }
};


/**
 * Given a adapted constructor.
 * Return null if default constructor is not exists.
 * @param {string} key The unique string that means a constructors group.
 * @return {?Function(new:*)} Adapted constructor.
 */
orga.ex.adapt.getDefaultConstructor = function(key) {
  var map = orga.ex.adapt.getAdaptedConstructorsMap_();
  return map[key] || null;
};
