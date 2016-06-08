(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          templateUrl: 'app/auth/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'Login',
          skipIfLoggedIn: true
        }
      },
      {
        state: 'signup',
        config: {
          url: '/signup',
          templateUrl: 'app/auth/signup.html',
          controller: 'SignupController',
          controllerAs: 'vm',
          title: 'Signup',
          skipIfLoggedIn: true
        }
      }
    ];
  }
})();
