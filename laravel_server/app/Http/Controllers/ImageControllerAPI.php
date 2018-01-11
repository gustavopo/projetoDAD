<?php

namespace App\Http\Controllers;

use App\Image;
use Illuminate\Http\Request;
use App\Http\Resources\Image as ImageResource;


class ImageControllerAPI extends Controller
{

    public function getImages(Request $request)
    {
        if ($request->has('page')) {
            return ImageResource::collection(Image::paginate(5));
        } else {
            return ImageResource::collection(Image::all());
        }
    }

    public function getImage($id)
    {
        return new ImageResource(Image::find($id));
    }

}
