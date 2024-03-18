<?php
include_once 'connection.php';

if (isset($_POST['arraysJSON'])) {
    $arraysJSON = $_POST['arraysJSON'];
    echo($arraysJSON);
    
    // Decode JSON data
    $array = json_decode($arraysJSON, true);

    if ($array !== null && is_array($array)) {
        // Extract fields from the array
        $name = $array['name'];
        $phone = $array['phone'];
        $email = $array['email'];
        $id = $array['id'];

        // Check if the record with the same ID exists in the database
        $query = "SELECT COUNT(*) FROM phoneBookTable WHERE ID = '$id'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_array($result);

        // If the record exists, update it; otherwise, insert a new record
        if ($row[0] > 0) {
            // Prepare SQL statement to update the record
            $sql = "UPDATE phoneBookTable SET NAMES = '$name', PHONE = '$phone', EMAIL = '$email' WHERE ID = '$id'";
        } else {
            // Prepare SQL statement to insert a new record
            $sql = "INSERT INTO phoneBookTable (NAMES, PHONE, EMAIL, ID) VALUES ('$name', '$phone', '$email', '$id')";
        }

        // Execute SQL statement
        if (mysqli_query($conn, $sql)) {
            echo "Data inserted or updated successfully";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    } else {
        echo "Invalid JSON format or empty array";
    }
} else {
    echo "No data received";
}
?>
