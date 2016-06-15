(function() {
    'use strict';
    angular
    .module('app.upload')
        .factory('Uploads', Uploads);

    Uploads.$inject = ['$resource'];

    function Uploads($resource) {
        return $resource('/api/uploads/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();