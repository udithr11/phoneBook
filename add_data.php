<?php
include_once 'connection.php';

if (isset($_POST['arraysJSON'])) {
    $arraysJSON = $_POST['arraysJSON'];
    // echo($arraysJSON);
    
    
    $arrays = json_decode($arraysJSON, true);

    if ($arrays !== null && is_array($arrays)) {
        // Loop through arrays and insert into database
        foreach ($arrays as $array) {
            $name = $array['name'];
            $phone = $array['phone'];
            $email = $array['email'];
            $id = $array['id'];

            // Check if the 'id' already exists in the database
            $query = "SELECT COUNT(*) FROM phoneBookTable WHERE ID = '$id'";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_array($result);

            // If 'id' does not exist, insert the record
            if ($row[0] == 0) {
                // Prepare SQL statement
                $sql = "INSERT INTO phoneBookTable (NAMES, PHONE, EMAIL, ID) VALUES ('$name', '$phone', '$email', '$id')";
                echo ($sql);
                // Execute SQL statement
                if (mysqli_query($conn, $sql)) {
                    echo "Data inserted successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
            } else {
                echo "ID $id already exists in the database. Skipping insertion.";
            }
        }
    } else {
        echo "Invalid JSON format or empty array";
    }
} else {
    echo "No data received";
}
?>
