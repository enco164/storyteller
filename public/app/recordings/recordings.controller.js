/**
 * Created by enco on 8.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsController', RecordingsController);

    RecordingsController.$inject = ['$rootScope', 'AudioRecording', '$state', '$stateParams', '$timeout', 'logger', 'Upload'];
    /* @ngInject */
    function RecordingsController($rootScope, AudioRecording, $state, $stateParams, $timeout, logger, Upload) {
        var vm = this;
        $rootScope.pageTitle = 'Recordings';
        vm.selectRecording = selectRecording;
        vm.selectFile = selectFile;
        vm.deleteRecording = deleteRecording;
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
                logger.info('Recording' + name + 'deleted!');
                vm.currentRecording = undefined;
                reloadRecordings();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        vm.uploadRecording = function() {
            if (vm.file) {
                vm.file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: vm.file}
                });
                console.log("AAAAAAAAA");
                vm.file.upload.then(function (response) {
                    $timeout(function () {
                        vm.recordingToAdd = {};
                        vm.recordingToAdd.media = response.data;
                        vm.recordingToAdd.mediaId = response.data.id;
                        console.log("AAAAAAAAA");
                        console.log(vm.recordingToAdd);
                        AudioRecording.save(vm.recordingToAdd, onSuccess, onError);
                        logger.info('File successfully uploaded!');
                        function onSuccess(){
                            reloadRecordings();
                            logger.info('File successfully uploaded!');
                        }
                        function onError(error) {
                            // logger.error(error.data.error.message);
                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        vm.errorMsg = response.status + ': ' + response.data;
                });

                vm.file={};
                vm.errFile={};
            }
            else {
                logger.info('File not selected!')
            }
        }

    }
})();
