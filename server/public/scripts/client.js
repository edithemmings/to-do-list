$('document').ready(onReady);

function onReady() {
    $('#submitBtn').on('click', handleSubmit)
    $('#clearAllBtn').on('click', handleClearAll)
    getTasks();
}

//GET request
function getTasks(){
    console.log( ' in get request')
    //ajax get request
}

function handleSubmit(){
    console.log('submit');
    // grabs input and assigns it to variable
    let newTask = $('#taskIn').val();
    // call my get request to server
    addTask(newTask);
    // clear out the input field after submission
    $('#taskIn').val('');
}

// make a POST request to server
function addTask( taskToAdd ){
    console.log( taskToAdd )
    //ajax post request
}







// DELETE REQUEST
function handleClearAll(){
    console.log('clear all');
}