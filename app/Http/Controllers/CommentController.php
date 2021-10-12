<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function create()
    {
        $attributes = request()->validate([
            'comment' => ['required', 'max:500', 'min:10'],
            'post_id' => ['required', 'regex:/^\d+$/']
        ]);

        Comment::create(array_merge($attributes, [
            'user_id' => auth()->user()->id
        ]));

        return redirect('/post/' . $attributes['post_id'])->with('success', 'comment was added successfully');
    }

    public function createreply()
    {
        $attributes = request()->validate([
            'comment' => ['required', 'max:500', 'min:1'],
            'post_id' => ['required', 'regex:/^\d+$/'],
            'comment_to' => ['required']
        ]);

        Comment::create(array_merge($attributes, [
            'user_id' => auth()->user()->id
        ]));

        return redirect('/post/' . $attributes['post_id'])->with('success', 'reply was added successfully')->with('reply', $attributes['comment_to']);
    }

    public function update($id)
    {
        $comment = Comment::with(['user'])->find($id);
        if ($comment->user->name == auth()->user()->name) {
            $attributes = request()->validate([
                'comment' => ['required']
            ]);
            Comment::find($id)->update($attributes);
            return 1;
        }
    }

    public function delete($postid, $id)
    {
        $comment = Comment::with(['user'])->find($id);
        if ($comment->user->name == auth()->user()->name) {
            Comment::find($id)->delete();
            return redirect('/post/' . $postid)->with('sucess', 'Your comment was deleted.');
        }
    }
}
