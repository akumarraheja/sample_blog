<x-layout>
    <span class="display-5 text-center mt-3">Login</span>
    <form action="/login" method="post" class="form-group px-5 py-2 d-flex flex-column">
        @csrf
        <label for="email" class="my-2">Email:</label>
        <input name="email" id="email" type="email" value="{{old('email')}}" class="form-control">
        @error('email')
            <span class="w3-text-red text-small">{{$message}}</span>
        @enderror
        <label for="name" class="my-2">Password:</label>
        <input name="password" id="password" type="password" class="form-control">
        @error('password')
            <span class="w3-text-red text-small">{{$message}}</span>
        @enderror
        <button type="submit" id="login" onsubmit="return validatelogin()" class="btn btn-primary align-self-end mt-4 align-items-center d-flex">
            <span class="spinner-border spinner-border-sm me-2 d-none"></span>
            Continue
        </button>
    </form>
</x-layout>
