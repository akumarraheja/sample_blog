<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Gumlet\ImageResize;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function newpost()
    {
        return view('newpost');
    }

    public function create()
    {

        $attributes = request()->validate([
            'post_heading' => ['required', 'max:255'],
            'post_title' => ['required', 'max:255'],
            'post_content' => ['required'],
            'thumbnail' => ['image', 'required']
        ]);
        $attributes['post_content'] = addslashes(preg_replace("@[\n\r]@", "", $attributes['post_content']));
        $path = request()->file('thumbnail')->store('thumb');
        Post::create(array_merge($attributes, [
            'user_id' => auth()->user()->id,
            'thumbnail' => $path
        ]));
        return redirect('/')->with('success', 'Post was successfully published.');
    }

    public function destroy($id)
    {
        Comment::where('post_id', $id)->delete();
        Post::destroy($id);
        return redirect('/')->with('success', 'Post was deleted successfully');
    }

    public function updateview($id)
    {
        $post = Post::find($id);
        return view('updatepost', ['post' => $post]);
    }
    public function update($id)
    {
        $attributes = request()->validate([
            'post_heading' => 'required',
            'post_title' => 'required',
            'post_content' => 'required',
            'thumbnail' => 'image'
        ]);
        if ($attributes['thumbnail'] ?? false) {
            $attributes['thumbnail'] = request()->file('thumbnail')->store('thumb');
        }
        $attributes['post_content'] = addslashes(preg_replace("@[\n\r]@", "", $attributes['post_content']));
        Post::find($id)->update($attributes);
        return redirect('/')->with('success', 'Post was updated successfully.');
    }
}
