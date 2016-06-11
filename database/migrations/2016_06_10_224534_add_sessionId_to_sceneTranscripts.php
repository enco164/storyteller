<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSessionIdToSceneTranscripts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('sceneTranscripts', function (Blueprint $table) {
            $table->integer('sessionId')->length(10)->unsigned()->nullable();
            $table->foreign('sessionId')->references('id')->on('sessions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sceneTranscripts', function (Blueprint $table) {
            $table->dropColumn('sessionId');
            $table->dropColumn('sessionId');
        });
    }
}
