<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['comment', 'user_id', 'post_id', 'comment_to'];

    /**
     * defines the relation to users table
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * defines the relation to posts table
     *
     * @return void
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
