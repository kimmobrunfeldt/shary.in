 var _ = {};

 _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
};

function fadeToLoader() {
    $('#dropzone').addClass('hidden');
    $('.loader-container').removeClass('hidden');
}


function resetView() {
    $('#dropzone').removeClass('hidden');
    $('.loader-container').addClass('hidden');
}

$(function() {

    $('html').removeClass('no-js');

    Dropzone.options.dropzone = {
        url: "/api/upload",  // Override the fallback which will pas redirect parameter
        paramName: 'file',  // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 10,  // MB
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'Upload image',
        createImageThumbnails: false,
        previewsContainer: '#hidden',
        fallback: function() {
            $('html').addClass('no-js');
        }
    };

    // Disabling autoDiscover, otherwise Dropzone will try to attach twice.
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone('#dropzone');

    dropzone.on('success', function(file, response) {
        if (response.name === undefined) {
            window.alert('Unknown error while uploading');
            return;
        }

        window.location.href = response.name;
    });

    dropzone.on('sending', function(file) {
        fadeToLoader();
    });

    dropzone.on('error', function(file, errorMessage) {
        if (_.has(errorMessage, 'error') && _.has(errorMessage.error, 'message')) {
            window.alert('Error from server: ' + errorMessage.error.message);
        } else {
            window.alert(errorMessage.toString());
        }
        resetView();
    });

    dropzone.on('complete', function(file, errorMessage) {
        dropzone.removeAllFiles();
    });

});
