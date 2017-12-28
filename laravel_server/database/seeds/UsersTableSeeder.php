<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    private $numberOfUsers = 30;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create('pt_PT');

        DB::table('users')->insert($this->fakeUser($faker, true));
/*
        for ($i = 0; $i < $this->numberOfUsers; ++$i) {
            DB::table('users')->insert($this->fakeUser($faker, false));
        }
*/
        factory(App\User::class, 20)->create();
    }

    private function fakeUser(Faker\Generator $faker, $admin)
    {
        static $password;
        $createdAt = Carbon\Carbon::now()->subDays(30);
        $updatedAt = $faker->dateTimeBetween($createdAt);

        $email = $admin ? 'admin@mail.dad' : $faker->unique()->safeEmail;
        $verifyToken= Str::random(40);
        
        return [
            'name' => $faker->name,
            'nickname' => $faker->userName,
            'email' => $email,
            'password' => $password ?: $password = bcrypt('secret'),
            'admin' => $admin,
            'blocked' => false,
            'reason_blocked' => null,
            'reason_reactivated' => null,
            'verifyToken' =>  $verifyToken,
            'status' => 0,
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
        ];
    }
}
