<h1>Condition</h1>

<?php
    $number = 16;

    if($number % 2) {
        echo "omg seven twenty sevenost";
    } else {
        echo "almost";
    }

    //(condition) ? true : false

    $authenticated = true;
    $checkAccess = ($authenticated) ? "access granted" : "access denied";

    echo $checkAccess;

    $color = "red";

    switch ($color) {
        case 'red':
            # code...
            break;

        
        default:
            # code...
            break;
    }
?>