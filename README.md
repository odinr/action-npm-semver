# Github Action NPM SemVer

## input
> | variable | required | desc |
> |--|--|--|
> | `version` | **always** | either version, tag, ref, `current` or `next`|
> | `token` | `next` | GIT_HUB_TOKEN |
> | `owner` | `next` | *default context.repo.owner*  |
> | `repo` | `next` | *default context.repo.repo*  |
> | `bump` | | `major | minor | patch | [premajor|preminor|prepatch|prerelease] npm_tag`. *example `prerelease  beta`*  |


## output
> | variable | tag |
> |--|--|
> | `tag` | **@owner/some-package@1.2.3-beta.2** |
> | `prefix` | **@owner/some-package@** *1.2.3-beta.2* |
> | `version` | *@owner/some-package@* **1.2.3-beta.2** |
> | `coerce` | *@owner/some-package@ **1.2.3** -beta.2* |
> | `prerelease` | *@owner/some-package@1.2.3- **beta** .2* |
> | `iteration` | *@owner/some-package@1.2.3-beta. **2*** |
