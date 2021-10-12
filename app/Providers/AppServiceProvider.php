<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        //
        Blade::if('admin', function () {
            return auth()->user()?->name == 'Akshay';
        });

        Blade::if('adminoruser', function ($user) {
            return (auth()->user()?->name == 'Akshay') || ($user == auth()->user()?->name);
        });

        Blade::directive('showmsg', function ($expression) {
            return "<script>showMsg(\"" . $expression . "\")</script>";
        });
        Blade::directive('showmsgf', function ($expression) {
            return "<script>showMsg(\"" . $expression . "\", true)</script>";
        });
        Blade::directive('addVar', function ($value) {
            return "<script>variables['reply'] = '$value';openReply();</script>";
        });
        Blade::directive('assignToArray', function ($variable) {
            $values = explode(',', $variable);
            $key = $values[0];
            $value = $values[1];
            return "<script>variables['$key']='$value';</script>";
        });
    }
}
