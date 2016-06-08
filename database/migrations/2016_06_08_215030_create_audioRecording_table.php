<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAudioRecordingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audioRecording', function (Blueprint $table) {
            $table->increments('id');
            $table->date('recordingDate');
            $table->string('audioURL');
            $table->integer('userFK')->length(10)->unsigned();
            $table->foreign('userFK')->references('id')->on('users');
            $table->integer('pictureBookFK')->length(10)->unsigned()->nullable();
            $table->foreign('pictureBookFK')->references('id')->on('pictureBook');
            $table->integer('kidFK')->length(10)->unsigned();
            $table->foreign('kidFK')->references('id')->on('kids');
            $table->integer('transcriptFK')->length(10)->unsigned()->nullable();
            $table->foreign('transcriptFK')->references('id')->on('transcript');
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
        Schema::drop('audioRecording');
    }
}
