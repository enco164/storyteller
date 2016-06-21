/**
 * Created by milan on 21.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('SessionRecording', SessionRecording);

    SessionRecording.$inject = ['$resource'];

    function SessionRecording($resource) {
        return $resource('/api/sessions/:sessionId/recordings/:recordingId',
            {sessionId: '@sessionId', recordingId: '@recordingId'}, {
                'update': {method: 'PUT'}
            }
        );
    }
})();