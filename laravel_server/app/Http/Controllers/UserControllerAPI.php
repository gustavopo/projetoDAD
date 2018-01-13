<?php

namespace App\Http\Controllers;

use App\Mail\MailBlockUser;
use App\Mail\MailUnblockUser;
use App\Mail\Registration;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\verifyEmail;


use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Illuminate\Support\Facades\Auth;

class UserControllerAPI extends Controller
{
    use RegistersUsers;

    public function getAuthUser()
    {
        return $authUser = Auth::user();
    }

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

    public function changePassword(Request $request, $id)
    {

        // Session::flash('status', 'Registered! But verify your email to activate your account!');
        $request->validate([
            'password' => 'required|string|min:4',

        ]);

        $user = User::findOrFail($id);

        // $request['password'] =bcrypt($request['password']);
        //$user->password = Hash::make($user->password);

        $user->fill($request->all());
        $user->password = Hash::make($user->password);
        $user->save();
        return $user;
    }

    public function store(Request $request)
    {

        // Session::flash('status', 'Registered! But verify your email to activate your account!');
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

        $user->save();
        Mail::to($user->email)->send(new Registration);

        /*  Mail::send('email.registration', $user, function($message) use ($user) {
              $message->to('projetodad123@gmail.com');
              $message->subject('Mailgun Testing');
          });
  */

    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'nickname' => 'required',
            'email' => 'email|unique:users,email,' . $id,
        ]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return new UserResource($user);
    }

    public function block(Request $request, $id)
    {
        $request->validate([
            'blocked' => 'required',
            'reason_blocked' => 'nullable'
        ]);
        $user = User::findOrFail($id);
        $user->update($request->all());

        Mail::to($user)->send(new MailBlockUser());

        return new UserResource($user);
    }

    public function unblock(Request $request, $id)
    {
        $request->validate([
            /*'name' => 'required',
            'nickname' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            */
            'blocked' => 'required',
            'reason_reactivated' => 'nullable'
        ]);
        $user = User::findOrFail($id);
        $user->update($request->all());

        Mail::to($user)->send(new MailUnblockUser());

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


    public function verifyEmailFirst()
    {
        return view('email.registration');

    }

    public function sendEmailDone($email, $verifyToken)
    {
        $user = User::where(['email' => $email, 'verifyToken' => $verifyToken])->first();
        if ($user) {
            return user::where(['email' => $email, 'verifyToken' => $verifyToken])->update(['status' => '1', 'verifyToken' => NULL]);

        } else {
            return 'user not found';
        }

    }

}
