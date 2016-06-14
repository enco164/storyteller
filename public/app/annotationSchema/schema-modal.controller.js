(function() {
    'use strict';

    angular
        .module('app.annotationSchema')
        .controller('SchemaModalController', SchemaModalController);

    SchemaModalController.$inject = ['AnnotationSchemas', 'logger', '$uibModalInstance', 'annotSch', 'modalTitle'];

    function SchemaModalController(AnnotationSchemas, logger, $uibModalInstance, annotSch, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.annotSch = annotSch;

        function ok(){
            if (vm.annotSch.id) {
                vm.annotSch.$update(onSuccess, onError);
            } else {
                var annotSch = new AnnotationSchemas(vm.annotSch);
                console.log(annotSch);
                annotSch.$save(onSuccess, onError);
            }

            function onSuccess(newSchema){
                logger.info('Schema ' + newSchema.title +' saved');
                vm.annotSch = undefined;
                $uibModalInstance.close(annotSch);
            }

            function onError(error){
                logger.error(error.data.error.message);
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();