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
            $table->integer('annotationSchema_id')->length(10)->unsigned()->nullable();
            $table->foreign('annotationSchema_id')->references('id')->on('annotationSchemas')->onDelete('cascade');
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
            $table->dropColumn('annotationSchema_id');
            $table->dropColumn('annotationSchema_id');
        });
    }
}
