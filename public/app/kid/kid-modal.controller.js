/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidModalController', KidModalController);

    KidModalController.$inject = ['Kid', 'logger', '$uibModalInstance', 'kid', 'modalTitle'];

    function KidModalController(Kid, logger, $uibModalInstance, kid, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.kid = kid;

        function ok(){
            if (vm.kid.id) {
                vm.kid.$update(onSuccess, onError);
            } else {
                var kid = new Kid(vm.kid);
                kid.$save(onSuccess, onError);
            }

            function onSuccess(newKid){
                vm.kid = undefined;
                logger.info('Kid ' + newKid.firstName + ' ' + newKid.lastName + ' saved');
                $uibModalInstance.close(kid);
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