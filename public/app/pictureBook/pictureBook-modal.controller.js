(function() {
    'use strict';

    angular
        .module('app.pictureBook')
        .controller('PictureBookModalController', PictureBookModalController);

    PictureBookModalController.$inject = ['PictureBooks', 'logger', '$uibModalInstance', 'pictureBook', 'modalTitle'];

    function PictureBookModalController(PictureBooks, logger, $uibModalInstance, pictureBook, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.pictureBook = pictureBook;

        function ok(){
            if (vm.pictureBook.id) {
                vm.pictureBook.$update(onSuccess, onError);
            } else {
                var pictureBook = new PictureBooks(vm.pictureBook);
                console.log(pictureBook);
                pictureBook.$save(onSuccess, onError);
            }

            function onSuccess(newPictureBook){
                logger.info('Picture Book ' + newPictureBook.title +' saved');
                vm.pictureBook = undefined;
                $uibModalInstance.close(pictureBook);
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