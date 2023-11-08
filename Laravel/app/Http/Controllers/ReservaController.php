<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserva;

class ReservaController extends Controller
{
    public function index(Request $request)
{
    $query = Reserva::query();

    if ($request->has('fecha')) {
        $query->whereDate('fecha_hora', $request->input('fecha'));
    }

    $reservas = $query->get();

    return response()->json(['reservas' => $reservas]);
}


    public function store(Request $request)
{
    // Validar y crear una nueva reserva
    $request->validate([
        'nombre' => 'required|string',
        'fecha_hora' => 'required|date',
        'barbero' => 'required|string',
    ]);

    // Verificar si ya existe una reserva con la misma hora y el mismo barbero
    $existingReserva = Reserva::where([
        'fecha_hora' => $request->input('fecha_hora'),
        'barbero' => $request->input('barbero'),
    ])->first();

    if ($existingReserva) {
        // Devolver un mensaje de error si ya existe una reserva
        return response()->json(['error' => 'Ya existe una reserva para esta hora y este barbero.'], 400);
    }

    $reserva = Reserva::create($request->all());
    return response()->json(['reserva' => $reserva], 201);
}
public function getReservasByBarbero($barbero)
{
    dd('Barbero: ' . $barbero); // Agrega esta línea para depurar
    $reservas = Reserva::where('barbero', $barbero)->get();
    return response()->json(['reservas' => $reservas]);
}



    public function show($id)
    {
        // Obtener una reserva por ID
        $reserva = Reserva::find($id);
        return response()->json(['reserva' => $reserva]);
    }

    public function update(Request $request, $id)
    {
        // Validar y actualizar una reserva por ID
        $request->validate([
            'nombre' => 'required|string',
            'fecha_hora' => 'required|date',
            'barbero' => 'required|string',
        ]);

        $reserva = Reserva::find($id);
        $reserva->update($request->all());
        return response()->json(['reserva' => $reserva]);
    }

    public function destroy($id)
    {
        // Eliminar una reserva por ID
        $reserva = Reserva::find($id);
        $reserva->delete();
        return response()->json(null, 204);
    }
}
