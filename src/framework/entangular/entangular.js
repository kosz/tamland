'use strict';

/**
 * @ngdoc engangular
 * @name engangular
 * @author Cosmin
 *
 * @description
 * A 50 line simulation of Angular JS providing
 * - a simple dependency injection mechanism
 * - a component factory ( similar to Angular 2.0 components )
 * - a singleton service factory, which can inject services into other services or components
 *
 */
window.entangular = {};
(function () {

  /**
   * @ngdoc function
   * @name entangular.component
   * @methodOf entangular
   *
   * @description
   * A factory function that instantiates an Entangular Component
   * **Note**: The name value must match a custom html tag, to attach to
   *
   * @param name string
   * @param injections array
   * @param $class function ( constructor )
   *
   * @example
     <pre>
      function MyAngularController(element,injections) {
        // constructor code
      }
      engangular.component('my-angular-component',[],MyAngularController);

      // or even more popular from the angular docs
      entangular.component('my-angular-component', [], function(element,injections) {
        // constructor code
      });
     </pre>
    *
   */
  entangular.component = function component (name, injections, $class) {
    entangular.components[name] = { injections: injections, $class: $class };
    entangular.componentsKeys.push(name);
  };

  /**
   * @ngdoc function
   * @name entangular.service
   * @methodOf entangular
   *
   * @description
   * A factory function that instantiates an Entangular Singleton Service
   *
   * @param name string
   * @param injections array
   * @param $class function ( singleton constructor )
   *
   * @example
     <pre>
      entangular.service('$userRestService', [], function(injections) {
        // singleton constructor code
      });
     </pre>
    *
   */
  entangular.service = function service (name, injections, $object) {
    entangular.services[name] = { injections: injections, $object: $object };
    entangular.servicesKeys.push(name);
  };

  // should be private
  entangular.components = {};
  entangular.componentsKeys = [];
  entangular.services = {};
  entangular.servicesKeys = [];

  // should be private
  entangular.$compile = function () {
    entangular.componentsKeys.forEach(entangular.$compileComponentType);
  };

  // should be private
  entangular.$inject = function (injections) {
    var injectables = [];
    injections.forEach(function(injection) {
      injectables[injection] = entangular.services[injection].$object();
    });
    return injectables;
  };

  // should be private
  entangular.$compileComponentType = function (component) {
    var elements = document.querySelectorAll(component);
    for (var i = 0; i < elements.length; i+=1) {
      entangular.$bindComponent(elements[i], entangular.components[component]);
    }
  };

  // should be private
  entangular.$bindComponent = function (element,component) {
    element.$component =
      new component.$class
        (element, entangular.$inject(component.injections));
  };

})();

// Page gets Bootstrapped HERE
document.addEventListener("DOMContentLoaded", function(event) {
  entangular.$compile();
});
