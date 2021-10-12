<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['post_heading', 'post_title', 'post_content', 'user_id', 'thumbnail'];

    public function scopeFilter($query, array $filters)
    {
        $query->when(
            $filters['user'] ?? false,
            fn ($query, $author) =>
            $query->whereHas(
                'user',
                fn ($query) =>
                $query->where('id', $author)
            )
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function commentsnormal()
    {
        return $this->hasMany(Comment::class);
    }
    public function commentsreply()
    {
        return $this->hasMany(Comment::class);
    }
}
