<?php
namespace App\Http\Controllers;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

/**
 * Created by PhpStorm.
 * User: Darko
 * Date: 14/6/2016
 * Time: 10:27 AM
 */

class UploadController extends ApiController {

    public function index()
    {
        return "index";
    }

    public function store() {
        $input = Input::file('file');

        $currentDate = date("Y/m");
        $path = public_path()."/media/".$currentDate;

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $fileName = $input->getClientOriginalName();
        $fileName = str_replace(" " , "_" , $fileName);

        $fileNameHolder = $fileName;

        while(1)
        {
            if(file_exists($path."/".$fileName))
            {
                $fileNameParts = explode(".", $fileNameHolder);
                $fileNameParts[0] .= "_".rand();
                $fileName = $fileNameParts[0].".".$fileNameParts[1];
            }
            else
            {
                $input->move($path, $fileName);
                break;
            }
        }
        return $path."/".$fileName;
    }

    public function create() {

        echo "wrong route";

    }

}