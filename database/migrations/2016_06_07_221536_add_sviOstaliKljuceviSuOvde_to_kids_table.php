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
            $table->integer('languageMother_id')->length(10)->unsigned()->nullable();
            $table->foreign('languageMother_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageFather_id')->length(10)->unsigned()->nullable();
            $table->foreign('languageFather_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageSchool_id')->length(10)->unsigned()->nullable();
            $table->foreign('languageSchool_id')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageAdditionalSchool_id')->length(10)->unsigned()->nullable();
            $table->foreign('languageAdditionalSchool_id')->references('id')->on('languages')->onDelete('cascade');
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
            $table->dropColumn('languageMother_id');
            $table->dropColumn('languageMother_id');
            $table->dropColumn('languageFather_id');
            $table->dropColumn('languageFather_id');
            $table->dropColumn('languageSchool_id');
            $table->dropColumn('languageSchool_id');
            $table->dropColumn('languageAdditionalSchool_id');
            $table->dropColumn('languageAdditionalSchool_id');
        });
    }
}