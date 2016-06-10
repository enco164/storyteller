(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['$rootScope', '$auth', '$state', 'logger'];
  /* @ngInject */
  function SignupController($rootScope, $auth, $state, logger) {
    var vm = this;
    vm.title = 'Login';

    vm.user = null;

    vm.signup = signup;

    activate();

    function activate() {
    }

    function signup() {
      $auth.signup(vm.user)
        .then(function(response) {
          $auth.setToken(response);
          $state.go('dashboard');
          logger.info('You have successfully created a new account and have been signed-in');
          $rootScope.$broadcast('authChanged');
        })
        .catch(function(error) {
          logger.error(error.data.message);
        });
    }
  }
})();
