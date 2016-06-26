/**
 * Created by enco on 16.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('SessionTranscript', SessionTranscript);

    SessionTranscript.$inject = ['$resource', 'NGAnnotation'];

    function SessionTranscript($resource, NGAnnotation) {
        return $resource('/api/sessions/:sessionId/transcripts/:transcriptId',
            {sessionId: '@sessionId', transcriptId: '@transcriptId'}, {
                'get': {method: 'GET', transformResponse: transformResponseGet},
                'update': {method: 'PUT'}
            }
        );

        function transformResponseGet(data) {
            var object = angular.fromJson(data);

            angular.forEach(object.sceneTranscripts, function(st) {
                angular.forEach(st.annotations, function(ann, key, anns) {
                    var nga = new NGAnnotation();
                    nga.type = ann.name;
                    nga.data = {
                        comment: ann.comment,
                        id: ann.id,
                        transcriptId: ann.transcriptId
                    };
                    nga.startIndex = ann.startIndex;
                    nga.endIndex = ann.endIndex;
                    anns[key] = nga;
                });
            });
            return object;
        }
    }
})();