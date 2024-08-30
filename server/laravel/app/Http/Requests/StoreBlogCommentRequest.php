<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogCommentRequest extends FormRequest
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
            'subject' => ['required', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'comment' => ['required', 'string'],
            'captcha' => ['required', 'string'],
        ];
    }
}
