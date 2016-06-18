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
        state: 'kids',
        config: {
          url: '/kids?id',
          templateUrl: 'app/kid/kids.html',
          controller: 'KidsController',
          controllerAs: 'vm',
          title: 'Kids',
          settings: {
            nav: 3,
            content: '<i class="material-icons">child_care</i> Kids'
          },
          loginRequired: true
        }
      }
    ];
  }
})();
