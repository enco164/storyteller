/**
 * Created by Nikola on 12/6/2016.
 */
(function() {
    'use strict';
    angular
        .module('app.residence')
        .factory('Residence', Residence);

    Residence.$inject = ['$resource'];

    function Residence($resource) {
        return $resource('/api/residences/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();