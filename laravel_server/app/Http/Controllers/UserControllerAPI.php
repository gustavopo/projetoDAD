<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\verifyEmail;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function getUsers(Request $request)
    {
        if ($request->has('page')) {
            return UserResource::collection(User::paginate(5));
        } else {
            return UserResource::collection(User::all());
        }
    }

    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }

    public function store(Request $request)
    {

        Session::flash('status', 'Registered! But verify your email to activate your account!');
        $request->validate([
            'name' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:4',

        ]);

        $user = new User();

        $user->fill($request->all());
        $user->verifyToken = Str::random(40);
        $user->password = Hash::make($user->password);


     //   $thisUser=User::findOrFail($user->id);
        $user->save();

        $this->sendEmail($user);

      //  return response()->json(new UserResource($user), 201);
        return $user;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
        ]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return new UserResource($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
    public function emailAvailable(Request $request)
    {
        $totalEmail = 1;
        if ($request->has('email') && $request->has('id')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->where('id', '<>', $request->id)->count();
        } else if ($request->has('email')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->count();
        }
        return response()->json($totalEmail == 0);
    }


    public function verifyEmail()
    {

    }

    public function sendEmail($thisUser)
    {
        Mail::to($thisUser['email'])->send(new verifyEmail($thisUser));
    }

    public function sendEmailDone($email, $verifyToken)
    {
        $user = User::where(['email'=>$email, 'verifyToken'=> $verifyToken])->first();
        if($user)
        {
            return  user::where(['email'=>$email, 'verifyToken'=> $verifyToken])->update(['status'=>'1', 'verifyToken'=> NULL]);

        }else{
            return 'user not found';
        }

    }
}
