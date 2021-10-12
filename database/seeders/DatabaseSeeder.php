<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $user = User::factory()->create([
            'name' => 'Akshay',
            'email' => 'akumarraheja@gmail.com'
        ]);
        $posts = Post::factory(20)->create([
            'user_id' => $user->id
        ]);
        foreach ($posts as $post) {
            Comment::factory(5)->create([
                'post_id' => $post->id,
                'user_id' => $user->id
            ]);
        }
    }
}
