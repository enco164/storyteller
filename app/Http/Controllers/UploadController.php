<?php
namespace App\Http\Controllers;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

/**
 * Created by PhpStorm.
 * User: Nikola
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

        $path = public_path()."/media";

        $fileName = $input->getClientOriginalName();
        $fileName = str_replace(" " , "_" , $fileName);

        //ST TODO: treba srediti da se u putanju dodaju godina i mesec

        while(1)
        {
            if(file_exists($path."/".$fileName))
            {
                $fileNameParts = explode(".", $fileName);
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