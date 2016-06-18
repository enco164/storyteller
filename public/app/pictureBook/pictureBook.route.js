(function() {
  'use strict';

  angular
    .module('app.pictureBook')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'pictureBooks',
        config: {
          url: '/picture_books?id',
          templateUrl: 'app/pictureBook/pictureBooks.html',
          controller: 'PictureBookController',
          controllerAs: 'vm',
          title: 'Picture Books',
          settings: {
            nav: 6,
            content: '<i class="material-icons">book</i> Picture Books'
          },
          loginRequired: true
        }
      }
    ];
  }
})();
