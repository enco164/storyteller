<?php
/**
 * Created by PhpStorm.
 * User: milan
 * Date: 20.6.16.
 * Time: 20.16
 */

namespace App\Transformers;
use App\AudioRecording;

class AudioRecordingTransformer extends Transformer
{

    /**
     * @param AudioRecording $recording
     * @return array
     */
    public function transform($recording)
    {
        return [
            'recordingDate' => $recording['recordingDate'],
        ];
    }
}