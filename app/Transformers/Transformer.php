<?php
namespace App\Transformers;
/**
 * Created by PhpStorm.
 * User: enco
 * Date: 26.5.16.
 * Time: 00.44
 */
abstract class Transformer
{
    public function transformCollection(array $items)
    {
        return array_map([$this, 'transform'], $items);
    }
    public abstract function transform($item);
}