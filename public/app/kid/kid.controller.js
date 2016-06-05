(function() {
  'use strict';

  angular
      .module('app.kid')
      .controller('KidController', KidController);

  KidController.$inject = ['logger', 'Kid', '$uibModal'];
  /* @ngInject */
  function KidController(logger, Kid, $uibModal) {
    var vm = this;
    vm.title = 'Kid';

    vm.delete = deleteKid;
    vm.onCreate = onCreate;

    activate();

    function activate() {
      logger.info('Activated Kid View');

      Kid.query(function(kids){
        vm.kids = kids;
      });
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
      console.log('onCreate');

      var modalInstance = $uibModal.open({
        templateUrl: 'app/kid/newKidModal.html',
        controller: 'NewKidController',
        controllerAs: 'vm'
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }
  }
})();
