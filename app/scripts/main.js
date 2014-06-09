function fadeToLoader() {
    $('#dropzone').fadeOut(function() {
        $('.loader').removeClass('hidden').fadeIn();
    });
}


function resetView() {
    $('.loader').addClass('hidden');
    $('#dropzone').show();
}

$(function() {

    Dropzone.options.dropzone = {
        paramName: 'file',  // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 10,  // MB
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'Upload image',
        createImageThumbnails: false,
        previewsContainer: '#hidden',
        fallback: function() {
            $('#dropzone').css('color', 'black').css('background-color', 'white');
        }
    };

    // Disabling autoDiscover, otherwise Dropzone will try to attach twice.
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone('#dropzone');

    dropzone.on('success', function(file, response) {
        window.location.href = response.name;
    });

    dropzone.on('sending', function(file) {
        fadeToLoader();
    });

    dropzone.on('error', function(file, errorMessage) {
        window.alert(errorMessage);
    });

    dropzone.on('complete', function(file, errorMessage) {
    });

});

