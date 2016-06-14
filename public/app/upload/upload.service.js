/**
 * Created by Nikola on 14/6/2016.
 */
(function() {
    'use strict';
    angular
        .module('app.upload')
        .factory('Upload', Upload);

    Upload.$inject = ['$resource'];

    function Upload($resource) {
        return $resource('/api/uploads/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();