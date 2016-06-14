<?php
namespace App\Transformers;
use App\Language;
/**
 * Created by PhpStorm.
 * User: Nikola
 * Date: 13/6/2016
 * Time: 7:29 PM
 */
class LanguageTransformer extends Transformer
{

    /**
     * @param Language $language
     * @return array
     */
    public function transform($language)
    {
        return [
            'language_name' => $language['language_name']
        ];
    }
}