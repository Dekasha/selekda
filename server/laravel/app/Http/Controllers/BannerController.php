<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $banners = Banner::all();
            return response()->json($banners);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    {
        try {
            $banner = Banner::create(
                [
                    'banner_title' => $request->banner_title,
                    'banner_image' => $request->banner_image->store('banner-images', 'public'),
                    'banner_description' => $request->banner_description,
                    'status' => $request->status
                ]
            );
            return response()->json($banner, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        try {
            return response()->json($banner);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, Banner $banner)
    {
        try {
            if ($request->hasFile('banner_image')) {
                Storage::delete($banner->banner_image);
            }
            $banner->update(
                [
                    'banner_title' => $request->banner_title,
                    'banner_image' => $request->file('banner_image')->store('banner-images', 'public'),
                    'banner_description' => $request->banner_description,
                    'status' => $request->status
                ]
            );
            return response()->json($banner);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        try {
            $banner->delete();
            Storage::delete($banner->banner_image);
            return response()->json('banner deleted', 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
