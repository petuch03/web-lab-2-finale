<%@ page import="entity.Hit" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.io.IOException" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>lab 2</title>
    <link rel="stylesheet" href="decorations/style.css">
    <link rel="icon" type="image/png" href="decorations/pic.png"/>
    <meta name="author" content="petuch03"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>


<body>
<div class="wrapper">

    <div id="header">
        <header>
            Safronov Egor Mikhailovich P3213, Task 5215
        </header>
    </div>

    <div id="checkForm">
        <div class="xLocator">
            <div id="area_x" class="box">
                <p><label class="center">Choose your X value:</label></p>
                <p><label><input class="xValue first-line" name="xVal" type="button" value="-4" onclick="button(-4)">
                </label>
                    <label><input class="xValue first-line" name="xVal" type="button" value="-3" onclick="button(-3)">
                    </label>
                    <label><input class="xValue first-line" name="xVal" type="button" value="-2" onclick="button(-2)">
                    </label>
                    <label><input class="xValue first-line" name="xVal" type="button" value="-1" onclick="button(-1)">
                    </label>
                <p><label><input class="xValue second-line" name="xVal" type="button" value="0" onclick="button(0)">
                </label>
                <p><label><input class="xValue last-line" name="xVal" type="button" value="1" onclick="button(1)">
                </label>
                    <label><input class="xValue last-line" name="xVal" type="button" value="2" onclick="button(2)">
                    </label>
                    <label><input class="xValue last-line" name="xVal" type="button" value="3" onclick="button(3)">
                    </label>
                    <label><input class="xValue last-line" name="xVal" type="button" value="4" onclick="button(4)">
                    </label>
            </div>
        </div>

        <div class="yLocator">
            <div id="area_y" class="box">
                <p><label for="yValue">Input your Y value:</label></p>
                <input type="text" id="yValue" name="yVal" maxlength="9" placeholder="from -3 to 3">
            </div>
        </div>

        <div class="rLocator">
            <div id="area_r" class="box">
                <p><label class="center">Choose your R value:</label></p>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="1" checked> 1 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="1.5"> 1.5 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="2"> 2 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value='2.5'> 2.5 </label>
                <p><label><input class="rValue" name="rVal" type="checkbox" value="3"> 3 </label>
            </div>
        </div>

        <div class="sLocator">
            <div id="area_submit">
                <p>
                    <button type="submit" id="formSubmit" onclick="cal()">Check</button>
                </p>
            </div>
        </div>

        <div class="cLocator">
            <div id="area_clear">
                <p>
                    <button type="submit" id="clear" onclick="clear_table()">Clear</button>
                </p>
            </div>
        </div>

    </div>

    <div id="area_diagram">
        <%--    <img src="decorations/pic.png" class="diagram" alt="pic with coordinates">--%>
        <canvas class="diagram" id="myCanvas" width="374px" height="374px">
        </canvas>
    </div>

    <div id="tLocator">
        <table id="tableWithResults">
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>res</th>
                <th>duration</th>
                <th>now</th>
            </tr>
            <%
                List<Hit> history = (List<Hit>) request.getSession().getAttribute("history");
                if (history != null) {
                    for (Hit hit : history) {
                        NumberFormat decimalFormat = new DecimalFormat("#.#######");
                        String res = hit.isCheckHit() ? "yes" : "no";

                        String htmlInstance = "<tr>";
                        htmlInstance += "<td>" + decimalFormat.format(hit.getX()) + "</td>";
                        htmlInstance += "<td>" + decimalFormat.format(hit.getY()) + "</td>";
                        htmlInstance += "<td>" + decimalFormat.format(hit.getR()) + "</td>";
                        htmlInstance += "<td>" + res + "</td>";
                        htmlInstance += "<td>" + decimalFormat.format(hit.getDuration()) + "</td>";
                        htmlInstance += "<td>" + hit.getCurrent() + "</td>";
                        htmlInstance += "</tr>";

                        try {
                            out.println(htmlInstance);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            %>
        </table>
    </div>
</div>
</body>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="scripts/script.js"></script>
<script type="text/javascript" src="scripts/draw.js"></script>
<script type="text/javascript" src="scripts/onstart.js"></script>
<%--<script type="text/javascript" src="scripts/dbInit.js"></script>--%>
</html>
