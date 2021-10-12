<x-layout>
    <span class="display-4 text-center">Add New Post</span>
    <form action="/newpost" method="POST" enctype="multipart/form-data" class="form-group d-flex flex-column">
        @csrf
        <label>Upload Image:</label>
    <input name="thumbnail" type="file">
    @error('thumbnail')
        <span class="w3-small w3-text-red">{{$message}}</span>
    @enderror
    <label for="post_heading">Post Heading:</label>
    <input class="form-control" name="post_heading" type="text" max="255" required>
    <label for="post_title">Post Title: </label>
    <input name="post_title" class="form-control" type="text" max="255" required>

    <label for="post_content">Post Body:</label>
    <textarea name="post_content" id="mytextarea" cols="30" rows="10"></textarea>
    <input type="submit" class="btn btn-primary align-self-end mt-2" value="Publish">
    </form>
    <script>
        tinymce.init({
            selector: '#mytextarea',
            menubar:false
        });
    </script>
</x-layout>
