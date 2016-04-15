<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use AlgoliaSearch\Laravel\AlgoliaEloquentTrait;

class Contact extends Model
{
    use AlgoliaEloquentTrait;

    public $algoliaSettings = [
        'attributesToIndex' => [
            'id', 
            'name',
        ],
        'customRanking' => [
            'desc(popularity)', 
            'asc(name)',
        ],
    ];  
}
