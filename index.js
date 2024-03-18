let arraysJSON = localStorage.getItem('arrays');
let arrays = JSON.parse(arraysJSON);
// console.log(arraysJSON);
if (!arrays) {
    arrays = [];
}
Display()

function addDataToPHP(array) {
    $.ajax({
        type: "POST",
        url: "add_data.php",
        data: { arraysJSON: array },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });
}

function editDataToPHP(array) {
    $.ajax({
        type: "POST",
        url: "edit_data.php",
        data: { arraysJSON: array },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });
}

function deleteDataToPHP(id) {
    $.ajax({
        type: "POST",
        url: "delete_data.php",
        data: { id: id },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });
}

function toggleContainer() {

    const displayContainer = document.getElementById("display_container");
    displayContainer.style.display = (displayContainer.style.display === "flex") ? "none" : "none";
    const addContainer = document.getElementById("add_container");
    addContainer.style.display = (addContainer.style.display === "none") ? "flex" : "flex";
   
    const save_name = document.getElementById("add_name");
    const add_phone = document.getElementById("add_phone");
    const add_email = document.getElementById("add_email");
    save_name.value="";
    add_phone.value="";
    add_email.value="";

    let add_ = document.getElementById("save_button");
    add_.textContent = "Add";
    add_.onclick = function() {
        SAVE();
    };

}

function SAVE(){

    const save_name = document.getElementById("add_name");
    const add_phone = document.getElementById("add_phone");
    const add_email = document.getElementById("add_email");

    const name_val = save_name.value.trim();
    const phone_val = add_phone.value.trim();
    const email_val = add_email.value.trim();

    if(name_val==""|| phone_val=="" || email_val==""){
        alert("enter all three values")
        return
    }

    arrays.push({name:name_val,phone:phone_val,email:email_val,id:Date.now()})
    let arraysJSON = JSON.stringify(arrays);

    localStorage.setItem('arrays', arraysJSON);
    Display()
   
    toggleContainer()
    addDataToPHP(arraysJSON)


    
}


function Display(searchValue="") {
    $("#display_names").empty();

    arrays.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((array, index) => {
        let arrayItemDiv = $("<div>").addClass("array_item").text(`${index + 1}. ${array.name.toUpperCase()}`);
        arrayItemDiv.dblclick(() => {
            view(array);
        });
        let buttonWrapper = $("<span>").addClass("button_wrapper");

        let editButton = $("<button>").text("Edit").addClass("edit_button").attr("id", "edit_button_display").click(() => {
            edit(array);
        });

        let deleteButton = $("<button>").text("Delete").addClass("edit_button").click(() => {
            to_delete(array);
        });

        buttonWrapper.append(editButton, deleteButton); 

        arrayItemDiv.append(buttonWrapper);
        $("#display_names").append(arrayItemDiv);
    });
    
}



function edit(array){

    // const edit=arrays.find((t)=>t.id===array.id);
    toggleContainer()
    const save_name = document.getElementById("add_name");
    const add_phone = document.getElementById("add_phone");
    const add_email = document.getElementById("add_email");

    save_name.value=array.name
    add_phone.value=array.phone
    add_email.value=array.email

    let edit_ = document.getElementById("save_button");
    edit_.textContent = "Save";
    edit_.onclick = function() {
        saveEdit(array);
    };
}

function saveEdit(array){
    const save_name = document.getElementById("add_name");
    const add_phone = document.getElementById("add_phone");
    const add_email = document.getElementById("add_email");

    const name_val = save_name.value.trim();
    const phone_val = add_phone.value.trim();
    const email_val = add_email.value.trim();

    if(name_val==""|| phone_val=="" || email_val==""){
        alert("enter all three values")
        return
    }

    arrays.forEach((t) => {
        if (t.id === array.id) {
            t.name = name_val;
            t.phone = phone_val;
            t.email = email_val;
            out=[t];
            console.log(out);
            editDataToPHP(JSON.stringify(t));
        }
    });

    let arraysJSON = JSON.stringify(arrays);

    localStorage.setItem('arrays', arraysJSON);

    let edit_ = document.getElementById("edit_button_display");
    edit_.textContent = "Edit";
    edit_.onclick = Display();
     
    save_name.value = "";
    add_phone.value = "";
    add_email.value = "";

    toggleContainer()

    view(array)
    


}


function to_delete(array){
    arrays=arrays.filter((t)=>{
       return t.id!==array.id;
       
    })
    
    deleteDataToPHP(array.id);
    
    let arraysJSON = JSON.stringify(arrays);

    localStorage.setItem('arrays', arraysJSON);
    
    

    toggleContainer()
    Display();
    
}

function view(array){
    const displayContainer = document.getElementById("display_container");
   
    if(displayContainer.style.display === "none") {
        displayContainer.style.display="flex";
    }
    const addContainer = document.getElementById("add_container");
    if(addContainer.style.display === "flex"){
        addContainer.style.display="none";
    }
    
    $('#display_name').text(`Name: ${array.name}`);
    $('#display_phone').text(`Phone: ${array.phone}`);
    $('#display_email').text(`Email: ${array.email}`);

}

function Search(){
    const search_ = document.getElementById("search_query");
    let search_val = search_.value.trim();

    Display(search_val)
    search_val=""
}



// {
// $(document).ready(function() {
//     // Load data from PHP when the page loads
//     loadDataFromPHP();
// });

// function loadDataFromPHP() {
//     $.ajax({
//         type: "GET",
//         url: "load_data.php", // Change the URL to the PHP script that fetches data from the database
//         success: function(response) {
//             // Parse the JSON response
//             let arrays = JSON.parse(response);
//             // Call Display function to render the data on the page
//             Display(arrays);
//         },
//         error: function(xhr, status, error) {
//             console.error("Error loading data:", error);
//         }
//     });
// }

// function Display(arrays, searchValue="") {
//     $("#display_names").empty();

//     arrays.filter(
//         (item) =>
//           item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
//           item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
//           item.phone.toLowerCase().includes(searchValue.toLowerCase())
//       )
//       .map((array, index) => {
//         let arrayItemDiv = $("<div>").addClass("array_item").text(`${index + 1}. ${array.name.toUpperCase()}`);
//         arrayItemDiv.dblclick(() => {
//             view(array);
//         });
//         let buttonWrapper = $("<span>").addClass("button_wrapper");

//         let editButton = $("<button>").text("Edit").addClass("edit_button").attr("id", "edit_button_display").click(() => {
//             edit(array);
//         });

//         let deleteButton = $("<button>").text("Delete").addClass("edit_button").click(() => {
//             to_delete(array);
//         });

//         buttonWrapper.append(editButton, deleteButton); 

//         arrayItemDiv.append(buttonWrapper);
//         $("#display_names").append(arrayItemDiv);
//     });
// }

// {
//     <?php
// include_once 'connection.php';


// $query = "SELECT * FROM phoneBookTable";

// // Perform the query
// $result = mysqli_query($conn, $query);

// // Check if the query was successful
// if ($result) {
//     // Create an empty array to store the data
//     $data = array();

//     // Fetch each row from the result set
//     while ($row = mysqli_fetch_assoc($result)) {
//         // Add each row to the data array
//         $data[] = $row;
//     }

//     // Close the result set
//     mysqli_free_result($result);

//     // Encode the data array as JSON and output it
//     echo json_encode($data);
// } else {
//     // If the query fails, output an error message
//     echo "Error: " . mysqli_error($conn);
// }

// // Close the database connection
// mysqli_close($conn);
// ?>

// }

// }
