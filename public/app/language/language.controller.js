/**
 * Created by Nikola on 13/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.language')
        .controller('LanguageController', LanguageController);

    LanguageController.$inject = ['$state', '$stateParams','logger', 'Language', '$uibModal'];
    /* @ngInject */
    function LanguageController($state, $stateParams, logger, Language, $uibModal) {
        var vm = this;
        vm.title = 'Language';

        vm.deleteLanguage = deleteLanguage;
        vm.editLanguage = editLanguage;
        vm.onCreate = onCreate;
        vm.selectLanguage = selectLanguage;

        activate();

        function activate() {

            if ($stateParams.id) {
                Language.get({id: $stateParams.id}, onSuccess, onError);
            } else {
                vm.currentLanguage = undefined;
            }

            reloadLanguages();

            function onSuccess(language) {
                vm.currentLanguage = language;
            }

            function onError(error) {
                vm.currentLanguage = null;
                logger.error(error.data.error.message);
            }

        }

        function selectLanguage(language) {
            //notify:false je da ne reloaduje stranu
            $state.go($state.current, {id: language.id}, {notify: false});
            vm.currentLanguage = language;
        }

        function reloadLanguages() {
            Language.query(function(languages){
                vm.languages = languages;
            });
        }

        function deleteLanguage(language) {
            var name = language.language_name;
            language.$delete(onSuccess, onError);

            function onSuccess() {
                logger.info('Language ' + name + ' deleted!');
                vm.currentLanguage = undefined;
                reloadLanguages();
            }

            function onError(error) {
                logger.error(error.message);
            }
        }

        function editLanguage() {
            var modalInstance = instantiateModal(vm.currentLanguage, "Edit language");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(language) {
                reloadLanguages();
            }

            function onCancelCallback() {

            }
        }

        function onCreate(){
            var modalInstance = instantiateModal(undefined, "Create new language");

            modalInstance.result.then(onOkCallback, onCancelCallback);

            function onOkCallback(language) {
                reloadLanguages();
            }

            function onCancelCallback() {

            }
        }

        function instantiateModal(language, $modalTitle) {
            return $uibModal.open({
                templateUrl: 'app/language/languageModal.html',
                controller: 'LanguageModalController',
                controllerAs: 'vm',
                resolve: {
                    language: language,
                    modalTitle: function () {
                        return $modalTitle;
                    }
                }
            });
        }


    }
})();
