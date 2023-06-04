const buttonTypes = {
    DOT: '.',
    EQUAL: '=',
    CLEAN: 'C',
    PERCENTAGE: '%',
    SIGNCHANGE: '+/-',
    FACTORIAL: 'x!',
    SQRT: '√x',
    DEGREE: 'xⁿ',
    MEMORYCLEAR: 'MC',
    MEMORYRESET: 'MR',
    MEMORYPLUS: 'M+',
    MEMORYMINUS: 'M-',
    PI: 'π',
    EXP: 'e',
    LOGNATURAL: 'ln',
    CMETER: 'cm',
    METER: 'm',
    KMETER: 'km',
    GRAM: 'g',
    KGRAM:'kg',
    TON: 't',
    S_CMETER: 'cm²',
    S_METER: 'm²',
    S_KMETER: 'km²' 
}

function factorial(n) {
    let answer = 1;
    if (n == 0 || n == 1) {
        return answer;
    }
    else if (n > 1) {
        for (var i = n; i >= 1; i--) {
            answer = answer * i;
        }
        return answer;
    } else {
        return 'Error';
    }
}

export { buttonTypes, factorial };
