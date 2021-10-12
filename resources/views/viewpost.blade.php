<x-layout>
    <div class="d-flex flex-column p-2 mt-3">
        <span class="display-5">{{$post->post_heading}}</span>
        <span class="my-3 text-3xl">{{$post->post_title}}</span>
        <span class="my-2">{!! $post->post_content !!}</span>
        <div class="d-flex flex-row justify-content-between my-3">
            <span>Published By <span class="fw-bold">{{$post->user->name}}</span></span>
            <span>Publised <span class="fw-bold">{{$post->created_at->diffForHumans()}}</span></span>
        </div>
        <a href="/" class="btn btn-primary align-self-start">Go Back</a>
    </div>
    <span class="display-6 mt-3">Comments</span>
    @foreach ($post->commentsnormal as $comment)
        <x-comment :post="$post" :comment="$comment" :replies="$post->commentsreply"/>
    @endforeach
    <form class="p-2 mt-2 d-flex flex-col form-group" method="POST" action="/newcomment" enctype="multipart/form-data">
        <span class="text-2xl mb-3">Write a comment:</span>
        @csrf
        <input type="text" name="post_id" value="{{$post->id}}" hidden>
        @error('comment')
            @showmsgf({{$message}})
        @enderror
        <textarea name="comment" maxlength="500" class="form-control border-1 border-light-gray h-36 p-3" placeholder="Enter your comment here"></textarea>
        <button type="submit" class="btn btn-primary align-self-end mt-2">Submit</button>
    </form>
</x-layout>
