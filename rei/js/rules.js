class RuleIdentifier {
    static populationGrowth = "populationGrowth"
    static householdMedianIncomeGrowth = "householdMedianIncomeGrowth"
    static houseValueGrowth = "houseValueGrowth"

    static isValid(value) {
        var result = false;

        switch (value) {
            case RuleIdentifier.populationGrowth:
            case RuleIdentifier.householdMedianIncomeGrowth:
            case RuleIdentifier.houseValueGrowth:
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
class RuleConditionDTO {
    geography;
    identifier;
    valueRange;
    rate;
    yearRate;

    constructor(geography, identifier, valueStart, valueEnd, rate, yearRate) {
        if (CensusGeography.isValid(geography)) {
            throw "Invalid geography";
        }
        if (RuleIdentifier.isValid(identifier)) {
            throw "Invalid identifier";
        }
        var rateValue = Number(rate);
        var yearRateValue = Number(rate);

        if (Number.isNaN(rateValue)) {
            throw "Rate value cannot be NaN"
        }
        if (Number.isNaN(yearRateValue)) {
            throw "Year rate value cannot be NaN"
        }

        this.geography = geography;
        this.identifier = identifier;
        this.valueRange = NumberRange(valueStart, valueEnd);
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
    geography;
    identifier;
    targetYears;
    isActive;
    conditions;

    constructor(geography, identifier, targetYears, isActive, conditions) {
        if (CensusGeography.isValid(geography)) {
            throw "Invalid geography";
        }
        if (RuleIdentifier.isValid(identifier)) {
            throw "Invalid identifier";
        }
        var targetYearsValue = Number(targetYears);

        if (Number.isNaN(targetYearsValue)) {
            throw "Target years cannot be NaN"
        } else if (Number.isInteger(targetYearsValue)) {
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
    dto;

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
                                        RuleIdentifier.populationGrowth, 
                                        0, 
                                        250_000, 
                                        30, 
                                        2);

        return new RuleCondition(data);
    }

    static makeDefaultHouseholdMedianIncomeGrowth(geography) {
        var data = new RuleConditionDTO(geography,
                                        RuleIdentifier.householdMedianIncomeGrowth,
                                        0,
                                        100_000_000_000,
                                        30,
                                        2);
        
        return new RuleCondition(data);
    }

    static makeDefaultHouseValueGrowth(geography) {
        var data = new RuleConditionDTO(geography,
                                        RuleIdentifier.houseValueGrowth,
                                        0,
                                        100_000_000_000,
                                        40,
                                        2.5);
        
        return new RuleCondition(data);
    }
}
class Rule {
    dto;

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
    static letters = "letters"
    static passFail = "passFail"

    static isValid(value) {
        var result = false;

        switch (value) {
            case RuleGradingSystem.letters:
            case RuleGradingSystem.passFail:
                result = true;
                break;
            default:
                break;
        }

        return result;
    }
}
class RuleGrade {
    static aPlus = "aPlus";
    static a = "a";
    static aMinus = "aMinus";
    static bPlus = "bPlus";
    static b = "b";
    static bMinus = "bMinus";
    static cPlus = "cPlus";
    static c = "c";
    static cMinus = "cMinus";
    static dPlus = "dPlus";
    static d = "d";
    static dMinus = "dMinus";
    static f = "f";
    static notApplicable = "notApplicable";

    type;
    percent;
    value;

    get letter() {
        switch (this.type) {
            case RuleGrade.aPlus:
            case RuleGrade.a:
            case RuleGrade.aMinus:
                return "A";
                break;
            case RuleGrade.bPlus:
            case RuleGrade.b:
            case RuleGrade.bMinus:
                return "B";
                break;
            case RuleGrade.cPlus:
            case RuleGrade.c:
            case RuleGrade.cMinus:
                return "C";
                break;
            case RuleGrade.dPlus:
            case RuleGrade.d:
            case RuleGrade.dMinus:
                return "D";
                break;
            case RuleGrade.f:
                return "F";
                break;
            case RuleGrade.notApplicable:
            default:
                return "-";
                break;
        }
    }

    get modifier() {
        switch (this.type) {
            case RuleGrade.aPlus:
            case RuleGrade.bPlus:
            case RuleGrade.cPlus:
            case RuleGrade.dPlus:
                return "+";
                break;
            case RuleGrade.aMinus:
            case RuleGrade.bMinus:
            case RuleGrade.cMinus:
            case RuleGrade.dMinus:
                return "-";
                break;
            case RuleGrade.a:
            case RuleGrade.b:
            case RuleGrade.c:
            case RuleGrade.d:
            case RuleGrade.f:
            case RuleGrade.notApplicable:
            default:
                return "";
                break;
        }
    }

    constructor(percent, value) {
        if (Number.isNaN(percent)) {
            throw "Percent cannot be NaN"
        }
        if (Number.isNaN(value)) {
            throw "Value cannot be NaN"
        }

        if (percent >= 1.0) {
            this.type = RuleGrade.aPlus;
        } else if (percent >= 0.93) {
            this.type = RuleGrade.a;
        } else if (percent >= 0.90) {
            this.type = RuleGrade.aMinus;
        } else if (percent >= 0.87) {
            this.type = RuleGrade.bPlus;
        } else if (percent >= 0.83) {
            this.type = RuleGrade.b;
        } else if (percent >= 0.80) {
            this.type = RuleGrade.bMinus;
        } else if (percent >= 0.77) {
            this.type = RuleGrade.cPlus;
        } else if (percent >= 0.73) {
            this.type = RuleGrade.c;
        } else if (percent >= 0.70) {
            this.type = RuleGrade.cMinus;
        } else if (percent >= 0.67) {
            this.type = RuleGrade.dPlus;
        } else if (percent >= 0.63) {
            this.type = RuleGrade.d;
        } else if (percent >= 0.60) {
            this.type = RuleGrade.dMinus;
        } else if (percent >= 0) {
            this.type = RuleGrade.f;
        } else {
            this.type = RuleGrade.notApplicable;
        }

        this.percent = percent;
        this.value = value;
    }

    stringValue(gradingSystem) {
        if (RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail:
                switch (this.type) {
                    case RuleGrade.aPlus:
                        return "P";
                        break;
                    case RuleGrade.notApplicable:
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
        if (RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail:
                switch (this.type) {
                    case RuleGrade.aPlus:
                        return "Pass";
                        break;
                    case RuleGrade.notApplicable:
                        return "No Data";
                        break;
                    default:
                        return "Fail";
                        break;
                }
                break;
            default:
                switch (this.type) {
                    case RuleGrade.notApplicable:
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
        if (RuleGradingSystem.isValid(gradingSystem)) {
            throw "Invalid grading system";
        }

        switch (gradingSystem) {
            case RuleGradingSystem.passFail:
                switch (this.type) {
                    case RuleGrade.aPlus:
                        return MBColor.mbGradeAPlus;
                        break;
                    case RuleGrade.notApplicable:
                        return MBColor.mbClear;
                        break;
                    default:
                        return MBColor.mbGradeF;
                        break;
                }
                break;
            case RuleGradingSystem.letters:
            default:
                switch (this.type) {
                    case RuleGrade.aPlus:
                        return MBColor.mbGradeAPlus;
                        break;
                    case RuleGrade.a:
                        return MBColor.mbGradeA;
                        break;
                    case RuleGrade.aMinus:
                        return MBColor.mbGradeAMinus;
                        break;
                    case RuleGrade.bPlus:
                        return MBColor.mbGradeBPlus;
                        break;
                    case RuleGrade.b:
                        return MBColor.mbGradeB;
                        break;
                    case RuleGrade.bMinus:
                        return MBColor.mbGradeBMinus;
                        break;
                    case RuleGrade.cPlus:
                        return MBColor.mbGradeCPlus;
                        break;
                    case RuleGrade.c:
                        return MBColor.mbGradeC;
                        break;
                    case RuleGrade.cMinus:
                        return MBColor.mbGradeCMinus;
                        break;
                    case RuleGrade.dPlus:
                        return MBColor.mbGradeDPlus;
                        break;
                    case RuleGrade.d:
                        return MBColor.mbGradeD;
                        break;
                    case RuleGrade.dMinus:
                        return MBColor.mbGradeDMinus;
                        break;
                    case RuleGrade.f:
                        return MBColor.mbGradeF;
                        break;
                    case RuleGrade.notApplicable:
                    default:
                        return MBColor.mbClear;
                        break;
                }
                break;
        }
    }
}
class PopulationGrowthGrader {
    static evaluate(geography, item, rule) {
        // TODO: implement this
    }
}
class HouseholdMedianIncomeGrowthGrader {
    static evaluate(geography, item, rule) {
        // TODO: implement this
    }
}
class HouseValueGrowthGrader {
    static evaluate(geography, item, rule) {
        // TODO: implement this
    }
}
class RuleEngine {
    static evaluate(geography, item, rules) {
        var result = {};

        rules.forEach(function(rule){ 
            if (!rule.isActive) { return }

            switch (rule.identifier) {
                case RuleIdentifier.populationGrowth:
                    result[rule.identifier] = PopulationGrowthGrader.evaluate(geography, item, rule);
                    break;
                case RuleIdentifier.householdMedianIncomeGrowth:
                    result[rule.identifier] = HouseholdMedianIncomeGrowthGrader.evaluate(geography, item, rule);
                    break;
                case RuleIdentifier.houseValueGrowth:
                    result[rule.identifier] = HouseValueGrowthGrader.evaluate(geography, item, rule);
                    break;
                default:
                    break;
            }
        });

        return result;
    }
}
