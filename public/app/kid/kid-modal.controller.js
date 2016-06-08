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
                //TEST
                // vm.kid.languageMotherFK = 1;
                // vm.kid.languageFatherFK = 1;
                // vm.kid.languageSchoolFK = 1;
                // vm.kid.languageAdditionalSchoolFK = 1;
                //

                var kid = new Kid(vm.kid);

                kid.$save(onSuccess, onError);
            }

            function onSuccess(newKid){
                //ST TODO: Enco, proveri ovo dole (zakomentarisano), radilo je, sad ne radi :D
                logger.info('Kid ' + vm.kid.firstName + ' ' + vm.kid.lastName + ' saved');
                vm.kid = undefined;
                // logger.info('Kid ' + newKid.firstName + ' ' + newKid.lastName + ' saved');
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