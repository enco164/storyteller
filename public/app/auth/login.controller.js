(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', '$auth', '$state', 'logger'];
  /* @ngInject */
  function LoginController($rootScope, $auth, $state, logger) {
    var vm = this;
    vm.title = 'Login';

    vm.login = login;

    activate();

    function activate() {
    }

    function login() {
      $auth.login(vm.user)
        .then(function() {
          $state.go('dashboard');
          $rootScope.$broadcast('authChanged');
        })
        .catch(function(error) {
          logger.error(error.data.message);
        });
    }
  }
})();
