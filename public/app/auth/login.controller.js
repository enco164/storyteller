(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$auth', '$state', 'logger'];
  /* @ngInject */
  function LoginController($auth, $state, logger) {
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
        })
        .catch(function(error) {
          logger.error(error.data.message);
        });
    }
  }
})();
