/**
 * Created by milan on 20.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.recordings')
        .factory('AudioRecording', AudioRecording);

    AudioRecording.$inject = ['$resource'];

    function AudioRecording($resource) {
        return $resource('/api/recordings/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }
})();