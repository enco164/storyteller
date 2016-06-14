/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidModalController', KidModalController);

    KidModalController.$inject = ['Kid', 'logger', '$uibModalInstance', 'kid', 'modalTitle', 'Language'];

    function KidModalController(Kid, logger, $uibModalInstance, kid, modalTitle, Language) {
        var vm = this;

        vm.modalTitle = modalTitle;
        Language.query(function (languages) {
            vm.languageList = languages
        });

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
                logger.info('Kid ' + newKid.firstName + ' ' + newKid.lastName + ' saved');
                vm.kid = undefined;
                $uibModalInstance.close(kid);
            }

            function onError(error){
                logger.error(error.data.error.message);
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function openDatePicker() {
            vm.popup1 = true;
        }

        vm.openDatePicker = openDatePicker;

        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            return false;
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
    }
})();