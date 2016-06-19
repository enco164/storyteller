<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SredjivanjeAudioISceneTabela extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scenes', function (Blueprint $table) {
            $table->dropColumn('scene_URL');

            $table->integer('media_id')->length(10)->unsigned()->nullable();
            $table->foreign('media_id')->references('id')->on('media')->onDelete('cascade');
        });


        Schema::table('audio_recordings', function (Blueprint $table) {
            $table->dropColumn('audio_URL');

            $table->integer('media_id')->length(10)->unsigned()->nullable();
            $table->foreign('media_id')->references('id')->on('media')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('scenes', function (Blueprint $table) {
            $table->string('scene_URL');
            $table->dropColumn('media_id');
            $table->dropColumn('media_id');
        });

        Schema::table('audio_recordings', function (Blueprint $table) {
            $table->string('audio_URL');
            $table->dropColumn('media_id');
            $table->dropColumn('media_id');
        });
    }
}
