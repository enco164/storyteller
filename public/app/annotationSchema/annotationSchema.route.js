(function() {
  'use strict';

  angular
    .module('app.annotationSchema')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'annotationSchemas',
        config: {
          url: '/annotation_schemas?id',
          templateUrl: 'app/annotationSchema/annotationSchemas.html',
          controller: 'AnnotationSchemaController',
          controllerAs: 'vm',
          title: 'Annotation Schemas',
          settings: {
            nav: 6,
            content: '<i class="fa fa-file-text" aria-hidden="true"></i> Annotation Schemas'
          },
          loginRequired: true
        }
      }
    ];
  }
})();
