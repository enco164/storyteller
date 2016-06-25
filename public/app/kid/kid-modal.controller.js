/**
 * Created by enco on 4.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidModalController', KidModalController);

    KidModalController.$inject = ['Kid', 'logger', '$uibModalInstance', 'kid', 'modalTitle', 'Language','Residence', 'KidResidence'];

    function KidModalController(Kid, logger, $uibModalInstance, kid, modalTitle, Language, Residence, KidResidence) {
        var vm = this;

        vm.modalTitle = modalTitle;
        Language.query(function (languages) {
            vm.languageList = languages
        });

        Residence.query(function (residences) {
            vm.residenceList = residences
        });

        vm.addKid = addKid;
        vm.addKidAndStayOpen = addKidAndStayOpen;
        vm.cancel = cancel;
        vm.kid = kid;
        vm.showAddOption = false;
        vm.showAddForm = showAddForm;
        vm.addResidence = addResidence;
        vm.hideAddForm = hideAddForm;
        vm.removeResidence = removeResidence;

        function addKid(){
            if (vm.kid.id) {
                Kid.update(vm.kid, onSuccess, onError);
            } else {
                var kid = new Kid(vm.kid);

                kid.$save(onSuccess, onError);
            }

            function onSuccess(newKid){
                logger.info('Kid ' + newKid.firstName + ' ' + newKid.lastName + ' saved');
                vm.kid = undefined;
                $uibModalInstance.close(newKid);
            }

            function onError(error){
                logger.error(error.data.error.message);
            }
        }

        function addKidAndStayOpen() {
            var kid = new Kid(vm.kid);
            kid.$save(onSuccess, onError);
            vm.showAddOption = true;
            vm.showForm = true;


            function onSuccess(newKid){
                logger.info('Kid ' + newKid.firstName + ' ' + newKid.lastName + ' saved');
                vm.kid=newKid;
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
            vm.showCreateForm = false;
            vm.newResidence = undefined;
        }

        function hideAddForm() {
            vm.showForm = false;
            vm.showCreateForm = false;
            vm.newResidence = undefined;
        }

        function addResidence() {
            KidResidence.save({kidId: vm.kid.id}, vm.newResidence, onSuccess);

            function onSuccess(newKid){
                logger.info('Added residence to: ' + newKid.firstName + ' ' + newKid.lastName);
                vm.kid = newKid;
                vm.showForm = false;
                vm.newResidence = {};
            }
        }

        function removeResidence($residenceId) {

            KidResidence.delete({kidId: vm.kid.id, residenceId: $residenceId}, onSuccess);

            function onSuccess(newKid){
                logger.info('Removed residence from: ' + newKid.firstName + ' ' + newKid.lastName);
                vm.kid = newKid;
                //console.log(vm.kid);
            }

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
            maxDate: new Date(2100, 1, 1),
            minDate: new Date(1990, 1, 1),
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