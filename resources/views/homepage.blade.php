<x-layout>
    <span class="display-4 align-self-center my-3">My Blog Posts</span>
    @foreach ($posts as $post)
        <x-post :post="$post"></x-post>
    @endforeach
    @if (count($posts) == 0)
        <span class="text-3xl text-red-600 text-center">No Posts Found</span>
    @endif
    {{$posts->links()}}
</x-layout>
