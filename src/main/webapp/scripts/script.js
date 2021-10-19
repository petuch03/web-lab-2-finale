let X, Y, R_form;
R_form = 1;
let ALERT = '';

function button(value) {
    X = value;
}

function validateX() {
    if (X === undefined) {
        ALERT += "\n" + "Choose any X option;";
        return false;
    }

    return true;
}

function validateR() {
    let yButtons = document.getElementsByName('rVal');
    let yCounter = 0;
    yButtons.forEach(checkBox => {
        if (checkBox.checked)
            yCounter++;
    })
    if (yCounter > 1) {
        ALERT += "\n" + "Choose only 1 R option;";
        return false;
    }
    if (yCounter === 0) {
        ALERT += "\n" + "Choose any R option;";
        return false;
    }
    R_form = document.querySelector('input[name="rVal"]:checked').value;
    return true;
}

function validateY() {
    let y = document.getElementById("yValue");
    if (y.value.trim() === "") {
        ALERT += "\n" + "Y value must not be null;";
        return false;
    }
    y.value = y.value.replace(',', '.');
    if (!(y.value && !isNaN(y.value))) {
        ALERT += "\n" + "Y must be a number;";
        return false;
    }
    if (y.value <= -3 || y.value >= 3) {
        ALERT += "\n" + "Y must be in the following interval: (-3; 3);";
        return false;
    }
    y.value = parseFloat(y.value);
    Y = y.value;
    return true;
}

function validateForm() {
    return validateX() & validateY() & validateR();
}

function cal() {
    if (!validateForm()) {
        alert(ALERT);
        ALERT = '';
    } else {
        $.get('ControllerServlet', {
            'x': X,
            'y': Y,
            'r': R_form,
        }).done(function (data) {
            let arr = JSON.parse(data);
            if (arr.res === "yes") {
                drawPoint(arr.x, arr.y, arr.r, "#22be00");
            } else {
                drawPoint(arr.x, arr.y, arr.r, "#ff0000");
            }
            let row = '<tr>';
            row += '<td>' + arr.x + '</td>';
            row += '<td>' + arr.y + '</td>';
            row += '<td>' + arr.r + '</td>';
            row += '<td>' + arr.res + '</td>';
            row += '<td>' + arr.duration + '</td>';
            row += '<td>' + arr.current + '</td>';
            row += '</tr>';
            $('#tableWithResults tr:first').after(row);
        }).fail(function (err) {
            alert(err);
        });
    }
}

function clear_table() {
    $.get('ClearSessionServlet')
        .fail(function (err) {
            alert(err);
        });
    for (let i = document.getElementById("tableWithResults").rows.length; i > 1; i--) {
        document.getElementById("tableWithResults").deleteRow(i - 1);
    }

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas();
}