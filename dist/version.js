"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coerce = exports.bump = exports.version = exports.prefix = void 0;
const semver_1 = require("semver");
exports.prefix = (ver) => (ver.match(/(.*)(\d+[.]\d+[.]\d+)(.*)/) || [])[1];
exports.version = (value, type, pre) => {
    const version = !type ? semver_1.parse(value) : exports.bump(value, type, pre);
    if (!version) {
        throw Error('invalid version');
    }
    return version;
};
exports.bump = (value, type, pre) => {
    const current = semver_1.parse(value);
    if (!current) {
        throw Error('invalid version provided');
    }
    if (type.match(/^pre/) && !pre) {
        throw Error(`invalid: missing prerelease identifier`);
    }
    return semver_1.parse([
        exports.prefix(current.version),
        semver_1.inc(current.version, type, pre)
    ].join(''));
};
var semver_2 = require("semver");
Object.defineProperty(exports, "coerce", { enumerable: true, get: function () { return semver_2.coerce; } });
exports.default = exports.version;
