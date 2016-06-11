<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnnotationScenetranscriptPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annot_sct', function (Blueprint $table) {
            $table->integer('annotation_id')->length(10)->unsigned()->index();
            $table->foreign('annotation_id')->references('id')->on('annotations')->onDelete('cascade');
            $table->integer('scenetranscript_id')->length(10)->unsigned()->index();
            $table->foreign('scenetranscript_id')->references('id')->on('sceneTranscripts')->onDelete('cascade');
            $table->primary(['annotation_id', 'scenetranscript_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('annot_sct');
    }
}
