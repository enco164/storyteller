/**
 * Created by enco on 15.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionSceneTranscriptsController', SessionSceneTranscriptsController);

    SessionSceneTranscriptsController.$inject = ['$stateParams', 'SessionSceneTranscript', 'logger'];
    /* @ngInject */
    function SessionSceneTranscriptsController($stateParams, SessionSceneTranscript, logger) {
        var vm = this;
        SessionSceneTranscript.query({sessionId: $stateParams.id}, function(transcripts) {
            vm.sceneTranscripts = transcripts;
        });
        vm.save = save;

        activate();

        function activate() {
            vm.editorOptions = [
                ['edit',['undo','redo']],
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link','picture','video','hr']],
                ['help', ['help']]
            ];
        }

        function save() {
            var i = 0;
            angular.forEach(vm.sceneTranscripts, function(sceneTranscript) {
                sceneTranscript.$update(function() {
                    i++;
                    if (i === vm.sceneTranscripts.length) {
                        logger.info('Transcript saved');
                    }
                });
            });
        }
    }
})();
