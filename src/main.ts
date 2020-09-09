import * as core from '@actions/core';

import getVersion, { prefix, coerce } from './version';
import getTag from './tag';

export const main = async () => {
    const tag = await getTag(core.getInput('version', { required: true }));
    const [type, pre] = (core.getInput('bump') || '').split(' ');

    const version = getVersion(tag, type, pre);
    const [prerelease, iteration] = version.prerelease;

    core.setOutput('tag', version.raw);
    core.setOutput('prefix', prefix(version.raw));
    core.setOutput('version', version.version);
    core.setOutput('coerce', coerce(version.version));
    core.setOutput('prerelease', prerelease);
    core.setOutput('iteration', iteration);
}

main();