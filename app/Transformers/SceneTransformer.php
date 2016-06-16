<?php
/**
 * Created by PhpStorm.
 * User: milan
 * Date: 15.6.16.
 * Time: 23.53
 */

namespace App\Transformers;
use App\Scene;

class SceneTransformer extends Transformer
{

    /**
     * @param Scene $scene
     * @return array
     */
    public function transform($scene)
    {
        return [
            'pictureBookId' => $scene['pictureBookId'],
            'sceneURL' => $scene['sceneURl'],
            'sceneNumber' => $scene['sceneNumer'],
            'title' => $scene['title'],
        ];
    }
}