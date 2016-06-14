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
            $table->integer('annotation_schema_id')->length(10)->unsigned()->nullable();
            $table->foreign('annotation_schema_id')->references('id')->on('annotation_schemas')->onDelete('cascade');
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
            $table->dropColumn('annotation_schema_id');
            $table->dropColumn('annotation_schema_id');
        });
    }
}
