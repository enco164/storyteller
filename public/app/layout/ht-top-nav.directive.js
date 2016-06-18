(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ht-top-nav.html'
    };

    TopNavController.$inject = ['$rootScope', '$scope', '$auth', '$state'];

    /* @ngInject */
    function TopNavController($rootScope, $scope, $auth, $state) {
      var vm = this;
      $rootScope.$watch('pageTitle', function(pageTitle){
        vm.pageTitle = pageTitle;
      });
      $scope.$on('authChanged', onAuthChanged);

      vm.isAuthenticated = $auth.isAuthenticated();

      $scope.isCollapsed = true;

      vm.logout = logout;

      function logout() {
        $auth.logout();
        $state.go('login');
        $rootScope.$broadcast('authChanged');
      }

      function onAuthChanged() {
        vm.isAuthenticated = $auth.isAuthenticated();
      }
    }

    return directive;
  }
})();
