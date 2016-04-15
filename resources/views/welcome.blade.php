@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Welcome</div>

                <div class="panel-body">
                    <div id="Search"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('footer_scripts')
    <script src="/js/Search.js"></script>
@endsection
