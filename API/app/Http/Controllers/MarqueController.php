<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;

use App\Models\marque;

class MarqueController extends Controller
{
    // READ - GET ALL
    public function getAll(){
        $marque = Marque::all();
        return ApiResponse::success('Liste des marques récupérée', $marque);
    }

    // READ - GET ID
      public function getById(int $id)
    {
        $marque = Marque::find($id);
        if (!$marque) {
            return ApiResponse::error('Marque non trouvée', null, 404);
        }
        return ApiResponse::success('Marque trouvée', $marque);
    }

    // CREATE - POST
     public function create(Request $request)
    {
        $marque = Marque::create($request->all());
        return ApiResponse::success('Marque créée avec succès', $marque, 201);
    }

    // UPDATE - PUT
     public function update(Request $request, int $id)
    {
        $marque = Marque::find($id);
        if (!$marque) {
            return ApiResponse::error('Marque non trouvée', null, 404);
        }
        $marque->update($request->all());
        return ApiResponse::success('Marque mise à jour', $marque, 202);
    }
    
    // DELETE
     public function delete(int $id)
    {
        $marque = Marque::find($id);
        if (!$marque) {
            return ApiResponse::error('Marque non trouvée', null, 404);
        }
        $marque->delete();
        return ApiResponse::success('Marque supprimée', null, 204);
    }
}