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
        Schema::create('scenes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('scene_URL');
            $table->integer('scene_number');
            $table->string('title')->nullable();
            $table->integer('picture_book_id')->length(10)->unsigned();
            $table->foreign('picture_book_id')->references('id')->on('picture_books')->onDelete('cascade');
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
        Schema::drop('scenes');
    }
}
