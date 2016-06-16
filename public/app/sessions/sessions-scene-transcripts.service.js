/**
 * Created by enco on 16.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('SessionSceneTranscript', SessionSceneTranscript);

    SessionSceneTranscript.$inject = ['$resource'];

    function SessionSceneTranscript($resource) {
        return $resource('/api/sessions/:sessionId/scene_transcripts/:id',
            {sessionId: '@sessionId', id: '@id'}, {
                'update': {method: 'PUT'}
            }
        );
    }
})();