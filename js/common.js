'use strict';

function valid(value) {
    if ((value === null) || (value === undefined)) {
        throw Error("validation failed: " + value);
    }
    return value;
}
