(function() {
    'use strict';
    angular
    .module('app.media')
        .factory('Media', Media);

    Media.$inject = ['$resource'];

    function Media($resource) {
        return $resource('/api/media/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();