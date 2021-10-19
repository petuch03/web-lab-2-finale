const canvas = document.getElementById('myCanvas');
let R_canvas = 1;
const offset = 5;

function validateR_canvas() {
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
    R_canvas = (document.querySelector('input[name="rVal"]:checked').value !== undefined ? document.querySelector('input[name="rVal"]:checked').value : undefined);
    return true;
}

canvas.addEventListener('click', function (event) {
    if (!validateR_canvas()) {
        alert(ALERT);
        ALERT='';
    } else {

        console.log('r from canvas: ' + R_canvas);

        let pos = getMousePos(canvas, event);

        let xFromCanvas = (pos.x - (canvas.width / 2)) / (canvas.height / 3) * R_canvas;
        console.log('x from canvas ; pos.x: ' + xFromCanvas + ' ; ' + pos.x);

        if (xFromCanvas < -4) xFromCanvas = -4;
        else if (xFromCanvas > 4) xFromCanvas = 4;

        let yFromCanvas = ((canvas.height / 2) - pos.y) / (canvas.height / 3) * R_canvas;
        console.log('y from canvas ; pos.y: ' + yFromCanvas + ' ; ' + pos.y);

        if (yFromCanvas <= -3) yFromCanvas = -3;
        else if (yFromCanvas >= 3) yFromCanvas = 3;

        $.get("ControllerServlet", {
            'x': xFromCanvas,
            'y': yFromCanvas,
            'r': R_canvas,
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
})

// width / 2 + x * scale
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left - offset,
        y: evt.clientY - rect.top - offset
    };
}

function drawPoint(xPosition, yPosition, radius, color) {

    let xABS = (canvas.width / 2) + (canvas.width / 3) * xPosition / radius;
    let yABS = (canvas.height / 2) - (canvas.height / 3) * yPosition / radius;

    if (xABS < 0) xABS = 0;
    else if (xABS > canvas.width) xABS = canvas.width;

    if (yABS < 0) yABS = 0;
    else if (yABS > canvas.height) yABS = canvas.height;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(xABS, yABS);
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    ctx.arc(xABS, yABS, 2.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawCanvas() {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const xAxis = width / 2;
    const yAxis = height / 2;
    const xNameAxis = width / 6;
    const yNameAxis = height / 6;

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, height);
    ctx.moveTo(0, yAxis);
    ctx.lineTo(width, yAxis);
    ctx.stroke();
    ctx.closePath();

    let labels = ["R", "R/2", " ", "-R/2", "-R"];
    ctx.font = '15px Optima';
    ctx.fillText("y", xAxis + offset, offset * 2);
    ctx.moveTo(xAxis - offset / 2, offset);
    ctx.lineTo(xAxis, 0);
    ctx.moveTo(xAxis + offset / 2, offset);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xAxis - offset / 2, yNameAxis + yNameAxis * i);
        ctx.lineTo(xAxis + offset / 2, yNameAxis + yNameAxis * i);
        ctx.stroke();
        ctx.fillText(labels[i], xAxis + offset, yNameAxis + yNameAxis * i + offset);
    }

    ctx.fillText("x", width - offset * 2, yAxis + 20);
    ctx.moveTo(width - offset, yAxis - offset / 2);
    ctx.lineTo(width, yAxis);
    ctx.moveTo(width - offset, yAxis + offset / 2);
    ctx.lineTo(width, yAxis);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offset / 2);
        ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offset / 2);
        ctx.stroke();
        ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offset, yAxis + 20);
    }

    ctx.fillStyle = "#51b1e3";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(xAxis - xNameAxis, yAxis, xNameAxis, 2 * yNameAxis);

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis + xNameAxis, yAxis);
    ctx.lineTo(xAxis, yAxis + 2 * yNameAxis);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);

    ctx.arc(xAxis, yAxis, xAxis - 2 * xNameAxis, Math.PI * 1.5, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

drawCanvas();