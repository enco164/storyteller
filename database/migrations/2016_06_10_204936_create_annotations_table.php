<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnnotationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annotations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('comment');
            $table->integer('start_index');
            $table->integer('end_index');
            $table->integer('transcript_id')->length(10)->unsigned()->nullable();
            $table->foreign('transcript_id')->references('id')->on('transcripts')->onDelete('cascade');
            $table->integer('scene_transcript_id')->length(10)->unsigned()->nullable();
            $table->foreign('scene_transcript_id')->references('id')->on('scene_transcripts')->onDelete('cascade');
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
        Schema::drop('annotations');
    }
}
