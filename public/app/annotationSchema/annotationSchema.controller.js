(function() {
    'use strict';

    angular
        .module('app.annotationSchema')
        .controller('AnnotationSchemaController', AnnotationSchemaController);

    AnnotationSchemaController.$inject = ['$state', '$stateParams','logger', 'AnnotationSchemas', '$uibModal'];
    /* @ngInject */
    function AnnotationSchemaController($state, $stateParams, logger, AnnotationSchemas, $uibModal) {
        var vm = this;
        vm.title = 'Annotation Schemas';

        vm.deleteSchema = deleteSchema;
        vm.editSchema = editSchema;
        vm.onCreate = onCreate;
        vm.selectSchema = selectSchema;

        activate();

        function activate() {

            if ($stateParams.id) {
                AnnotationSchemas.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentSchema = undefined;
            }

            reloadSchemas();

            function onSuccess(annotSch) {
                vm.currentSchema = annotSch;
            }

            function onError(error) {
                vm.currentSchema = null;
                logger.error(error.data.error.message);
            }

        }

        function selectSchema(annotSch) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: annotSch.id}, {notify: false});
            vm.currentSchema = annotSch;
        }

        function reloadSchemas() {
            AnnotationSchemas.query(function(schemas){
                vm.schemas = schemas;
            });
        }

        function deleteSchema(annotSch) {
            var name = annotSch.title;
            annotSch.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Schema ' + name + ' deleted!');
                vm.currentSchema = undefined;
                reloadSchemas();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editSchema() {
            var modalInstance = instantiateModal(vm.currentSchema, "Edit schema");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(annotSch) {
                reloadSchemas();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new schema");
            
            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(annotSch) {
                reloadSchemas();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(annotSch, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/annotationSchema/schemaModal.html',
                controller: 'SchemaModalController',
                controllerAs: 'vm',
                resolve: {
                    annotSch: annotSch,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }


    }
})();
