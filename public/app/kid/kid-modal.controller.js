/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidModalController', KidModalController);

    KidModalController.$inject = ['Kid', 'logger', '$uibModalInstance', 'kid', 'modalTitle', 'Language','Residence'];

    function KidModalController(Kid, logger, $uibModalInstance, kid, modalTitle, Language, Residence) {
        var vm = this;

        vm.modalTitle = modalTitle;
        Language.query(function (languages) {
            vm.languageList = languages
        });

        Residence.query(function (residences) {
            vm.residenceList = residences
        });

        vm.ok = ok;
        vm.cancel = cancel;
        vm.kid = kid;
        vm.showAddForm = showAddForm;
        vm.addResidence = addResidence;

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

        function showAddForm() {
            vm.showForm = !vm.showForm;
            vm.newKidResidence = vm.newKidResidence || [];
        }

        function addResidence() {
            console.log("Residence id:"+vm.kid.residenceId);
            //ST TODO proslediti residence_id u KidResidence pivot tabelu
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
    };
})();