<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSviOstaliKljuceviSuOvdeToKidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('kids', function (Blueprint $table) {
            $table->integer('language_mother_id')->length(10)->unsigned()->nullable();
            $table->foreign('language_mother_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('language_father_id')->length(10)->unsigned()->nullable();
            $table->foreign('language_father_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('language_school_id')->length(10)->unsigned()->nullable();
            $table->foreign('language_school_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('language_additional_school_id')->length(10)->unsigned()->nullable();
            $table->foreign('language_additional_school_id')->references('id')->on('languages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('kids', function (Blueprint $table) {
            $table->dropColumn('language_mother_id');
            $table->dropColumn('language_mother_id');
            $table->dropColumn('language_father_id');
            $table->dropColumn('language_father_id');
            $table->dropColumn('language_school_id');
            $table->dropColumn('language_school_id');
            $table->dropColumn('language_additional_school_id');
            $table->dropColumn('language_additional_school_id');
        });
    }
}