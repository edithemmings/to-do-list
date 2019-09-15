$('document').ready(onReady);

function onReady() {
    $('#submitBtn').on('click', handleSubmit)
    getTasks();
}

//GET request
function getTasks(){
    //ajax get request
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response)
        refreshDom(response);
    }).catch( function (error) {
        console.log('ERROR in client side get request:', error)
    });
}

function refreshDom(arr){
    console.log('dom refresh')
    $('#todolist').empty();
    $('#donelist').empty();
    for (i in arr) {
        // if task is marked as NOT done, append to the to do list
        if (!arr[i].done) { 
            $('#todolist').append(`
                <li data-id="${arr[i].id}">
                    <button class="completeBtn btn btn-outline-success">✔</button>
                    ${arr[i].content}
                    <button class="deleteBtn btn btn-outline-danger">✖</button>
                </li>
            `)
            // still need to add/remove class to mark done
        }
        // if task IS done, append it to done list
        else if (arr[i].done) { 
            $('#donelist').append(`
                <li data-id="${arr[i].id}" class = "completedTask">
                    ${arr[i].content}
                    <button class="deleteBtn btn btn-outline-danger">✖</button>
                </li>`)
        } else {
            console.log('ERROR! Cannot figure out whether task is done')
        }
    }// for
    $('.completeBtn').on('click', completeTask)
    $('.deleteBtn').on('click', areYouSure)
    $('#myInput').val('')
}

function areYouSure(){
    let taskId = $(this).parent().data('id');
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Poof! Your task has been deleted!", {
                icon: "success",
            });
            deleteTask(taskId)
        } else {
            swal("Your task is safe!");
        }
    });
}

function handleSubmit(){
    // grabs input and assigns it to variable
    let newTask = $('#taskIn').val();
    // call my get request to server
    if (newTask){
        addTask(newTask);
        // clears out input field
        $('#taskIn').val('');
    } else {
        alert ('Input is empty')
    }
}

// make a POST request to server
function addTask( taskToAdd ){
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

//DELETE REQUEST
function deleteTask(taskId){
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        console.log(response)
        getTasks();
    })
}

// PUT REQUEST
function completeTask(){
    let taskId = $(this).parent().data('id');
    console.log(taskId)
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        console.log(response)
        getTasks();
    })
}