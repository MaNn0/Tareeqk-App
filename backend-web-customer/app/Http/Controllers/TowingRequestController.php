<?php

namespace App\Http\Controllers;

use App\Models\TowingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class TowingRequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->isCustomer()) {
            return TowingRequest::where('customer_id', $user->id)->latest()->get();
        }

        if ($user -> isDriver()) {
            return TowingRequest::where('driver_id', $user->id)->orWhereNull('driver_id')->latest()->get();
        }

        return response()->json(['message' => 'Unquthorized'], 403);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'phone' => 'required|string',
            'location' => 'required|string',
            'note' => 'nullable|string',
        ]);

        if (!Auth::user()->isCustomer()) {
            return response()->json(['message' => 'Only customers can create requests'], 403);
        }
        $validated['customer_id'] = Auth::id();
        $validated['status'] = 'pending';
        $validated['note'] = $validated['note'] ?? 'N/A';
        return Auth::user()->towingRequests()->create($validated);
    }

    public function acceptRequest(TowingRequest $request)
    {
        $user = Auth::user();

        if (!$user->isDriver()) {
            return response()->json(['message' => 'Only drivers can accept requests'], 403);
        }

        $request->update([
            'driver_id' => $user->id,
            'status' => 'accepted'
        ]);

        return response()->json($request);
    }
}
