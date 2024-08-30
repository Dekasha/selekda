<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePortfolioRequest extends FormRequest
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
            'portfolio_title' => ['required', 'string', 'max:255'],
            'portfolio_image' => ['required'],
            'description' => ['required', 'string'],
            'author' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'portfolio_title.required' => 'The portfolio title field is required.',
            'portfolio_image.required' => 'The portfolio image field is required.',
            'description.required' => 'The description field is required.',
            'author.required' => 'The author field is required.',
        ];
    }
}
