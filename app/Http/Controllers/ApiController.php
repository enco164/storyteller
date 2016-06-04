<?php
/**
 * Created by IntelliJ IDEA.
 * User: enco
 * Date: 4.6.16.
 * Time: 16.56
 */

namespace App\Http\Controllers;
use App\Http\Requests\Request;

class ApiController extends Controller
{
    /**
     * @var int
     */
    protected $statusCode = 200;

    /**
     * @param string $message
     * @return mixed
     */
    public function respondNotFound($message = 'Not Found')
    {
        return $this->setStatusCode(404)->respondWithError('Lesson not found.');
    }

    /**
     * @param $message
     * @return mixed
     */
    public function respondWithError($message)
    {
        return $this->response([
            'error' => [
                'message' => $message,
                'status_code' => $this->getStatusCode()
            ]
        ]);
    }

    /**
     * @param $data
     * @param array $headers
     * @return mixed
     */
    public function respond($data, $headers = [])
    {
        return Response::json($data, $this->getStatusCode(), $headers);
    }

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param mixed $statusCode
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * @return mixed
     */
    public function respondCreated($message)
    {
        return $this->response([
            'message' => $message
        ]);
    }

    /**
     * @return mixed
     */
    public function respondParametersFailed($message)
    {
        return $this->setStatusCode(422)
            ->respondWithError($message);
    }
}