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
        Schema::create('sceneTrascripts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('transcriptFK')->length(10)->unsigned();
            $table->foreign('transcriptFK')->references('id')->on('transcripts')->onDelete('cascade');
            $table->integer('sceneFK')->length(10)->unsigned()->nullable();
            $table->foreign('sceneFK')->references('id')->on('scenes')->onDelete('cascade');
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
        Schema::drop('sceneTrascripts');
    }
}
