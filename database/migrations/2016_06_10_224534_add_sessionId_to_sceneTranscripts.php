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
        Schema::table('scene_transcripts', function (Blueprint $table) {
            $table->integer('session_id')->length(10)->unsigned()->nullable();
            $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scene_transcripts', function (Blueprint $table) {
            $table->dropColumn('session_id');
            $table->dropColumn('session_id');
        });
    }
}
