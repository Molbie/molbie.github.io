class NumberRange {
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

    contains(value) {
        return value >= this.start && value < this.end;
    }

    isEqual(other) {
        return Object.is(this.start, other.start) && Object.is(this.end, other.end);
    }
}
class NumberStats {
    constructor(values) {
        this.values = values;
        this.values.sort(function(a, b) {
            return a - b;
        });
    }

    isEmpty() {
        return this.values.length == 0;
    }

    count() {
        return this.values.length;
    }

    min() {
        return this.values[0];
    }

    max() {
        return this.values[this.values.length - 1];
    }

    sum() {
        var total = 0;
        var count = this.values.length;

        for (var i = 0; i < count; i += 1) {
            total += this.values[i];
        }

        return total;
    }

    mean() {
        return this.sum() / this.values.length;
    }

    median() {
        var median = 0;
        var count = this.values.length;
        
        if (count % 2 === 0) {
            median = (this.values[count / 2 - 1] + this.values[count / 2]) / 2;
        } else {
            median = this.values[(count - 1) / 2];
        }
        
        return median;
    }

    range() {
        var count = this.values.length;

        if (count >= 2) {
            return new NumberRange(this.values[0], this.values[count - 1]);
        } else if (count >= 1) {
            return new NumberRange(this.values[0], this.values[0]);
        }

        return new NumberRange(0, 0);
    }
}