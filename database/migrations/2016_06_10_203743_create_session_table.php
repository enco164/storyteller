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
            $table->integer('user_id')->length(10)->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('kid_id')->length(10)->unsigned()->nullable();
            $table->foreign('kid_id')->references('id')->on('kids');
            $table->integer('picture_book_id')->length(10)->unsigned()->nullable();
            $table->foreign('picture_book_id')->references('id')->on('picture_books');
            $table->integer('audio_recording_id')->length(10)->unsigned()->nullable();
            $table->foreign('audio_recording_id')->references('id')->on('audio_recordings');
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
