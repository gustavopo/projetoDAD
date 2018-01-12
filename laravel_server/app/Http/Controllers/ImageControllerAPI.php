<?php

namespace App\Http\Controllers;

use App\Image;
//use Intervention\Image as ImageIntervention;
use Intervention\Image\ImageManagerStatic as ImageIntervention;
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

    public function delete($id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
        return response()->json(null, 204);
    }

    public function store(Request $request)
    {
        //Configure Image Class


        $exploded = explode(',', $request->path);
        $decoded = base64_decode($exploded[1]);

        // Verificar o Tipo
        if (str_contains($exploded[0], 'jpeg')) {
            $extension = 'jpg';
        } else {
            $extension = 'png';
        }

        $fileName = str_random() . '.' . $extension;
        $filePath = public_path() . '/img/' . $fileName;
        file_put_contents($filePath, $decoded);

        $request->validate([
            'face' => 'required|string|max:255',
            'active' => 'required|string|max:255',
        ]);

        $image =  new Image();
        $image->fill($request->except('path')+ [
                'path' => $fileName
            ]);

        $image->save();

        return $image;
    }

}
