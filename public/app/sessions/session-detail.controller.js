/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionDetailController', SessionDetailController);

    SessionDetailController.$inject = ['$rootScope', '$state', '$stateParams', 'Session'];
    /* @ngInject */
    function SessionDetailController($rootScope, $state, $stateParams, Session) {
        var vm = this;
        $rootScope.pageTitle = 'Session';

        vm.addTranscript = addTranscript;
        vm.addSceneTranscripts = addSceneTranscripts;
        vm.addAudioRecording = addAudioRecording;

        activate();

        function activate() {
            Session.get({id: $stateParams.id}, function(session) {
                vm.session = session;
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
        }

        function addTranscript() {
            // ST TODO: prikazati dijalog za odabir sheme anotacije i upisati title za transkript > uvezati za sesiju
            // https://github.com/enco164/storyteller/issues/2
        }
    }
})();
