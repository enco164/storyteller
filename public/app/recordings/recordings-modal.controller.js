/**
 * Created by soja on 25.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.recordings')
        .controller('RecordingsModalController', RecordingsModalController);

    RecordingsModalController.$inject = ['$timeout', '$uibModalInstance', 'AudioRecording', 'Upload', 'logger'];

    function RecordingsModalController($timeout, $uibModalInstance, AudioRecording, Upload, logger) {
        var vm = this;
        vm.recordingToAdd = undefined;
        vm.cancel = onCancel;
        vm.selectFile = selectFile;
        vm.showRec = true;
        vm.tmpName = "";

        AudioRecording.query(function(recordings){
            vm.recordingsList = recordings;
            //Ovo ispod se koristi samo za update mdl komponenti
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            });
        });

        function onCancel(){
            $uibModalInstance.dismiss('cancel');
        }

        function selectFile(file, errFiles)
        {
            vm.file = file;
            vm.errFile = errFiles && errFiles[0];
        }

        vm.uploadRecording = function() {
            if (vm.file) {
                if(vm.file.name == undefined)
                    vm.file.name = vm.tmpName;
                vm.file.upload = Upload.upload({
                    url: 'api/media',
                    data: {file: vm.file}
                });
                vm.file.upload.then(function (response) {
                    $timeout(function () {
                        vm.recordingToAdd = vm.recordingToAdd || {};
                        vm.recordingToAdd.media = response.data;
                        vm.recordingToAdd.mediaId = response.data.id;
                        vm.recordingToAdd.recordingDate.setTime(vm.recordingToAdd.recordingDate.getTime() + 12*60*60*1000);
                        // console.log(vm.recordingToAdd);
                        AudioRecording.save(vm.recordingToAdd, onSuccess, onError);
                        function onSuccess(recording){
                            $uibModalInstance.close(recording);
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
            minDate: new Date(1950, 1, 1),
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