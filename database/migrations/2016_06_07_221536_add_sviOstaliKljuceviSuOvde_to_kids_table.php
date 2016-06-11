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
            $table->integer('languageMotherId')->length(10)->unsigned()->nullable();
            $table->foreign('languageMotherId')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageFatherId')->length(10)->unsigned()->nullable();
            $table->foreign('languageFatherId')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageSchoolId')->length(10)->unsigned()->nullable();
            $table->foreign('languageSchoolId')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageAdditionalSchoolId')->length(10)->unsigned()->nullable();
            $table->foreign('languageAdditionalSchoolId')->references('id')->on('languages')->onDelete('cascade');
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
            $table->dropColumn('languageMotherId');
            $table->dropColumn('languageMotherId');
            $table->dropColumn('languageFatherId');
            $table->dropColumn('languageFatherId');
            $table->dropColumn('languageSchoolId');
            $table->dropColumn('languageSchoolId');
            $table->dropColumn('languageAdditionalSchoolId');
            $table->dropColumn('languageAdditionalSchoolId');
        });
    }
}