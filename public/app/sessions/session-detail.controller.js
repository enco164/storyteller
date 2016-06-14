/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionDetailController', SessionDetailController);

    SessionDetailController.$inject = ['$state', '$stateParams', 'Session'];
    /* @ngInject */
    function SessionDetailController($state, $stateParams, Session) {
        var vm = this;
        vm.title = 'Session';

        vm.addTranscript = addTranscript;
        vm.addSceneTranscripts = addSceneTranscripts;
        vm.addAudioRecording = addAudioRecording;

        activate();

        function activate() {
            Session.get({id: $stateParams.id}, function(session) {
                vm.session = session;
                vm.title += ' [' +
                    session.kid.firstName + ' ' +
                    session.kid.lastName + ', ' +
                    session.pictureBook.title + ']';
            });
        }

        function addSceneTranscripts() {
            $state.go('add-scene-transcripts');
        }

        function addAudioRecording() {
            // TODO: prikazati galeriju u modalu > izabrati/uploadovati audio > modal vraca audio > uvezati za sesiju
        }

        function addTranscript() {
            // TODO: prikazati dijalog za odabir sheme anotacije i upisati title za transkript > uvezati za sesiju
        }
    }
})();
