<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="/resources/css/bootstrap.css">
    <link href="/resources/css/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/resources/css/w3.css">
    <link rel="stylesheet" href="/resources/css/custom.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdn.tiny.cloud/1/6bj5hpoqaw4qi3wjgqrxzp5i56c5e26h9mlkawbuxxdouhzw/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="/resources/js/app.js"></script>
    <script src="/resources/js/akrelement.js"></script>
    <script src="/resources/js/custom.js"></script>
    <title>{{env('APP_NAME')}}</title>
</head>
<body class="relative">
    <div class="container d-flex flex-column mb-5">
        <div class="d-flex justify-content-between align-items-center flex-row px-3 py-2 w3-light-gray">
            <a href="/"><img src="/images/logo.png" style="height:56px"/></a>
            @auth
            <div class="d-flex flex-row">
                @admin
                <a href="/newpost" class="btn btn-primary rounded me-2">+ Add Post</a>
                @endadmin
                <div class="d-flex flex-column align-items-end ps-3">
                    <span class="text-bold">Welcome, {{auth()->user()->name;}}</span>
                    <a href="/logout" class="text-decoration-none ms-2 text-small w3-text-blue w3-hover-text-pink">Logout</a>
                </div>
            </div>
            @else
            <div>
                <a href="/register" class="btn btn-primary">Register</a>
                <a href="/login" class="btn btn-success">Login</a>
            </div>
            @endauth
        </div>
        {{$slot}}
    </div>

    @if (session()->has('success'))
        @showmsg({{session('success')}})
    @endif
    @if (session()->has('failure'))
        @showmsgf({{session('failure')}})
    @endif

    @if (session()->has('reply'))
        @addVar({{session('reply')}})
    @endif
</body>
</html>
