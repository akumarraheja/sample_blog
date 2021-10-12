<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'post_title' => $this->faker->sentence(),
            'post_heading' => $this->faker->sentence(),
            'post_content' => '<p>' . implode('</p><p>', $this->faker->paragraphs()) . '</p>'
        ];
    }
}
