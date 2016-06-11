<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSceneTrascriptTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sceneTranscripts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sceneId')->length(10)->unsigned()->nullable();
            $table->foreign('sceneId')->references('id')->on('scenes')->onDelete('cascade');
            $table->string('text');
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
        Schema::drop('sceneTranscripts');
    }
}
