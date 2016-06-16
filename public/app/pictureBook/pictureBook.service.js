(function() {
    'use strict';
    angular
    .module('app.pictureBook')
        .factory('PictureBook', PictureBook)
        .factory('PictureBookScene', PictureBookScene);

    PictureBook.$inject = ['$resource'];

    function PictureBook($resource) {
        return $resource('/api/picture_books/:id', {id: '@id'},
            {
                'update': {method: 'PUT'},
                'destroy': {method: 'DELETE'}
            }
        )
    }

    PictureBookScene.$inject = ['$resource'];

    function PictureBookScene($resource) {
        return $resource('/api/picture_books/:pictureBookId/scenes/:sceneId', {pictureBookId: '@pictureBookId', sceneId: '@sceneId'});
    }
    
    //ST TODO: Enco, je l' ok ovako? Drugi fajl da se obrise...
    
})();