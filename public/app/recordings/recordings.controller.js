/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsController', RecordingsController);

    RecordingsController.$inject = ['$rootScope', 'AudioRecording', '$state', '$stateParams', '$timeout', 'logger'];
    /* @ngInject */
    function RecordingsController($rootScope, AudioRecording, $state, $stateParams, $timeout, logger) {
        var vm = this;
        $rootScope.pageTitle = 'Recordings';
        vm.selectRecording = selectRecording;

        activate();

        function activate() {

            if ($stateParams.id) {
                AudioRecording.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentRecording = undefined;
            }

            reloadRecordings();

            function onSuccess(recording) {
                vm.currentRecording = recording;
            }

            function onError(error) {
                vm.currentRecording = null;
                logger.error(error.data.error.message);
            }

        }

        function reloadRecordings() {
            AudioRecording.query(function(recordings){
                vm.recordings = recordings;
            });
        }

        function selectRecording(recording) {
            $state.go($state.current, {id: recording.id}, {notify: false});
            vm.currentRecording = recording;
            $timeout(function () {
                var audio = document.getElementById('audio');
                if(!!audio)
                    audio.load();
            });

            console.log(vm.currentRecording);
        }

    }
})();
