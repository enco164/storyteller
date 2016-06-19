/**
 * Created by enco on 16.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('SessionTranscript', SessionTranscript);

    SessionTranscript.$inject = ['$resource'];

    function SessionTranscript($resource) {
        return $resource('/api/sessions/:sessionId/transcripts/:transcriptId',
            {sessionId: '@sessionId', transcriptId: '@transcriptId'}, {
                'update': {method: 'PUT'}
            }
        );
    }
})();