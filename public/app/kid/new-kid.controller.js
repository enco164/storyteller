/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('NewKidController', NewKidController);

    NewKidController.$inject = ['Kid', 'logger', '$uibModalInstance'];

    function NewKidController(Kid, logger, $uibModalInstance) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;

        function ok(){
            var kid = new Kid(vm.kid);
            kid.$save(function(){
                logger.info('Kid saved');
            }, function(error){
                logger.error('Error');
            });

            vm.kid = undefined;
            // vm.kid.firstName = '';
            // vm.kid.lastName = '';
            // vm.kid.yearOfBirth = '';
            // vm.kid.cityOfBirth = '';
            // vm.kid.gender = '';
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();