<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePictureBookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('picture_books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('authors');
            $table->string('publisher');
            $table->string('year_of_publishing');
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
        Schema::drop('picture_books');
    }
}
