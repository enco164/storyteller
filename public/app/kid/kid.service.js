/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';
    angular
    .module('app.kid')
        .factory('Kid', Kid)
        .factory('KidResidence',KidResidence);

    Kid.$inject = ['$resource'];
    KidResidence.$inject = ['$resource'];

    function Kid($resource) {
        return $resource('/api/kids/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }

    function KidResidence($resource) {
        return $resource('/api/kids/:kid_id/residences/:residence_id', {kid_id: '@kid_id',residence_id: '@residence_id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();