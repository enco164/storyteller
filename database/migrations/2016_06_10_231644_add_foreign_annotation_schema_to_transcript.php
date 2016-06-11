<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignAnnotationSchemaToTranscript extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transcripts', function (Blueprint $table) {
            $table->integer('annotationSchemaId')->length(10)->unsigned()->nullable();
            $table->foreign('annotationSchemaId')->references('id')->on('annotationSchemas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transcripts', function (Blueprint $table) {
            $table->dropColumn('annotationSchemaId');
            $table->dropColumn('annotationSchemaId');
        });
    }
}
