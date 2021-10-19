package servlets;
import entity.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.*;

import static java.lang.Math.pow;

public class AreaCheckServlet extends HttpServlet {


    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double startTime = System.nanoTime();
        PrintWriter out = resp.getWriter();

        Hit hit = createInstance(req, startTime);
        List<Hit> history = (List<Hit>) req.getSession().getAttribute("history");
        if (history == null) {
            history = Stream
                    .of(hit)
                    .collect(Collectors.toList());
        } else {
            history.add(0, hit);
        }
        req.getSession().setAttribute("history", history);
        out.println(getJSON(hit.getX(), hit.getY(), hit.getR(), hit.isCheckHit(), hit.getCurrent(), hit.getDuration()));

        out.close();
    }

    private Hit createInstance(HttpServletRequest request, double startTime) {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));
        String current = new SimpleDateFormat("HH:mm:ss").format(new Date());

        return new Hit(x, y, r, current, check(x, y, r), (System.nanoTime() - startTime) / 10000000d);
    }

    private String getJSON(double x, double y, double r, boolean isHit, String current, double duration) {
        NumberFormat decimalFormat = new DecimalFormat("#.#######");
        String res = isHit ? "yes" : "no";

        String jsonInstance = "{";
        jsonInstance += "\"x\":" + decimalFormat.format(x) + ',' +
                "\"y\":" + decimalFormat.format(y) + ',' +
                "\"r\":" + decimalFormat.format(r) + ',' +
                "\"res\":"  + "\"" + res + "\""  + ',' +
                "\"duration\":" + decimalFormat.format(duration) + ',' +
                "\"current\":" + "\"" + current + "\"" + "}";

        return jsonInstance;
    }

//    private String getHTMLrow(double x, double y, double r, boolean isHit, String current, double duration) {
//        NumberFormat decimalFormat = new DecimalFormat("#.#######");
//        String res = isHit ? "yes" : "no";
//
//        String htmlInstance = "<tr>";
//        htmlInstance += "<td>" + decimalFormat.format(x) + "</td>";
//        htmlInstance += "<td>" + decimalFormat.format(y) + "</td>";
//        htmlInstance += "<td>" + decimalFormat.format(r) + "</td>";
//        htmlInstance += "<td>" + res + "</td>";
//        htmlInstance += "<td>" + decimalFormat.format(duration) + "</td>";
//        htmlInstance += "<td>" + current + "</td>";
//        htmlInstance += "</tr>";
//
//        return htmlInstance;
//    }

    private boolean rectangle(double xValue, double yValue, double rValue) {
        return (xValue <= 0) && (yValue <= 0) && (xValue >= -(rValue / 2)) && (yValue >= -(rValue));
    }

    private boolean circle(double xValue, double yValue, double rValue) {
        return (xValue >= 0) && (yValue >= 0) && (pow(xValue, 2) + pow(yValue, 2) <= (pow(rValue / 2, 2)));
    }

    private boolean triangle(double xValue, double yValue, double rValue) {
        return (xValue >= 0) && (yValue <= 0) && (yValue >= (2 * xValue - rValue));
    }

    private boolean check(double xValue, double yValue, double rValue) {
        return rectangle(xValue, yValue, rValue) || circle(xValue, yValue, rValue) || triangle(xValue, yValue, rValue);
    }
}
