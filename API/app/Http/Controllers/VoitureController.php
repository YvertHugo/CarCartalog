<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Models\Voiture;

class VoitureController extends Controller
{
    public function getAll(){
        $voiture = Voiture::all();
        return ApiResponse::success('Liste des marques récupérée', $voiture);
    }

    public function getById(int $id): JsonResponse
    {
        $voiture = Voiture::with('marque')->find($id);

        if (!$voiture) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        $formattedVoiture = [
            'id' => $voiture->id,
            'modele' => $voiture->modele,
            'annee' => $voiture->annee,
            'marque' => $voiture->marque->nom ?? 'Marque inconnue',
        ];

        return response()->json($formattedVoiture, 200);
    }

    public function create(Request $request): JsonResponse
    {
        $voiture = Voiture::create($request->all());
        return response()->json($voiture, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $voiture = Voiture::find($id);
        if (!$voiture) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        $voiture->update($request->all());
        return response()->json($voiture, 202);
    }

    public function delete(int $id): JsonResponse
    {
        $voiture = Voiture::find($id);
        if (!$voiture) {
            return response()->json(['message' => 'Voiture non trouvée'], 404);
        }

        $voiture->delete();
        return response()->json(['message' => 'Voiture supprimée'], 204);
    }
}