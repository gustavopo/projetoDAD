<?php

namespace App\Http\Controllers;

use App\Mail\Registration;
use App\Mail\Mailtrap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail(Request $request, $userId)
    {
        $user = User::findOrFail(userId);

        //TODO
        // Ship order...

        Mail::to($request->user())->send(new Registration);
    }
}
