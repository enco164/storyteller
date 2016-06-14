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

            function onSuccess(residence) {
                vm.currentResidence = residence;
            }

            function onError(error) {
                vm.currentResidence = null;
                logger.error(error.data.error.message);
            }

        }

        function selectResidence(residence) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: residence.id}, {notify: false});
            vm.currentResidence = residence;
        }

        function reloadResidences() {
            Residence.query(function(residences){
                vm.residences = residences;
            });
        }

        function deleteResidence(residence) {
            var name = residence.city;
            residence.$delete(onSuccess, onError);

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

            function onOkCallback(residence) {
                reloadResidences();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new residence");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(residence) {
                reloadResidences();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(residence, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/residence/residenceModal.html',
                controller: 'ResidenceModalController',
                controllerAs: 'vm',
                resolve: {
                    residence: residence,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }


    }
})();
