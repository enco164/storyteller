/**
 * Created by enco on 14.6.16..
 */
(function() {
    'use strict';
    angular
        .module('app.sessions')
        .factory('Session', Session);

    Session.$inject = ['$resource', 'NGAnnotation'];

    function Session($resource, NGAnnotation) {
        return $resource('/api/sessions/:id', {id: '@id'}, {
                'get': {method: 'GET', transformResponse: transformResponseGet},
                'update': {method: 'PUT', transformRequest: transformRequest}
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

        function transformRequest(data) {
            var dataToSend = angular.copy(data);
            angular.forEach(dataToSend.sceneTranscripts, function(st) {
                angular.forEach(st.annotations, function(ann, key, anns) {
                    console.log(ann);
                    var plain = {
                        id: ann.data.id,
                        comment: ann.data.comment,
                        startIndex: ann.startIndex,
                        endIndex: ann.endIndex,
                        transcriptId: ann.data.transcriptId,
                        name: ann.type
                    };

                    anns[key] = plain;
                });
            });
            return angular.toJson(dataToSend);
        }
    }
})();