class RuleIdentifier {
    static populationGrowth() { 
        return "populationGrowth"; 
    }
    static householdMedianIncomeGrowth() { 
        return "householdMedianIncomeGrowth"; 
    }
    static houseValueGrowth() { 
        return "houseValueGrowth"; 
    }
    static isValid(value) {
        var result = false;

        switch (value) {
            case RuleIdentifier.populationGrowth():
            case RuleIdentifier.householdMedianIncomeGrowth():
            case RuleIdentifier.houseValueGrowth():
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
class RuleConditionDTO {
    constructor(geography, identifier, valueStart, valueEnd, rate, yearRate) {
        if (!CensusGeography.isValid(geography)) {
            throw "Invalid geography";
        }
        if (!RuleIdentifier.isValid(identifier)) {
            throw "Invalid identifier";
        }
        var rateValue = Number(rate);
        var yearRateValue = Number(yearRate);

        if (Number.isNaN(rateValue)) {
            throw "Rate value cannot be NaN"
        }
        if (Number.isNaN(yearRateValue)) {
            throw "Year rate value cannot be NaN"
        }

        this.geography = geography;
        this.identifier = identifier;
        this.valueRange = new NumberRange(valueStart, valueEnd);
        this.rate = rateValue;
        this.yearRate = yearRateValue;
    }

    isEqual(other) {
        return Object.is(this.geography, other.geography) 
            && Object.is(this.identifier, other.identifier)
            && valueRange.isEqual(other.valueRange)
            && Object.is(this.rate, other.rate)
            && Object.is(this.yearRate, other.yearRate);
    }
}
class RuleDTO {
    constructor(geography, identifier, targetYears, isActive, conditions) {
        if (!CensusGeography.isValid(geography)) {
            throw "Invalid geography";
        }
        if (!RuleIdentifier.isValid(identifier)) {
            throw "Invalid identifier";
        }
        var targetYearsValue = Number(targetYears);

        if (Number.isNaN(targetYearsValue)) {
            throw "Target years cannot be NaN"
        } else if (!Number.isInteger(targetYearsValue)) {
            throw "Target years needs to be an integer"
        }

        this.geography = geography;
        this.identifier = identifier;
        this.targetYears = targetYearsValue;
        this.isActive = isActive == true;
        this.conditions = conditions;
    }

    add(condition) {
        var shouldAdd = true;

        for (index = 0; index < conditions.length; index++) {
            if (conditions[index].isEqual(condition)) {
                shouldAdd = false;
                break;
            }
        }

        if (shouldAdd) {
            this.conditions.push(condition);
        }
    }
}
class RuleCondition {
    get geography() {
        return this.dto.geography;
    }
    get identifier() {
        return this.dto.identifier;
    }
    get valueRange() {
        return this.dto.valueRange;
    }
    get rate() {
        return this.dto.rate;
    }
    get yearRate() {
        return this.dto.yearRate;
    }

    constructor(dto) {
        this.dto = dto;
    }

    update(geography, identifier, valueStart, valueEnd, rate, yearRate) {
        this.dto = new RuleConditionDTO(geography ?? this.geography,
                                        identifier ?? this.identifier,
                                        valueStart ?? this.valueRange.start,
                                        valueEnd ?? this.valueRange.end,
                                        rate ?? this.rate,
                                        yearRate ?? this.yearRate);
    }

    makeNext() {
        var upperValue = Math.min(this.valueRange.end + 1, Number.MAX_VALUE);
        var data = new RuleConditionDTO(this.geography,
                                        this.identifier,
                                        this.valueRange.end,
                                        upperValue,
                                        this.rate,
                                        this.yearRate);

        return new RuleCondition(data);
    }

    isEqual(other) {
        return dto.isEqual(other.dto);
    }

    static makeDefaultPopulationGrowth(geography) {
        var data = new RuleConditionDTO(geography, 
                                        RuleIdentifier.populationGrowth(), 
                                        0, 
                                        250_000, 
                                        30, 
                                        2);

        return new RuleCondition(data);
    }

    static makeDefaultHouseholdMedianIncomeGrowth(geography) {
        var data = new RuleConditionDTO(geography,
                                        RuleIdentifier.householdMedianIncomeGrowth(),
                                        0,
                                        100_000_000_000,
                                        30,
                                        2);
        
        return new RuleCondition(data);
    }

    static makeDefaultHouseValueGrowth(geography) {
        var data = new RuleConditionDTO(geography,
                                        RuleIdentifier.houseValueGrowth(),
                                        0,
                                        100_000_000_000,
                                        40,
                                        2.5);
        
        return new RuleCondition(data);
    }
}
class Rule {
    get geography() {
        return this.dto.geography;
    }
    get identifier() {
        return this.dto.identifier;
    }
    get targetYears() {
        return this.dto.targetYears;
    }
    get isActive() {
        return this.dto.isActive;
    }
    get conditions() {
        return this.dto.conditions.map(function(condition) { return new RuleCondition(condition); });
    }

    constructor(dto) {
        this.dto = dto;
    }

    update(geography, identifier, targetYears, isActive, conditions) {
        var rawConditions = []
        if (conditions) {
            rawConditions = conditions.map(function(condition){ return condition.dto; })
        }
        this.dto = new RuleDTO(geography ?? this.geography, 
                               identifier ?? this.identifier, 
                               targetYears ?? this.targetYears, 
                               isActive ?? this.isActive, 
                               rawConditions ?? this.dto.conditions);
    }
}
class RuleGradingSystem {
    static letters() { 
        return "letters";
    }
    static passFail() { 
        return "passFail";
    }
    static isValid(value) {
        var result = false;

        switch (value) {
            case RuleGradingSystem.letters():
            case RuleGradingSystem.passFail():
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
class RuleGrade {
    static aPlus() { 
        return "aPlus";
    }
    static a() { 
        return "a";
    }
    static aMinus() { 
        return "aMinus";
    }
    static bPlus() { 
        return "bPlus";
    }
    static b() { 
        return "b";
    }
    static bMinus() { 
        return "bMinus";
    }
    static cPlus() { 
        return "cPlus";
    }
    static c() { 
        return "c";
    }
    static cMinus() { 
        return "cMinus";
    }
    static dPlus() { 
        return "dPlus";
    }
    static d() { 
        return "d";
    }
    static dMinus() { 
        return "dMinus";
    }
    static f() { 
        return "f";
    }
    static notApplicable() { 
        return "notApplicable";
    }

    get letter() {
        switch (this.type) {
            case RuleGrade.aPlus():
            case RuleGrade.a():
            case RuleGrade.aMinus():
                return "A";
                break;
            case RuleGrade.bPlus():
            case RuleGrade.b():
            case RuleGrade.bMinus():
                return "B";
                break;
            case RuleGrade.cPlus():
            case RuleGrade.c():
            case RuleGrade.cMinus():
                return "C";
                break;
            case RuleGrade.dPlus():
            case RuleGrade.d():
            case RuleGrade.dMinus():
                return "D";
                break;
            case RuleGrade.f():
                return "F";
                break;
            case RuleGrade.notApplicable():
            default:
                return "-";
                break;
        }
    }

    get modifier() {
        switch (this.type) {
            case RuleGrade.aPlus():
            case RuleGrade.bPlus():
            case RuleGrade.cPlus():
            case RuleGrade.dPlus():
                return "+";
                break;
            case RuleGrade.aMinus():
            case RuleGrade.bMinus():
            case RuleGrade.cMinus():
            case RuleGrade.dMinus():
                return "-";
                break;
            case RuleGrade.a():
            case RuleGrade.b():
            case RuleGrade.c():
            case RuleGrade.d():
            case RuleGrade.f():
            case RuleGrade.notApplicable():
            default:
                return "";
                break;
        }
    }

    get rate() {
        if (Number.isNaN(this.value)) {
            return "-";
        } else {
            return (this.value * 100).toFixed(2) + "%";
        }
    }

    constructor(percent, value) {
        if (percent != null && value != null && !Number.isNaN(percent) && !Number.isNaN(value)) {
            if (percent >= 1.0) {
                this.type = RuleGrade.aPlus();
            } else if (percent >= 0.93) {
                this.type = RuleGrade.a();
            } else if (percent >= 0.90) {
                this.type = RuleGrade.aMinus();
            } else if (percent >= 0.87) {
                this.type = RuleGrade.bPlus();
            } else if (percent >= 0.83) {
                this.type = RuleGrade.b();
            } else if (percent >= 0.80) {
                this.type = RuleGrade.bMinus();
            } else if (percent >= 0.77) {
                this.type = RuleGrade.cPlus();
            } else if (percent >= 0.73) {
                this.type = RuleGrade.c();
            } else if (percent >= 0.70) {
                this.type = RuleGrade.cMinus();
            } else if (percent >= 0.67) {
                this.type = RuleGrade.dPlus();
            } else if (percent >= 0.63) {
                this.type = RuleGrade.d();
            } else if (percent >= 0.60) {
                this.type = RuleGrade.dMinus();
            } else {
                this.type = RuleGrade.f();
            }
        } else {
            this.type = RuleGrade.notApplicable();
        }

        this.percent = percent;
        this.value = value;
    }

    stringValue(gradingSystem) {
        if (!RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail():
                switch (this.type) {
                    case RuleGrade.aPlus():
                        return "P";
                        break;
                    case RuleGrade.notApplicable():
                        return this.letter + this.modifier;
                        break;
                    default:
                        return "F";
                        break;
                }
                break;
            default:
                return this.letter + this.modifier;
                break;
        }
    }

    title(gradingSystem) {
        if (!RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail():
                switch (this.type) {
                    case RuleGrade.aPlus():
                        return "Pass";
                        break;
                    case RuleGrade.notApplicable():
                        return "No Data";
                        break;
                    default:
                        return "Fail";
                        break;
                }
                break;
            default:
                switch (this.type) {
                    case RuleGrade.notApplicable():
                        return "No Data";
                        break;
                    default:
                        return this.stringValue(gradingSystem);
                        break;
                }
                break;
        }
    }

    color(gradingSystem) {
        if (!RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail():
                switch (this.type) {
                    case RuleGrade.aPlus():
                        return MBColor.mbGradeAPlus();
                        break;
                    case RuleGrade.notApplicable():
                        return MBColor.mbClear();
                        break;
                    default:
                        return MBColor.mbGradeF();
                        break;
                }
                break;
            case RuleGradingSystem.letters():
            default:
                switch (this.type) {
                    case RuleGrade.aPlus():
                        return MBColor.mbGradeAPlus();
                        break;
                    case RuleGrade.a():
                        return MBColor.mbGradeA();
                        break;
                    case RuleGrade.aMinus():
                        return MBColor.mbGradeAMinus();
                        break;
                    case RuleGrade.bPlus():
                        return MBColor.mbGradeBPlus();
                        break;
                    case RuleGrade.b():
                        return MBColor.mbGradeB();
                        break;
                    case RuleGrade.bMinus():
                        return MBColor.mbGradeBMinus();
                        break;
                    case RuleGrade.cPlus():
                        return MBColor.mbGradeCPlus();
                        break;
                    case RuleGrade.c():
                        return MBColor.mbGradeC();
                        break;
                    case RuleGrade.cMinus():
                        return MBColor.mbGradeCMinus();
                        break;
                    case RuleGrade.dPlus():
                        return MBColor.mbGradeDPlus();
                        break;
                    case RuleGrade.d():
                        return MBColor.mbGradeD();
                        break;
                    case RuleGrade.dMinus():
                        return MBColor.mbGradeDMinus();
                        break;
                    case RuleGrade.f():
                        return MBColor.mbGradeF();
                        break;
                    case RuleGrade.notApplicable():
                    default:
                        return MBColor.mbClear();
                        break;
                }
                break;
        }
    }
}
class PopulationGrowthGrader {
    evaluate(geoData, rule) {
        var lastYear = null;
        var lastValue = null;
        var firstYear = null;
        var firstValue = null;

        GeoData.years().forEach(function(year, index) {
            var value = geoData.getPopulationTotal(year);

            if (lastValue == null) {
                lastYear = year;
                lastValue = value;
            }
            
            if (value != null) {
                firstYear = year;
                firstValue = value;
            }
        });

        if (firstValue == null || lastValue == null || firstYear == lastYear) {
            return new RuleGrade(Number.NaN, Number.NaN);
        }
        
        let growthRateYears = rule.targetYears;
        let totalYears = lastYear - firstYear;
        let standardYears = Math.min(growthRateYears, totalYears)
        let additionalYears = Math.max(0, totalYears - growthRateYears)
        let growthRate = (lastValue - firstValue) / firstValue
        var conditions = rule.conditions;
        
        for (let index = 0; index < conditions.length; index++) {
            var condition = conditions[index];

            if (condition.valueRange.contains(lastValue)) {
                let perYearGrowthRate = condition.rate / growthRateYears;
                let idealGrowthRate = (perYearGrowthRate * standardYears + additionalYears * condition.yearRate) / 100;
                let gradePercent = growthRate / idealGrowthRate;
                
                return new RuleGrade(gradePercent, growthRate);
            }
        }
        
        return new RuleGrade(Number.NaN, Number.NaN);
    }
}
class HouseholdMedianIncomeGrowthGrader {
    evaluate(geoData, rule) {
        var firstYear = null;
        var firstValue = null;
        var lastYear = null;
        var lastValue = null;

        GeoData.years().forEach(function(year, index) {
            var value = geoData.getHouseholdIncome(year);

            if (lastValue == null) {
                lastYear = year;
                lastValue = value;
            }
            
            if (value != null) {
                firstYear = year;
                firstValue = value;
            }
        });

        if (firstValue == null || lastValue == null || firstYear == lastYear) {
            return new RuleGrade(Number.NaN, Number.NaN);
        }
        
        let growthRateYears = rule.targetYears;
        let totalYears = lastYear - firstYear;
        let standardYears = Math.min(growthRateYears, totalYears)
        let additionalYears = Math.max(0, totalYears - growthRateYears)
        let growthRate = (lastValue - firstValue) / firstValue
        var conditions = rule.conditions;
        
        for (let index = 0; index < conditions.length; index++) {
            var condition = conditions[index];

            if (condition.valueRange.contains(lastValue)) {
                let perYearGrowthRate = condition.rate / growthRateYears;
                let idealGrowthRate = (perYearGrowthRate * standardYears + additionalYears * condition.yearRate) / 100;
                let gradePercent = growthRate / idealGrowthRate;
                
                return new RuleGrade(gradePercent, growthRate);
            }
        }
        
        return new RuleGrade(Number.NaN, Number.NaN);
    }
}
class HouseValueGrowthGrader {
    evaluate(geoData, rule) {
        var firstYear = null;
        var firstValue = null;
        var lastYear = null;
        var lastValue = null;

        GeoData.years().forEach(function(year, index) {
            var value = geoData.getMedianHouseValue(year);

            if (lastValue == null) {
                lastYear = year;
                lastValue = value;
            }
            
            if (value != null) {
                firstYear = year;
                firstValue = value;
            }
        });

        if (firstValue == null || lastValue == null || firstYear == lastYear) {
            return new RuleGrade(Number.NaN, Number.NaN);
        }
        
        let growthRateYears = rule.targetYears;
        let totalYears = lastYear - firstYear;
        let standardYears = Math.min(growthRateYears, totalYears)
        let additionalYears = Math.max(0, totalYears - growthRateYears)
        let growthRate = (lastValue - firstValue) / firstValue
        var conditions = rule.conditions;
        
        for (let index = 0; index < conditions.length; index++) {
            var condition = conditions[index];

            if (condition.valueRange.contains(lastValue)) {
                let perYearGrowthRate = condition.rate / growthRateYears;
                let idealGrowthRate = (perYearGrowthRate * standardYears + additionalYears * condition.yearRate) / 100;
                let gradePercent = growthRate / idealGrowthRate;
                
                return new RuleGrade(gradePercent, growthRate);
            }
        }
        
        return new RuleGrade(Number.NaN, Number.NaN);
    }
}
class RuleEngine {
    constructor() {
        this.populationGrowth = new PopulationGrowthGrader();
        this.householdMedianIncomeGrowth = new HouseholdMedianIncomeGrowthGrader();
        this.houseValueGrowth = new HouseValueGrowthGrader();
        this.rules = {};
    }

    evaluate(geography, geoData) {
        var result = {};
        var rules = [];
        if (this.rules[geography] != null) {
            rules = this.rules[geography];
        }
        var self = this;

        rules.forEach(function(rule, index){ 
            if (!rule.isActive) { return }

            switch (rule.identifier) {
                case RuleIdentifier.populationGrowth():
                    result[rule.identifier] = self.populationGrowth.evaluate(geoData, rule);
                    break;
                case RuleIdentifier.householdMedianIncomeGrowth():
                    result[rule.identifier] = self.householdMedianIncomeGrowth.evaluate(geoData, rule);
                    break;
                case RuleIdentifier.houseValueGrowth():
                    result[rule.identifier] = self.houseValueGrowth.evaluate(geoData, rule);
                    break;
                default:
                    break;
            }
        });

        return result;
    }

    addRule(geography, rule) {
        if (this.rules[geography] == null) {
            this.rules[geography] = [];
        }
        this.rules[geography].push(rule);
    }

    addPopulationGrowthRules() {
        var self = this;
        var identifier = RuleIdentifier.populationGrowth();

        CensusGeography.all().forEach(function(geography, index) {
            var condition1 = new RuleConditionDTO(geography, identifier, 0, 250_000, 30.0, 2.0);
            var condition2 = new RuleConditionDTO(geography, identifier, 250_000, 1_000_000, 20.0, 1.25);
            var condition3 = new RuleConditionDTO(geography, identifier, 1_000_000, 2_000_000, 15.0, 1.0);
            var condition4 = new RuleConditionDTO(geography, identifier, 2_000_000, 100_000_000_000, 10.0, 1.0);
            var dto = new RuleDTO(geography, identifier, 17, true, [condition1, condition2, condition3, condition4]);

            self.addRule(geography, new Rule(dto));
        });
    }

    addHouseholdMedianIncomeGrowthRules() {
        var self = this;
        var identifier = RuleIdentifier.householdMedianIncomeGrowth();

        CensusGeography.all().forEach(function(geography, index) {
            var condition1 = new RuleConditionDTO(geography, identifier, 0, 100_000_000_000, 30.0, 2.0);
            var dto = new RuleDTO(geography, identifier, 16, true, [condition1]);

            self.addRule(geography, new Rule(dto));
        });
    }

    addHouseValueGrowthRules() {
        var self = this;
        var identifier = RuleIdentifier.houseValueGrowth();

        CensusGeography.all().forEach(function(geography, index) {
            var condition1 = new RuleConditionDTO(geography, identifier, 0, 100_000_000_000, 40.0, 2.5);
            var dto = new RuleDTO(geography, identifier, 16, true, [condition1]);

            self.addRule(geography, new Rule(dto));
        });
    }
}
class ReportCard {
    constructor(gradingSystem) {
        this.gradingSystem = gradingSystem;

        this.populationContainer = document.getElementById("populationGradeContainer");
        this.populationRate = document.getElementById("populationGradeRate");
        this.populationLetter = document.getElementById("populationGradeLetter");

        this.householdIncomeContainer = document.getElementById("householdIncomeGradeContainer");
        this.householdIncomeRate = document.getElementById("householdIncomeGradeRate");
        this.householdIncomeLetter = document.getElementById("householdIncomeGradeLetter");

        this.houseValueContainer = document.getElementById("houseValueGradeContainer");
        this.houseValueRate = document.getElementById("houseValueGradeRate");
        this.houseValueLetter = document.getElementById("houseValueGradeLetter");
    }

    applyGrades(grades) {
        var populationGrade = grades[RuleIdentifier.populationGrowth()];
        this.populationContainer.style.backgroundColor = populationGrade.color(this.gradingSystem);
        this.populationRate.innerHTML = populationGrade.rate;
        this.populationLetter.innerHTML = populationGrade.stringValue(this.gradingSystem);

        var householdIncomeGrade = grades[RuleIdentifier.householdMedianIncomeGrowth()];
        this.householdIncomeContainer.style.backgroundColor = householdIncomeGrade.color(this.gradingSystem);
        this.householdIncomeRate.innerHTML = householdIncomeGrade.rate;
        this.householdIncomeLetter.innerHTML = householdIncomeGrade.stringValue(this.gradingSystem);

        var houseValueGrade = grades[RuleIdentifier.houseValueGrowth()];
        this.houseValueContainer.style.backgroundColor = houseValueGrade.color(this.gradingSystem);
        this.houseValueRate.innerHTML = houseValueGrade.rate;
        this.houseValueLetter.innerHTML = houseValueGrade.stringValue(this.gradingSystem);
    }

    clearGrades() {
        var populationGrade = new RuleGrade(null, null);
        this.populationContainer.style.backgroundColor = populationGrade.color(this.gradingSystem);
        this.populationRate.innerHTML = populationGrade.rate;
        this.populationLetter.innerHTML = populationGrade.stringValue(this.gradingSystem);

        var householdIncomeGrade = new RuleGrade(null, null);
        this.householdIncomeContainer.style.backgroundColor = householdIncomeGrade.color(this.gradingSystem);
        this.householdIncomeRate.innerHTML = householdIncomeGrade.rate;
        this.householdIncomeLetter.innerHTML = householdIncomeGrade.stringValue(this.gradingSystem);

        var houseValueGrade = new RuleGrade(null, null);
        this.houseValueContainer.style.backgroundColor = houseValueGrade.color(this.gradingSystem);
        this.houseValueRate.innerHTML = houseValueGrade.rate;
        this.houseValueLetter.innerHTML = houseValueGrade.stringValue(this.gradingSystem);
    }
}