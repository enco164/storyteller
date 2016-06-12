/**
 * Created by Nikola on 12/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.residence')
        .controller('ResidenceController', ResidenceController);

    ResidenceController.$inject = ['$state', '$stateParams','logger', 'Residence', '$uibModal'];
    /* @ngInject */
    function ResidenceController($state, $stateParams, logger, Residence, $uibModal) {
        var vm = this;
        vm.title = 'Residence';

        vm.deleteResidence = deleteResidence;
        vm.editResidence = editResidence;
        vm.onCreate = onCreate;
        vm.selectResidence = selectResidence;

        activate();

        function activate() {

            if ($stateParams.id) {
                Residence.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentResidence = undefined;
            }

            reloadResidences();

            function onSuccess(annotSch) {
                vm.currentResidence = annotSch;
            }

            function onError(error) {
                vm.currentResidence = null;
                logger.error(error.data.error.message);
            }

        }

        function selectResidence(annotSch) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: annotSch.id}, {notify: false});
            vm.currentResidence = annotSch;
        }

        function reloadResidences() {
            Residence.query(function(residences){
                vm.residences = residences;
            });
        }

        function deleteResidence(annotSch) {
            var name = annotSch.city;
            annotSch.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Residence ' + name + ' deleted!');
                vm.currentResidence = undefined;
                reloadResidences();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editResidence() {
            var modalInstance = instantiateModal(vm.currentResidence, "Edit residence");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(annotSch) {
                reloadResidences();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new residence");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(annotSch) {
                reloadResidences();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(annotSch, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/residence/residenceModal.html',
                controller: 'ResidenceModalController',
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
