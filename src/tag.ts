import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { resolve } from 'path';

export const latestTag = async () => {
    const client = getOctokit(core.getInput('token', { required: true }));
    const { data: { tag_name } } = await client.repos.getLatestRelease({
        repo: core.getInput('repo') || context.repo.repo,
        owner: core.getInput('owner') || context.repo.owner,
    });
    return tag_name;
}

export const tag = async (tag: string): Promise<string> => {
    switch (tag) {
        case 'current':
            return `v${require(resolve(process.cwd(), 'package.json')).version}`;
        case 'latest':
            return latestTag();
        default:
            return tag.replace('refs/tags/', '');
    }
}

export default tag;