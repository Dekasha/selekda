<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'blog_image' => ['required'],
            'blog_title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'author' => ['required', 'string'],
            'tags' => ['required'],
        ];
    }
    public function messages(): array
    {
        return [
            'blog_image.required' => 'The :attribute field is required.',
            'blog_image.image' => 'The :attribute must be an image.',
            'blog_title.required' => 'The :attribute field is required.',
            'blog_title.string' => 'The :attribute must be a string.',
            'description.required' => 'The :attribute field is required.',
            'description.string' => 'The :attribute must be a string.',
            'author.required' => 'The :attribute field is required.',
            'author.string' => 'The :attribute must be a string.',
            'tags.required' => 'The :attribute field is required.',
            'tags.json' => 'The :attribute must be a JSON.',
        ];
    }
}
