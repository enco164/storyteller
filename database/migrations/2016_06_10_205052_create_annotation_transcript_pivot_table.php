<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnnotationTranscriptPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annotations_transcripts', function (Blueprint $table) {
            $table->integer('annotation_id')->unsigned()->index();
            $table->foreign('annotation_id')->references('id')->on('annotations')->onDelete('cascade');
            $table->integer('sceneTranscript_id')->unsigned()->index();
            $table->foreign('sceneTranscript_id')->references('id')->on('sceneTranscripts')->onDelete('cascade');
            $table->primary(['annotation_id', 'sceneTranscript_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('annotations_transcripts');
    }
}
