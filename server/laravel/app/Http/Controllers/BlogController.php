<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $blogs = Blog::all();
            return response()->json($blogs);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        try {
            $blog = Blog::create([
                'blog_image' => $request->file('blog_image')->store('blog', 'public'),
                'blog_title' => $request->blog_title,
                'description' => $request->description,
                'author' => $request->author,
                'tags' => json_encode($request->tags)
            ]);
            return response()->json($blog, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        try {
            return response()->json($blog);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        try {
            if ($request->hasFile('blog_image')) {
                Storage::delete($blog->blog_image);
            }
            $blog->update([
                'blog_image' => $request->file('blog_image')->store('blog', 'public'),
                'blog_title' => $request->blog_title,
                'description' => $request->description,
                'author' => $request->author,
                'tags' => json_encode($request->tags)
            ]);
            return response()->json($blog);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        try {
            $blog->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
