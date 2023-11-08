<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comunicado;

class ComunicadoController extends Controller
{
    public function index()
    {
        $comunicados = Comunicado::all();
        return response()->json(['comunicados' => $comunicados]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'descripcion' => 'required',
        ]);

        $comunicado = new Comunicado();
        $comunicado->descripcion = $request->input('descripcion');
        $comunicado->save();

        return response()->json(['message' => 'Comunicado creado con éxito']);
    }

    public function show($id)
    {
        $comunicado = Comunicado::find($id);

        if (!$comunicado) {
            return response()->json(['message' => 'Comunicado no encontrado'], 404);
        }

        return response()->json(['comunicado' => $comunicado]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'descripcion' => 'required',
        ]);

        $comunicado = Comunicado::find($id);

        if (!$comunicado) {
            return response()->json(['message' => 'Comunicado no encontrado'], 404);
        }

        $comunicado->descripcion = $request->input('descripcion');
        $comunicado->save();

        return response()->json(['message' => 'Comunicado actualizado con éxito']);
    }

    public function destroy($id)
    {
        $comunicado = Comunicado::find($id);

        if (!$comunicado) {
            return response()->json(['message' => 'Comunicado no encontrado'], 404);
        }

        $comunicado->delete();

        return response()->json(['message' => 'Comunicado eliminado con éxito']);
    }
}
