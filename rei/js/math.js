class NumberRange {
    start;
    end;

    constructor(start, end) {
        var startValue = Number(start);
        var endValue = Number(end);

        if (Number.isNaN(startValue)) {
            throw "Start value cannot be NaN"
        }
        if (Number.isNaN(endValue)) {
            throw "End value cannot be NaN"
        }

        this.start = Math.min(startValue, endValue);
        this.end = Math.max(startValue, endValue);
    }

    isEqual(other) {
        return Object.is(this.start, other.start) && Object.is(this.end, other.end);
    }
}
