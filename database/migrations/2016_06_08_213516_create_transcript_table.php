<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTranscriptTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transcript', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('kidFK')->length(10)->unsigned();
            $table->foreign('kidFK')->references('id')->on('kids')->onDelete('cascade');
            $table->integer('userFK')->length(10)->unsigned();
            $table->foreign('userFK')->references('id')->on('users')->onDelete('cascade');
            $table->integer('pictureBookFK')->length(10)->unsigned()->nullable();
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
        Schema::drop('transcript');
    }
}
