/**
 * Created by Nikola on 13/6/2016.
 */
(function() {
    'use strict';
    angular
        .module('app.language')
        .factory('Language', Language);

    Language.$inject = ['$resource'];

    function Language($resource) {
        return $resource('/api/languages/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();