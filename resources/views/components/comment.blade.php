<div class="relative bg-gray-100 rounded-1 pe-5 border-1 border-gray-400 mt-2 p-2 d-flex  flex-column">
    <span class="fw-bold">{{$comment->user->name}} said</span>
    <p class="comment-content text-gray-600">{{$comment->comment}}</p>
    <span class="align-self-end comment-content">{{$comment->created_at->diffForHumans()}}</span>
    @adminoruser($comment->user->name)
    <div class="d-flex flex-col comment-content align-items-center position-absolute right-1 top-1">
        <i class="fa fa-edit cursor-pointer w3-hover-text-blue" onclick="updatecomment(this, {{$comment->id}})" style="font-size: 24px"></i>
        <i class="fa fa-trash cursor-pointer w3-hover-text-blue" onclick="deletecomment({{$post->id}},{{$comment->id}})" style="font-size: 24px"></i>
    </div>
    @endadminoruser
    <div class="p-2 d-none commentdiv comment-{{$comment->id}}">
        @php
            $repliesfound = 0
        @endphp
        @foreach ($replies as $reply)
            @if ($reply->comment_to == $comment->id)
                <div class="relative pe-5 border border-light-gray bg-white mt-2 p-2 d-flex flex-col">
                    <span class="fw-bold">{{$reply->user->name}} replied</span>
                    <span class="text-gray-600">{{$reply->comment}}</span>
                    <span class="align-self-end">{{$reply->created_at->diffForHumans()}}</span>
                    @adminoruser($reply->user->name)
                    <div class="d-flex flex-col align-items-center position-absolute right-1 top-1">
                        <i class="fa fa-edit cursor-pointer w3-hover-text-blue" onclick="updatecomment(this, {{$reply->id}})" style="font-size: 24px"></i>
                        <i class="fa fa-trash cursor-pointer w3-hover-text-blue" onclick="deletecomment({{$post->id}}, {{$reply->id}})" style="font-size: 24px"></i>
                    </div>
                    @endadminoruser
                </div>
                @php
                    $repliesfound++;
                @endphp
            @endif
        @endforeach
        <form class="p-2 mt-2 d-flex flex-col form-group" method="POST" action="/replycomment" enctype="multipart/form-data">
            <span class="fw-bold mb-3">Reply:</span>
            @csrf
            <input type="text" name="comment_to" value="{{$comment->id}}" hidden>
            <input type="text" name="post_id" value="{{$post->id}}" hidden>
            <textarea name="comment" maxlength="500" class="form-control border-1 border-light-gray h-24 p-2" placeholder="Enter your reply here"></textarea>
            <button type="submit" class="btn btn-primary align-self-end mt-2">Reply</button>
        </form>
    </div>
    <div class="align-self-end mt-1 replybtns">
        @if ($repliesfound != 0)
        <span class="w3-text-blue w3-hover-text-pink akr-pointer" onclick="openreplies(this, {{$comment->id}})">View Replies ({{$repliesfound}} @php
            echo $repliesfound == 1? 'reply' : 'replies';
        @endphp)</span>
        @endif
        <span class="btn btn-primary ms-2" onclick="openreplies(this, {{$comment->id}})">Reply</span>
    </div>
</div>
