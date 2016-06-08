<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSceneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scene', function (Blueprint $table) {
            $table->increments('id');
            $table->string('sceneURL');
            $table->integer('sceneNumber');
            $table->string('title')->nullable();
            $table->integer('pictureBookFK')->length(10)->unsigned();
            $table->foreign('pictureBookFK')->references('id')->on('pictureBook')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('scene');
    }
}
