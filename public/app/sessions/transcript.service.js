/**
 * Created by enco on 25.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('Session', Session);

    Session.$inject = ['$resource'];

    function Session($resource) {
        return $resource('/api/sessions/:id', {id: '@id'}, {
                'update': {method: 'PUT'}
            }
        );
    }
})();