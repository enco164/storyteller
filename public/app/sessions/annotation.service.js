/**
 * Created by enco on 27.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('Annotation', Annotation);

    Annotation.$inject = ['$resource', 'NGAnnotation'];

    function Annotation($resource, NGAnnotation) {
        return $resource('/api/annotations/:id', {id: '@id'});
    }
})();