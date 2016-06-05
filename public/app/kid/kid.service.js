/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';
    angular
    .module('app.kid')
        .factory('Kid', Kid);

    Kid.$inject = ['$resource'];

    function Kid($resource) {
        return $resource('/api/kids/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();