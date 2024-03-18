<?php
include_once 'connection.php';

if (isset($_POST['id'])) { 
    $id = $_POST['id'];

    $sql = "DELETE FROM phoneBookTable WHERE ID = '$id'";

    
    if (mysqli_query($conn, $sql)) {
        echo "Data deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
} else {
    echo "No ID received";
}
?>
