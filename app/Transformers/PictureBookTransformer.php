<?php
namespace App\Transformers;
use App\AnnotationSchema;

class PictureBookTransformer extends Transformer
{

    /**
     * @param PictureBook $pictureBook
     * @return array
     */
    public function transform($pictureBook)
    {
        return [
            'title' => $pictureBook['title'],
            'authors' => $pictureBook['authors'],
            'publisher' => $pictureBook['publisher'],
            'yearOfPublishing' => $pictureBook['yearOfPublishing']
        ];
    }
}