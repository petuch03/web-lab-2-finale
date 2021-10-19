package entity;

public class Hit {
    private final double x;
    private final double y;
    private final double r;
    private final String current;
    private final boolean isHit;
    private final double duration;

    public Hit(double x, double y, double r, String current, boolean isHit, double duration) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.current = current;
        this.isHit = isHit;
        this.duration = duration;
    }

    public String getCurrent() {
        return current;
    }

    public boolean isCheckHit() {
        return isHit;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public double getDuration() {
        return duration;
    }
}