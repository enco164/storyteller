/**
 * Created by enco on 14.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.pictureBook')
        .factory('Session', Session);

    Session.$inject = ['$resource'];

    function Session($resource) {
        return $resource('/api/sessions/:id', {id: '@id'}, {
                'update': {method: 'PUT'}
            }
        );
    }
})();