(function() {
    'use strict';
    angular
    .module('app.annotationSchema')
        .factory('AnnotationSchemas', AnnotationSchemas);

    AnnotationSchemas.$inject = ['$resource'];

    function AnnotationSchemas($resource) {
        return $resource('/api/annotation_schemas/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();