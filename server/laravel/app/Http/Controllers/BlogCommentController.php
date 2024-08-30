<?php

namespace App\Http\Controllers;

use App\Models\BlogComment;
use App\Http\Requests\StoreBlogCommentRequest;
use App\Http\Requests\UpdateBlogCommentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $blogComments = BlogComment::all();
            return response()->json($blogComments);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogCommentRequest $request)
    {
        try {
            $blogComment = BlogComment::create([
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'subject' => $request->subject,
                'website' => $request->website,
                'comment' => $request->comment,
            ]);
            return response()->json($blogComment, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogComment $blogComment)
    {
        try {
            return response()->json($blogComment);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogCommentRequest $request, BlogComment $blogComment)
    {
        try {
            $blogComment->update([
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
                'subject' => $request->subject,
                'website' => $request->website,
                'comment' => $request->comment,
            ]);
            return response()->json($blogComment);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogComment $blogComment)
    {
        try {
            $blogComment->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
