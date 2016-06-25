/**
 * Created by milan on 21.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsRecordingsModalController', SessionsRecordingsModalController);

    SessionsRecordingsModalController.$inject = ['SessionRecording', '$timeout', '$uibModalInstance', 'AudioRecording', 'session', 'Upload', 'logger'];

    function SessionsRecordingsModalController(SessionRecording, $timeout, $uibModalInstance, AudioRecording, session, Upload, logger) {
        var vm = this;
        vm.recordingToAdd = {};
        vm.ok = onOk;
        vm.cancel = onCancel;
        vm.selectRecording = selectRecording;
        vm.selectFile = selectFile;

        AudioRecording.query(function(recordings){
            vm.recordingsList = recordings;
            //Ovo ispod se koristi samo za update mdl komponenti
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });
        });

        function onOk() {
            if (!vm.recordingToAdd) {
                vm.error = 'Audio Recording not chosen!';
                $timeout(function(){
                    vm.error = null;
                },5000);
                return;
            }
            SessionRecording.save({sessionId: session.id}, vm.recordingToAdd, onSuccess, onError);

            function onSuccess(recording){
                $uibModalInstance.close(recording);
            }
            function onError(error) {
                // logger.error(error.data.error.message);
            }

        }

        function onCancel(){
            $uibModalInstance.dismiss('cancel');
        }

        function selectRecording(recording) {
            vm.recordingToAdd = recording;
            console.log(vm.recordingToAdd);
        }

        function selectFile(file, errFiles)
        {
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
        }

        vm.uploadRecording = function() {
            if (vm.file) {
                vm.file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: vm.file}
                });

                vm.file.upload.then(function (response) {
                    $timeout(function () {
                        vm.recordingToAdd.media = response.data;
                        vm.recordingToAdd.mediaId = response.data.id;
                        console.log(vm.recordingToAdd);
                        SessionRecording.save({sessionId: session.id}, vm.recordingToAdd, onSuccess, onError);
                        logger.info('File successfully uploaded!');
                        function onSuccess(recording){
                            $uibModalInstance.close(recording);
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