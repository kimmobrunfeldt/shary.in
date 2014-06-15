 var _ = {};

 _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
};

var elements = ['.dropzone', '.progress-container', '.loader-container'];


function showElement(className) {
    for (var i = 0; i < elements.length; ++i) {
        $(elements[i]).addClass('hidden');
    }

    $(className).removeClass('hidden');
}

function reset() {
    showElement('.dropzone');
}

window.onpageshow = function(event) {
    if (event.persisted) {
        // Page is loaded from browser back cache
        // This happens when back button is pressed in mobile browsers
        reset();
    }
};

window.onunload = function() {};  // Prevent back button cache

$(function() {

    $('html').removeClass('no-js');

    Dropzone.options.dropzone = {
        url: "/api/upload",  // Override the fallback which will pas redirect parameter
        paramName: 'file',  // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 50,  // MB
        acceptedFiles: 'video/*,image/*',
        dictDefaultMessage: 'Upload image',
        createImageThumbnails: false,
        previewsContainer: '#hidden',
        fallback: function() {
            $('html').addClass('no-js');
        }
    };

    // Disabling autoDiscover, otherwise Dropzone will try to attach twice.
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone('.dropzone');

    dropzone.on('success', function(file, response) {
        if (response.name === undefined) {
            window.alert('Unknown error while uploading');
            return;
        }

        showElement('.loader-container');
        window.location.href = response.name;
    });

    dropzone.on('sending', function(file) {
        showElement('.progress-container');
    });

    dropzone.on('error', function(file, errorMessage) {
        if (_.has(errorMessage, 'error') && _.has(errorMessage.error, 'message')) {
            window.alert('Error from server: ' + errorMessage.error.message);
        } else {
            window.alert(errorMessage.toString());
        }

        reset();
    });

    dropzone.on('complete', function(file, errorMessage) {
        dropzone.removeAllFiles();
    });

    dropzone.on('uploadprogress', function(file, percent) {
        $('#progress').val(percent).trigger('change');
    });

    $('.knob').knob();
});
