<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKidResidencePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kids_residences', function (Blueprint $table) {
            $table->integer('kid_id')->unsigned()->index();
            $table->foreign('kid_id')->references('id')->on('kids')->onDelete('cascade');
            $table->integer('residence_id')->unsigned()->index();
            $table->foreign('residence_id')->references('id')->on('residences')->onDelete('cascade');
            $table->primary(['kid_id', 'residence_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kids_residences');
    }
}
