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
        vm.recordingToAdd = undefined;
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
            // console.log(vm.recordingToAdd);
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
                        vm.recordingToAdd = {};
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

        function openDatePicker() {
            vm.popup1 = true;
        }

        vm.openDatePicker = openDatePicker;

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2100, 1, 1),
            minDate: new Date(1990, 1, 1),
            startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            return false;
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

    }
})();