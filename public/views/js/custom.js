'use strict';

$(document).ready(function () {
    $('#submitBtn').on('click', function (e) {
        e.preventDefault();
        var toNumber = $('#toNumber').val();
        var fromNumber = $('#fromNumber').val();
        var callData = {
            "toNumber": toNumber,
            "fromNumber": fromNumber
        };
        $.ajax({
            url: "/makecall",
            type: "POST",
            data: JSON.stringify(callData),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function success(response) {
                $('#response').html('calling');
            }
        });
    });
});
//# sourceMappingURL=custom.js.map