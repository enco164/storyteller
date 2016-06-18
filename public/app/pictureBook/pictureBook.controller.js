(function() {
    'use strict';

    angular
        .module('app.pictureBook')
        .controller('PictureBookController', PictureBookController);

    PictureBookController.$inject = ['$rootScope','$state', '$stateParams','logger', 'PictureBook', 'PictureBookScene', '$uibModal'];
    /* @ngInject */
    function PictureBookController($rootScope, $state, $stateParams, logger, PictureBook, PictureBookScene, $uibModal) {
        var vm = this;
        $rootScope.pageTitle = 'Picture Books';
        vm.showForm = false;

        vm.deletePictureBook = deletePictureBook;
        vm.editPictureBook = editPictureBook;
        vm.onCreate = onCreate;
        vm.selectPictureBook = selectPictureBook;
        vm.showAddForm = showAddForm;
        vm.addScene = addScene;

        activate();

        function activate() {

            if ($stateParams.id) {
                PictureBook.get({id: $stateParams.id}, onSuccess, onError);
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
            PictureBook.query(function(pictureBooks){
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
        
        function showAddForm() {
            vm.showForm = !vm.showForm;
            vm.newScene = vm.newScene || [];
        }

        function addScene() {

            logger.info("Nije zavrseno");

            //ST TODO: Ovaj deo nisam uspeo da namestim
            // vm.newScene.push({"title": vm.tmp.title, "sceneNumber": vm.tmp.sceneNumber, "pictureBookId": vm.currentPictureBook.id});
            //ST TODO: Ovaj red ispod ne valja
            // PictureBookScene.save({pictureBookId: vm.currentPictureBook.id}, vm.newScene, onSuccess);
            //
            // function onSuccess(newPictureBook){
            //     logger.info('Picture Book ' + newPictureBook.title +' updated, scene added');
            //     vm.pictureBook = undefined;
            // }
            //
            // function onError(error){
            //     logger.error(error.data.error.message);
            // }
            
        }


    }
})();
