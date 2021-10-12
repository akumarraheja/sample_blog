<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\PostController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Authenticate;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MainController::class, 'home']);

Route::get('/login', [MainController::class, 'login']);
Route::get('/register', [MainController::class, 'register']);
Route::get('/logout', [MainController::class, 'destroy']);

Route::post('/register', [MainController::class, 'create']);
Route::post('login', [MainController::class, 'authenticate']);

Route::get('newpost', [PostController::class, 'newpost'])->middleware(Admin::class);
Route::post('newpost', [PostController::class, 'create'])->middleware(Admin::class);
Route::get('post/{post:id}', [MainController::class, 'getpost']);

Route::post('/newcomment', [CommentController::class, 'create'])->middleware(Authenticate::class);
Route::post('/replycomment', [CommentController::class, 'createreply'])->middleware(Authenticate::class);
Route::get('/delete/post/{post:id}', [PostController::class, 'destroy'])->middleware(Admin::class);
Route::get('/update/post/{post:id}', [PostController::class, 'updateview'])->middleware(Admin::class);
Route::post('/update/post/{post:id}', [PostController::class, 'update'])->middleware(Admin::class);

Route::post('/update/comment/{comment:id}', [CommentController::class, 'update']);

Route::get('/post/{post:id}/delete/comment/{comment:id}', [CommentController::class, 'delete']);
