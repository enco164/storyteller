<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSessionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userId')->length(10)->unsigned()->nullable();
            $table->foreign('userId')->references('id')->on('users');
            $table->integer('kidId')->length(10)->unsigned()->nullable();
            $table->foreign('kidId')->references('id')->on('kids');
            $table->integer('pictureBookId')->length(10)->unsigned()->nullable();
            $table->foreign('pictureBookId')->references('id')->on('pictureBooks');
            $table->integer('transcriptId')->length(10)->unsigned()->nullable();
            $table->foreign('transcriptId')->references('id')->on('transcripts');
            $table->integer('audioRecordingId')->length(10)->unsigned()->nullable();
            $table->foreign('audioRecordingId')->references('id')->on('audioRecordings');
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
        Schema::drop('sessions');
    }
}
