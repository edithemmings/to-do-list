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
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response)
    }).catch( function (error) {
        console.log('ERROR in client side get request:', error)
    });
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
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {content: taskToAdd}
    }).then(function (response) {
        console.log('back from the server with:', response);
        getTasks();
    }).catch ( function (error) {
        console.log('error in the POST request', error)
    })
}







// DELETE REQUEST
function handleClearAll(){
    console.log('clear all');
}