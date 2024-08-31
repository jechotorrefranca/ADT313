<?php

    function checkAuth($user){
        if($user !== 'admin'){
            echo "go away!";
        } else {
            echo "welcome!";
        }
    }

    checkAuth('admin');

    $cars = array("bmw", "volvo", "toyota");

    $motors = [
        "Harley",
        "Honda",
        "Ducati"
    ];

    echo ($cars[0]);
    echo $motors[2];

    $cars2 = array(
        "ford" => "mustang",
        "maserati" => "unknown",
        "bmw" => "m3"
    );

    echo $cars2["bmw"];

    $user = array(
        "firstname" => "Jecho",
        "lastname" => "Torrefranca",
        "middlename" => "Parairo"
    );

    echo $user["middlename"];


    $info = array(
        "user" => array(
            "firstname" => "Jecho",
            "lastname" => "Torrefranca",
            "middlename" => "Parairo"
        ),
        "address" =>array(
            "province" => "bulacan",
            "municipality" => "bocaue",
            "barangay" => "wakas"
        ),
        1234
    );

    echo $info["address"]["municipality"];

    $info["user"]["age"]=21;

    echo "<pre>";
    print_r($info);
    echo "<br>";
    var_dump($info);
    echo "<pre>";
?>