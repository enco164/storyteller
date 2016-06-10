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
            $table->integer('transcript_id')->unsigned()->index();
            $table->foreign('transcript_id')->references('id')->on('transcripts')->onDelete('cascade');
            $table->primary(['annotation_id', 'transcript_id']);
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
