(function() {
    'use strict';
    angular
        .module('app.pictureBook')
        .factory('PictureBookScene', PictureBookScene);

    PictureBookScene.$inject = ['$resource'];

    function PictureBookScene($resource) {
        return $resource('/api/picture_books/:pictureBookId/scenes/:sceneId', {pictureBookId: '@pictureBookId', sceneId: '@sceneId'});
    }
})();