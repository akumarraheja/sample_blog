<x-layout>
    <span class="display-4 text-center">Update Post</span>
    <form action="/update/post/{{$post->id}}" method="POST" enctype="multipart/form-data" class="form-group d-flex flex-column">
        @csrf
        <label>Upload Image (Leave empty to keep existing image):</label>
    <input name="thumbnail" type="file">
    <img src="/storage/{{$post->thumbnail}}" style="width: 150px" />
    @error('thumbnail')
        <span class="w3-small w3-text-red">{{$message}}</span>
    @enderror
    <label for="post_heading">Post Heading:</label>
    <input id="post_heading" class="form-control" name="post_heading" type="text" max="255" required>
    <label for="post_title">Post Title: </label>
    <input id="post_title" name="post_title" class="form-control" type="text" max="255" required>

    <label for="post_content">Post Body:</label>
    <textarea name="post_content" id="mytextarea" cols="30" rows="10"></textarea>
    <input type="submit" class="btn btn-primary align-self-end mt-2" value="Publish">
    </form>
    @assignToArray(post_heading,{{$post->post_heading}})
    @assignToArray(post_title,{{$post->post_title}})
    <script>
        tinymce.init({
    selector: '#mytextarea',
    setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent("{!! $post->post_content !!}");
      });
    }
  });
        document.getElementById('post_heading').value = "{{$post->post_heading}}";
        document.getElementById('post_title').value = "{{$post->post_title}}";
    </script>
</x-layout>
