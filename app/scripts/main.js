$(function() {
    $(':file').filestyle({icon: false});

    setTimeout(function() {
        $('input[type="file"]').click();
    }, 100);
});

