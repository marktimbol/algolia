<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use AlgoliaSearch\Laravel\AlgoliaEloquentTrait;

class Contact extends Model
{
    use AlgoliaEloquentTrait;

    protected $fillable = ['name', 'email', 'phone', 'image_path'];
    
    public static $autoIndex = true;
    public static $autoDelete = true;    

    public $indices = ['dev_ALSBEEF_Burgers']; 
}
