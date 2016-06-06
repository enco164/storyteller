/**
 * Created by milan on 6.6.16..
 */
(function() {
    'use strict';

    angular
        .module('app.kid')
        .controller('KidDetailsController', KidDetailsController);

    KidDetailsController.$inject = ['$stateParams', 'logger', 'Kid'];
    /* @ngInject */
    function KidDetailsController($stateParams, logger, Kid) {
        var vm = this;
        vm.title = 'Kid details';

        vm.deleteKid = deleteKid;
        vm.onCreate = onCreate;

        vm.kidId=$stateParams.kidId;

        activate();

        function activate() {
            logger.info('Activated Kid Details View');

            //OVO PUCA
            // Kid.get({id: vm.kidId}, function(){
            //    console.log(entry);
            // });

            Kid.query(function(kids){
                vm.kids = kids;
                console.log();
            });
            console.log('Prosledjen id je: ' + vm.kidId);
        }



        function deleteKid(kid) {
            var name = kid.firstName + ' ' + kid.lastName;
            kid.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Kid ' + name + ' deleted!');
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function onCreate(){

            var modalInstance = $uibModal.open({
                templateUrl: 'app/kid/newKidModal.html',
                controller: 'NewKidController',
                controllerAs: 'vm'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                logger.info('Modal dismissed at: ' + new Date());
            });

        }
    }
})();
