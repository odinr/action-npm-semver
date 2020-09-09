import { SemVer, ReleaseType, parse, inc } from "semver";

export const prefix = (ver: string) => (ver.match(/(.*)(\d+[.]\d+[.]\d+)(.*)/) || [])[1];

export const version = (value: SemVer | string, type?: ReleaseType | string, pre?: string): SemVer => {
    const version = !type ? parse(value) : bump(value, type as ReleaseType, pre);
    if (!version) {
        throw Error('invalid version')
    }
    return version;
}

export const bump = (value: SemVer | string, type: ReleaseType, pre?: string): SemVer | null => {
    const current = parse(value);
    if (!current) {
        throw Error('invalid version provided')
    }

    if (type.match(/^pre/) && !pre) {
        throw Error(`invalid: missing prerelease identifier`);
    }

    return parse([
        prefix(current.version),
        inc(current.version, type, pre)
    ].join(''));
}

export { coerce } from 'semver';

export default version;