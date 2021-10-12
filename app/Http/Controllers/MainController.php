<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    public function home()
    {

        $posts = Post::latest()->filter(
            request(['user'])
        )->paginate(10);
        return view('homepage', ['posts' => $posts]);
    }

    public function login()
    {
        return view('login');
    }

    public function getpost($id)
    {
        $post = Post::with(['user', 'commentsnormal' => function ($query) {
            $query->orderBy('created_at', 'ASC');
            $query->where('comment_to', '0');
        }, 'commentsreply' => function ($query) {
            $query->orderBy('created_at', 'ASC');
            $query->where('comment_to', '!=', '0');
        }])->find($id);
        // return $post;
        return view('viewpost', ['post' => $post]);
    }

    public function register()
    {
        return view('register');
    }

    public function create()
    {
        $attributes = request()->validate([
            'name' => ['required', 'max:255', 'min:8', 'regex:/^\w[\w\d ]{2,}$/'],
            'email' => ['email', 'required'],
            'password' => ['required', 'min:8', 'max:255', 'regex:/^[\w\d@#$%^]{7,}$/']
        ]);

        auth()->login(User::create($attributes));
        return redirect('/')->with('success', 'Your account has been created');
    }

    public function authenticate()
    {
        $attributes = request()->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8', 'max:255', 'regex:/^[\w\d@#$%^]{7,}$/']
        ]);
        if (auth()->attempt($attributes)) {
            return redirect('/')->with('success', 'Login Success');
        } else {
            return redirect('/')->with('success', 'Login unsuccessful');
        }
    }

    public function destroy()
    {
        auth()->logout();
        return redirect('/');
    }
}
