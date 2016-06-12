/**
 * Created by Nikola on 12/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.residence')
        .controller('ResidenceModalController', ResidenceModalController);

    ResidenceModalController.$inject = ['Residence', 'logger', '$uibModalInstance', 'annotSch', 'modalTitle'];

    function ResidenceModalController(Residence, logger, $uibModalInstance, annotSch, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.annotSch = annotSch;

        function ok(){
            if (vm.annotSch.id) {
                vm.annotSch.$update(onSuccess, onError);
            } else {
                var annotSch = new Residence(vm.annotSch);
                console.log(annotSch);
                annotSch.$save(onSuccess, onError);
            }

            function onSuccess(newResidence){
                logger.info('Residence ' + newResidence.City +' saved');
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