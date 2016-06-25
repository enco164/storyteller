/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsController', RecordingsController);

    RecordingsController.$inject = ['$rootScope', 'AudioRecording', '$state', '$stateParams', '$timeout', 'logger', 'Upload', '$uibModal'];
    /* @ngInject */
    function RecordingsController($rootScope, AudioRecording, $state, $stateParams, $timeout, logger, Upload, $uibModal ) {
        var vm = this;
        $rootScope.pageTitle = 'Recordings';
        vm.selectRecording = selectRecording;
        vm.selectFile = selectFile;
        vm.deleteRecording = deleteRecording;
        vm.addAudioRecording = addAudioRecording;
        vm.recordingToAdd = undefined;

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

        function selectFile(file, errFiles)
        {
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
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

        function deleteRecording(recording) {
            var name = recording.media.fileName;
            recording.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Recording ' + name + ' deleted!');
                vm.currentRecording = undefined;
                reloadRecordings();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }


        function addAudioRecording() {

            var $uibModal = instantiateRecordingModal(vm.currentRecording);

            $uibModal.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(recording) {
                vm.currentRecording = recording;
            }

            function onCancelCallback() {

            }


        }

        function instantiateRecordingModal(recording) {
            return $uibModal.open({
                templateUrl: 'app/recordings/recordings-modal.html',
                controller: 'RecordingsModalController',
                controllerAs: 'vm',
                resolve: {
                    recording : recording
                }
            });
        }
        

    }
})();
