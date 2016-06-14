(function() {
    'use strict';

    angular
        .module('app.pictureBook')
        .controller('PictureBookController', PictureBookController);

    PictureBookController.$inject = ['$state', '$stateParams','logger', 'PictureBooks', '$uibModal'];
    /* @ngInject */
    function PictureBookController($state, $stateParams, logger, PictureBooks, $uibModal) {
        var vm = this;
        vm.title = 'Picture Books';

        vm.deletePictureBook = deletePictureBook;
        vm.editPictureBook = editPictureBook;
        vm.onCreate = onCreate;
        vm.selectPictureBook = selectPictureBook;

        activate();

        function activate() {

            if ($stateParams.id) {
                PictureBooks.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentPictureBook = undefined;
            }

            reloadPictureBooks();

            function onSuccess(pictureBook) {
                vm.currentPictureBook = pictureBook;
            }

            function onError(error) {
                vm.currentPictureBook = null;
                logger.error(error.data.error.message);
            }

        }

        function selectPictureBook(pictureBook) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: pictureBook.id}, {notify: false});
            vm.currentPictureBook = pictureBook;
        }

        function reloadPictureBooks() {
            PictureBooks.query(function(pictureBooks){
                vm.pictureBooks = pictureBooks;
            });
        }

        function deletePictureBook(pictureBook) {
            var name = pictureBook.title;
            pictureBook.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Picture Book ' + name + ' deleted!');
                vm.currentPictureBook = undefined;
                reloadPictureBooks();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editPictureBook() {
            var modalInstance = instantiateModal(vm.currentPictureBook, "Edit picture book");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(pictureBook) {
                reloadPictureBooks();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new picture book");
            
            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(pictureBook) {
                reloadPictureBooks();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(pictureBook, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/pictureBook/pictureBookModal.html',
                controller: 'PictureBookModalController',
                controllerAs: 'vm',
                resolve: {
                    pictureBook: pictureBook,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }


    }
})();
