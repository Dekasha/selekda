<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $portfolios = Portfolio::all();
            return response()->json($portfolios);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePortfolioRequest $request)
    {
        try {
            $portfolio = Portfolio::create([
                'portfolio_title' => $request->portfolio_title,
                'portfolio_image' => $request->file("portfolio_image")->store('portfolio-images', 'public'),
                'description' => $request->description,
                'author' => $request->author,
            ]);
            return response()->json($portfolio, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Portfolio $portfolio)
    {
        try {
            return response()->json($portfolio);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        try {
            if ($request->hasFile('portfolio_image')) {
                Storage::delete($portfolio->portfolio_image);
            }
            $portfolio->update([
                'portfolio_title' => $request->portfolio_title,
                'portfolio_image' => $request->portfolio_image->store('portfolio-images', 'public'),
                'description' => $request->description,
                'author' => $request->author,
            ]);
            return response()->json($portfolio);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Portfolio $portfolio)
    {
        try {
            $portfolio->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

