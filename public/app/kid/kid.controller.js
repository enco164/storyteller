(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidsController', KidsController);

    KidsController.$inject = ['$rootScope', '$state', '$stateParams','logger', 'Kid','KidResidence','Residence','$uibModal'];
    /* @ngInject */
    function KidsController($rootScope, $state, $stateParams, logger, Kid, KidResidence, Residence, $uibModal) {
        var vm = this;
        $rootScope.pageTitle = 'Kids';

        Residence.query(function (residences) {
            vm.residenceList = residences
        });

        vm.deleteKid = deleteKid;
        vm.editKid = editKid;
        vm.onCreate = onCreate;
        vm.selectKid = selectKid;
        vm.showAddForm = showAddForm;
        vm.addResidence = addResidence;

        activate();

        function activate() {

            if ($stateParams.id) {
                Kid.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentKid = undefined;
            }

            reloadKids();

            function onSuccess(kid) {
                vm.currentKid = kid;
            }

            function onError(error) {
                vm.currentKid = null;
                logger.error(error.data.error.message);
            }

        }

        function selectKid(kid) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: kid.id}, {notify: false});
            vm.currentKid = kid;
            //console.log(kid);
        }

        function reloadKids() {
            Kid.query(function(kids){
                vm.kids = kids;
            });
        }

        function deleteKid(kid) {
            var name = kid.firstName + ' ' + kid.lastName;
            kid.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Kid ' + name + ' deleted!');
                vm.currentKid = undefined;
                reloadKids();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editKid() {
            var modalInstance = instantiateModal(vm.currentKid, "Edit kid");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(kid) {
                reloadKids();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new kid");
            
            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(kid) {
                reloadKids();
                vm.currentKid = kid;
            }

            function onCancelCallback() {

            }
        }

        function showAddForm() {
            vm.showForm = !vm.showForm;
            vm.newKidResidence = vm.newKidResidence || [];
        }

        function addResidence() {
            console.log("Kid id:"+vm.currentKid.id);
            console.log("Residence id:"+vm.currentKid.residenceId);
            //ST TODO proslediti kid_id i residence_id u KidResidence pivot tabelu
        }

        function instantiateModal(kid, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/kid/kidModal.html',
                controller: 'KidModalController',
                controllerAs: 'vm',
                resolve: {
                    kid: kid,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }


    }
})();
