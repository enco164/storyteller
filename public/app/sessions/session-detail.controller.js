/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionDetailController', SessionDetailController);

    SessionDetailController.$inject = ['$rootScope', '$state', '$stateParams', 'Session', '$uibModal'];
    /* @ngInject */
    function SessionDetailController($rootScope, $state, $stateParams, Session, $uibModal) {
        var vm = this;
        $rootScope.pageTitle = 'Session';

        console.log($stateParams);

        vm.addTranscript = addTranscript;
        vm.addSceneTranscripts = addSceneTranscripts;
        vm.addAudioRecording = addAudioRecording;


        activate();

        function activate() {
            Session.get({id: $stateParams.id}, function(session) {
                vm.session = session;
                console.log(vm.session);
                $rootScope.pageTitle += ' [' +
                    session.kid.firstName + ' ' +
                    session.kid.lastName + ', ' +
                    session.pictureBook.title + ']';
            });

        }

        function addSceneTranscripts() {
            $state.go('sessions.sceneTranscripts', {id: vm.session.id});
        }

        function addAudioRecording() {
            // ST TODO: prikazati galeriju u modalu > izabrati/uploadovati audio > modal vraca audio > uvezati za sesiju
            // https://github.com/enco164/storyteller/issues/1
            // ST TODO: Ostalo je samo da se sredi izgled u modalu, odnosno da prikaze galeriju
            var $uibModal = instantiateRecordingModal(vm.session);

            $uibModal.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(recording) {
                vm.session.audioRecording = recording;
                vm.session.audioRecordingId = recording.id;
            }

            function onCancelCallback() {

            }


        }

        function addTranscript() {
            // ST TODO: prikazati dijalog za odabir sheme anotacije i upisati title za transkript > uvezati za sesiju
            // https://github.com/enco164/storyteller/issues/2
            var $uibModal = instantiateTranscriptModal(vm.session);

            $uibModal.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(session) {
                console.log(session);
                vm.session = session;
            }

            function onCancelCallback() {

            }
        }

        function instantiateTranscriptModal(session) {
            return $uibModal.open({
                templateUrl: 'app/sessions/sessions-transcripts-modal.html',
                controller: 'SessionsTranscriptsModalController',
                controllerAs: 'vm',
                resolve: {
                    session : session
                }
            });
        }

        function instantiateRecordingModal(session) {
            return $uibModal.open({
                templateUrl: 'app/sessions/sessions-recordings-modal.html',
                controller: 'SessionsRecordingsModalController',
                controllerAs: 'vm',
                resolve: {
                    session : session
                }
            });
        }
    }
})();
