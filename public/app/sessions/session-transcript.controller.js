/**
 * Created by enco on 22.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionTranscriptController', SessionTranscriptController);

    SessionTranscriptController.$inject = ['$rootScope', '$state', '$stateParams', 'Session', '$uibModal', 'SessionSceneTranscript', 'NGAnnotation'];
    /* @ngInject */
    function SessionTranscriptController($rootScope, $state, $stateParams, Session, $uibModal, SessionSceneTranscript, NGAnnotation) {
        var vm = this;
        $rootScope.pageTitle = 'Session';

        Session.get({id: $stateParams.id}, function(session) {
            vm.session = session;
            console.log(vm.session);
        });

        console.log($stateParams);

        vm.save = save;

        function save() {
            console.log('save');
            vm.session.$update(function(session) {
                $state.go($state.current, {}, {reload: true});
            });
        }

        vm.onAnnotate = function($annotation) {
            $annotation.comment = $annotation.data.comment;
            $annotation.data.transcriptId = $stateParams.transcriptId;
            console && console.log($annotation);
        };
        vm.onAnnotateError = function($ex) {
            if ($ex.message === "NG_ANNOTATE_TEXT_PARTIAL_NODE_SELECTED") {
                return alert("Invalid selection.");
            } else {
                throw $ex;
            }
        };
        vm.onPopupShow = function($el) {
            var firstInput;
            firstInput = $el.find("input, textarea").eq(0).focus();
            return firstInput && firstInput[0].select();
        };

        vm.hasPoints = function(points) {
            var _isNaN;
            _isNaN = Number.isNaN || isNaN;
            return typeof points === "number" && points !== 0 && !_isNaN(points);
        };
        vm.hasComment = function(comment) {
            return typeof comment === "string" && comment.length > 0;
        };
        vm.annotationsAsFlatList = function(annotations) {
            if (annotations == null) {
                annotations = vm.annotations[0];
            }
            if (!annotations.length) {
                return [];
            } else {
                return annotations.map(function(annotation) {
                    var arr;
                    arr = [];
                    if (vm.hasPoints(annotation.data.points) && vm.hasComment(annotation.data.comment)) {
                        arr.push(annotation);
                    }
                    if (annotation.children && annotation.children.length) {
                        arr = arr.concat(vm.annotationsAsFlatList(annotation.children));
                    }
                    return arr;
                }).reduce(function(prev, current) {
                    return prev.concat(current);
                });
            }
        };
        vm.clearPopups = function() {
            return $rootScope.$broadcast("ngAnnotateText.clearPopups");
        };
    }
})();
