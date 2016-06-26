/**
 * Created by enco on 14.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.sessions')
        .controller('SessionsTranscriptsModalController', SessionsTranscriptsModalController);

    SessionsTranscriptsModalController.$inject = ['Session', '$timeout', '$uibModalInstance', 'AnnotationSchemas','SessionTranscript', 'session', 'logger'];

    function SessionsTranscriptsModalController(Session, $timeout, $uibModalInstance, AnnotationSchemas, SessionTranscript, session, logger) {
        var vm = this;
        vm.newTranscript = {};
        vm.ok = onOk;
        vm.cancel = onCancel;
        
        AnnotationSchemas.query(function(annotationSchemas){
           vm.annotationSchemasList = annotationSchemas
        });

        function onOk() {
            console.log(vm.newTranscript);
            if (!vm.newTranscript.title || !vm.newTranscript.annotationSchema) {
                logger.error('All fields are required!');
                return;
            }

            var obj = {title: vm.newTranscript.title, annotationSchemaId: vm.newTranscript.annotationSchema.id};

            SessionTranscript.save({sessionId: session.id}, obj, onSuccess, onError);

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