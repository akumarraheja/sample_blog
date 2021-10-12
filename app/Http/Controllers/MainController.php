<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    /**
     * returns the home page with paginated posts
     *
     * @return void
     */
    public function home()
    {

        $posts = Post::latest()->filter(
            request(['user'])
        )->paginate(10);
        return view('homepage', ['posts' => $posts]);
    }

    /**
     * returns a login page
     *
     * @return void
     */
    public function login()
    {
        return view('login');
    }

    /**
     * returns the post page
     *
     * @param string $id
     * @return void
     */
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

    /**
     * returns the register page view
     *
     * @return void
     */
    public function register()
    {
        return view('register');
    }

    /**
     * handles the create request from register page
     *
     * @return void
     */
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

    /**
     * handles the login request from login page
     *
     * @return void
     */
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

    /**
     * logout the user
     *
     * @return void
     */
    public function destroy()
    {
        auth()->logout();
        return redirect('/');
    }
}
