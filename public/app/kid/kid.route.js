(function() {
  'use strict';

  angular
    .module('app.kid')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'kid',
        config: {
          url: '/kid',
          templateUrl: 'app/kid/kid.html',
          controller: 'KidController',
          controllerAs: 'vm',
          title: 'Kid',
          settings: {
            nav: 3,
            content: '<i class="fa fa-child"></i> Kid'
          },
          loginRequired: true
        }
      },
      {
        state: 'kidDetails',
        config: {
          url: '/kid/details/:kidId',
          templateUrl: 'app/kid/kidDetails.html',
          controller: 'KidDetailsController',
          controllerAs: 'vm',
          title: 'Kid details',
          loginRequired: true
        }
      }
    ];
  }
})();
