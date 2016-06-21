/**
 * Created by milan on 21.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsRecordingsModalController', SessionsRecordingsModalController);

    SessionsRecordingsModalController.$inject = ['SessionRecording', '$timeout', '$uibModalInstance', 'AudioRecording', 'session'];

    function SessionsRecordingsModalController(SessionRecording, $timeout, $uibModalInstance, AudioRecording, session) {
        var vm = this;
        vm.recordingToAdd = {};
        vm.ok = onOk;
        vm.cancel = onCancel;

        AudioRecording.query(function(recordings){
            vm.recordingsList = recordings
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
    }
})();