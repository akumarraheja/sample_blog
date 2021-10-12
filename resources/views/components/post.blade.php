<div class="mt-2 p-2 row">
    <div class="p-2 relative card d-flex mb-2 col-lg-8 mx-auto flex-row justify-content-between align-items-start pe-5">
        <img class="card-img" style="height: 150px; width:150px" src="/storage/{{$post->thumbnail}}" alt="post image">
        <div class="flex-grow-1 ms-2 d-flex flex-column">
            <a href="/post/{{$post->id}}" class="text-3xl text-bold">{{$post->post_heading}}</a>
            <span class="text-gray-600">{{$post->post_title}}</span>
            <span class="mt-1">Published <span class="fw-bold">{{$post->created_at->diffForHumans()}}</span></span>
            <span class="mt-1">Published by <strong>{{$post->user->name}}</strong></span>
        </div>
        @admin
        <div class="d-flex flex-col align-items-center position-absolute right-1 top-1">
            <i class="fa fa-edit cursor-pointer w3-hover-text-blue" onclick="updatepost({{$post->id}})" style="font-size: 24px"></i>
            <i class="fa fa-trash cursor-pointer w3-hover-text-blue" onclick="deletepost({{$post->id}})" style="font-size: 24px"></i>
        </div>
        @endadmin
    </div>
</div>
