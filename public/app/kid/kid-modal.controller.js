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
            var kid = new Kid(vm.kid);
            kid.$save(function(){
                $uibModalInstance.close(kid);
                vm.kid = undefined;
                logger.info('Kid saved');
            }, function(error){
                logger.error('Error');
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();