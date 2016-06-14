/**
 * Created by Nikola on 13/6/2016.
 */
(function() {
    'use strict';

    angular
        .module('app.language')
        .controller('LanguageModalController', LanguageModalController);

    LanguageModalController.$inject = ['Language', 'logger', '$uibModalInstance', 'language', 'modalTitle'];

    function LanguageModalController(Language, logger, $uibModalInstance, language, modalTitle) {
        var vm = this;

        vm.modalTitle = modalTitle;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.language = language;

        function ok(){
            if (vm.language.id) {
                vm.language.$update(onSuccess, onError);
            } else {
                var language = new Language(vm.language);
                //console.log(language.languageName);
                language.$save(onSuccess, onError);
            }

            function onSuccess(newLanguage){
                logger.info('Language ' + newLanguage.language_name +' saved');
                vm.language = undefined;
                $uibModalInstance.close(language);
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