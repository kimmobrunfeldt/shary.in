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
    $('#progress').val(0).trigger('change');
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

    var unknownProgressTimer;

    $('html').removeClass('no-js');

    Dropzone.options.dropzone = {
        url: "/api/upload",  // Override the fallback which will pas redirect parameter
        paramName: 'file',  // The name that will be used to transfer the file
        maxFiles: 1,
        maxFilesize: 50,  // MB
        acceptedFiles: 'video/*,image/*,audio/*',
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

        // We try to show progress in the bar, but if we don't get
        // any progress information, it is better to show generic loader spinner
        unknownProgressTimer = setTimeout(function showLoader() {
            showElement('.loader-container');
        }, 2000);
    });

    dropzone.on('error', function(file, errorMessage) {
        if (_.has(errorMessage, 'error') && _.has(errorMessage.error, 'message')) {
            window.alert('Error from server: ' + errorMessage.error.message);
        } else {
            window.alert(errorMessage.toString());
        }

        if (unknownProgressTimer) {
            clearTimeout(unknownProgressTimer);
        }

        reset();
    });

    dropzone.on('complete', function(file, errorMessage) {
        dropzone.removeAllFiles();
    });

    dropzone.on('uploadprogress', function(file, percent) {
        if (unknownProgressTimer) {
            clearTimeout(unknownProgressTimer);
        }

        $('#progress').val(percent).trigger('change');
    });

    $('.knob').knob();
});
