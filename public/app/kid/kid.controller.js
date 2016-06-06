(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidsController', KidsController);

    KidsController.$inject = ['$state', '$stateParams','logger', 'Kid', '$uibModal'];
    /* @ngInject */
    function KidsController($state, $stateParams, logger, Kid, $uibModal) {
        var vm = this;
        vm.title = 'Kids';

        vm.deleteKid = deleteKid;
        vm.editKid = editKid;
        vm.onCreate = onCreate;
        vm.selectKid = selectKid;

        activate();

        function activate() {
            logger.info('Activated Kid View');

            if ($stateParams.id) {
                Kid.get({id: $stateParams.id}, function (kid) {
                    vm.currentKid = kid;
                });
            } else {
                vm.currentKid = undefined;
            }

            reloadKids();

        }

        function selectKid(kid) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: kid.id}, {notify: false});
            vm.currentKid = kid;
        }

        function reloadKids() {
            Kid.query(function(kids){
                vm.kids = kids;
            });
        }

        function deleteKid(kid) {
            // ST TODO: i ovde je nesto otislo u Honduras, kid je undefined pokusao sam preko vm.currentKid, ali i to nesto ne radi
            // console.log(kid);
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
            }

            function onCancelCallback() {

            }
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
