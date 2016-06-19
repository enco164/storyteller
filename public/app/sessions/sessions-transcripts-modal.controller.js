/**
 * Created by enco on 14.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsTranscriptsModalController', SessionsTranscriptsModalController);

    SessionsTranscriptsModalController.$inject = ['Session', '$timeout', '$uibModalInstance', 'AnnotationSchemas','SessionTranscript', 'session'];

    function SessionsTranscriptsModalController(Session, $timeout, $uibModalInstance, AnnotationSchemas, SessionTranscript, session) {
        var vm = this;
        vm.newTranscript = {};
        vm.ok = onOk;
        vm.cancel = onCancel;
        
        AnnotationSchemas.query(function(annotationSchemas){
           vm.annotationSchemasList = annotationSchemas
        });

        function onOk() {
            if (!vm.newTranscript.title || !vm.newTranscript.annotationSchemaId) {
                vm.error = 'All fields are required!';
                $timeout(function(){
                    vm.error = null;
                },5000);
                return;
            }
            SessionTranscript.save({sessionId: session.id}, vm.newTranscript, onSuccess, onError);

            function onSuccess(session){
                $uibModalInstance.close(session);
            }
            function onError(error) {
                logger.error(error.data.error.message);
            }

        }
        
        function onCancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }
})();