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
            $table->integer('languageMotherFK')->length(10)->unsigned()->nullable();
            $table->foreign('languageMotherFK')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageFatherFK')->length(10)->unsigned()->nullable();
            $table->foreign('languageFatherFK')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageSchoolFK')->length(10)->unsigned()->nullable();
            $table->foreign('languageSchoolFK')->references('id')->on('languages')->onDelete('cascade');
            $table->integer('languageAdditionalSchoolFK')->length(10)->unsigned()->nullable();
            $table->foreign('languageAdditionalSchoolFK')->references('id')->on('languages')->onDelete('cascade');
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
            $table->dropColumn('languageMotherFK');
            $table->dropColumn('languageMotherFK');
            $table->dropColumn('languageFatherFK');
            $table->dropColumn('languageFatherFK');
            $table->dropColumn('languageSchoolFK');
            $table->dropColumn('languageSchoolFK');
            $table->dropColumn('languageAdditionalSchoolFK');
            $table->dropColumn('languageAdditionalSchoolFK');
        });
    }
}