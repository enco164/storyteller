/**
 * Created by Nikola on 12/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.residence')
        .controller('ResidenceModalController', ResidenceModalController);

    ResidenceModalController.$inject = ['Residence', 'logger', '$uibModalInstance', 'residence', 'modalTitle'];

    function ResidenceModalController(Residence, logger, $uibModalInstance, residence, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.residence = residence;

        function ok(){
            if (vm.residence.id) {
                vm.residence.$update(onSuccess, onError);
            } else {
                var residence = new Residence(vm.residence);
                console.log(residence);
                residence.$save(onSuccess, onError);
            }

            function onSuccess(newResidence){
                logger.info('Residence ' + newResidence.City +' saved');
                vm.annotSch = undefined;
                $uibModalInstance.close(residence);
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