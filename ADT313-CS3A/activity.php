<?php

    $table = array(
        "header" => array(
            "Student ID",
            "Lastname",
            "Middlename",
            "Firstname",
            "Course",
            "Section"
        ),

        "body" => array(
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
            [
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstname",
                "course"=>"BSCS",
                "section"=>"3A"
            ],
        ), 
        
    );

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hands-on Activity</title>
</head>
<style>
    table, th, td {
  border: 1px solid;
}
</style>
<body>
    <h2>Hands-on Activity</h2>
    
    <table>
        <?php
            echo "<tr>";
                foreach ($table['header'] as $key) {
                    echo "<th>", $key ,"</th>";
                };

            echo "</tr>";

            for ($i = 0; $i < 10; $i++) {
                echo "<tr>";
                    echo "<td>",$i,"</td>";
                    foreach ($table['body'][$i] as $key) {
                        echo "<td>";
                            echo $key;
                        echo "</td>";
                    }
                echo "</tr>";
            }
        ?>
    </table>
    
</body>
</html>