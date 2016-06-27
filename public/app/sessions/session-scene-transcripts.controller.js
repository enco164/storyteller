/**
 * Created by enco on 15.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionSceneTranscriptsController', SessionSceneTranscriptsController);

    SessionSceneTranscriptsController.$inject = ['$stateParams', 'SessionSceneTranscript', 'logger', 'Session', '$timeout', '$state'];
    /* @ngInject */
    function SessionSceneTranscriptsController($stateParams, SessionSceneTranscript, logger, Session, $timeout, $state) {
        var vm = this;
        SessionSceneTranscript.query({sessionId: $stateParams.id}, function(transcripts) {
            vm.sceneTranscripts = transcripts;
        });
        vm.save = save;

        activate();

        function activate() {
            $timeout(function () {
                var audio = document.getElementById('audio');
                if(!!audio) {
                    audio.load();
                }
            });
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
            Session.get({id: $stateParams.id}, function (session) {
                vm.session = session;
            })
        }

        function save() {
            var i = 0;
            angular.forEach(vm.sceneTranscripts, function(sceneTranscript) {
                sceneTranscript.$update(function() {
                    i++;
                    if (i === vm.sceneTranscripts.length) {
                        logger.info('Transcript saved');
                        $state.go($state.current, {}, {reload: true});
                    }
                });
            });
        }
    }
})();
