(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$scope', '$state', '$auth', 'routerHelper'];
  /* @ngInject */
  function SidebarController($scope, $state, $auth, routerHelper) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    function activate() {
      getNavRoutes();
    }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;

      var active = $state.current.title.substr(0, menuName.length) === menuName ? 'active ' : false;
      if (!active) {
        return '';
      }

      active += $state.current.title === 'Recordings' ? 'mdl-color--red-700':
                $state.current.title === 'Sessions' ? 'mdl-color--amber-700':
                $state.current.title === 'Kids' ? 'mdl-color--blue-700':
                $state.current.title === 'Picture Books' ? 'mdl-color--green-700':
                $state.current.title === 'Annotation Schemas' ? 'mdl-color--deep-orange-700':
                $state.current.title === 'Admin' ? 'mdl-color--purple-700':
                    '';

      return active;
    }
  }
})();
