<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SimpleMail;

class AuthController extends Controller
{  
    /**
    * Create user
    *
    * @param  [string] name
    * @param  [string] email
    * @param  [string] password
    * @param  [string] password_confirmation
    * @return [string] message
    */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email'=>'required|string|unique:users',
            'password'=>'required|string',
            'c_password' => 'required|same:password'
        ]);

        $user = new User([
            'name'  => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if($user->save()){
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->plainTextToken;

            return response()->json([
            'message' => 'Successfully created user!',
            'accessToken'=> $token,
            ],201);
        }
        else{
            return response()->json(['error'=>'Provide proper details']);
        }
    }


        /**
     * Login user and create token
    *
    * @param  [string] email
    * @param  [string] password
    * @param  [boolean] remember_me
    */

    public function login(Request $request)
    {
        $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
        'remember_me' => 'boolean'
        ]);

        $credentials = request(['email','password']);
        if(!Auth::attempt($credentials))
        {
        return response()->json([
            'message' => 'Unauthorized'
        ],401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;

        return response()->json([
        'accessToken' =>$token,
        'token_type' => 'Bearer',
        ]);
    }

        /**
     * Get the authenticated User
    *
    * @return [json] user object
    */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


        /**
     * Logout user (Revoke the token)
    *
    * @return [string] message
    */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
        'message' => 'Successfully logged out'
        ]);

    }

    public function sendMail(Request $request)
    {

    $email = $request->input("email");
    $details = [
        'subject' => 'Mots de passe ',
        'title' => 'Bonjour !',
        'body' => 'Pour reset le password cliquer sur ce lien ...'
        ];


    Mail::to($email)->send(new SimpleMail($details));

        return response()->json(['message' => 'Email envoyé avec succès']);
    }


    public function updatePassword(Request $request) {
        $request->validate([
            'password' => 'required',
            'email' => 'required|email',
            'newPassword' => 'required|min:8', 
        ]);
    
        
        $user = User::where('email', '=', $request->email)->firstOrFail();  

        
        if (Hash::check($request->password, $user->password)) {
        
        $user->password = Hash::make($request->newPassword);
        $user->save();
        
        
        
        
        $details = [
            'subject' => 'Mots de passe ',
            'title' => 'Bonjour !',
            'body' => 'Votre mots de passe a ete réinitialiser avec le mots de passe entré'
        ];
        
        
        Mail::to($request->email)->send(new SimpleMail($details));
        
        return response()->json(['message' => 'Email envoyé avec succès']);
        } else {
            return response()->json(['message' => 'Mot de passe actuel incorrect'], 403);
        }
        }       
}