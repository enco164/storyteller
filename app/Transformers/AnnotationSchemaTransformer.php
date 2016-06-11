<?php
namespace App\Transformers;
use App\AnnotationSchema;

/**
 * Created by PhpStorm.
 * User: milan
 * Date: 11.6.16.
 * Time: 15.49
 */

class AnnotationSchemaTransformer extends Transformer
{

    /**
     * @param Kid $annotSch
     * @return array
     */
    public function transform($annotSch)
    {
        return [
            'title' => $annotSch['title'],
            'description' => $annotSch['description'],
            'blue' => $annotSch['blue'],
            'green' => $annotSch['green'],
            'red' => $annotSch['red'],
            'aqua' => $annotSch['aqua'],
            'pink' => $annotSch['pink'],
            'yellow' => $annotSch['yellow'],
            'orange' => $annotSch['orange']
        ];
    }
}