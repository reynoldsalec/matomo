# Matomo Lando Plugin

This is the _official_ [Lando](https://lando.dev) plugin for [Matomo](https://docs.lando.dev/config/matomo.html). When installed it...

* Allows users to spin up their Matomo projects for development with Lando
* Allows users to sync database relationships and mounts between Matomo and Lando
* Uses Matomo's own images for extremely close parity with production
* Uses Matomo's own configuration files to determine what Lando should run and do
* Provides users with relevant and containerized tooling commands

Of course, once a user is running their Matomo project with Lando they can take advantage of [all the other awesome development features](https://docs.lando.dev) Lando provides.

## Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

```bash
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/matomo" line to install a particular version eg
# yarn add @lando/matomo@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/matomo --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/matomo \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/matomo /plugins/@lando/matomo"

# Rebuild the plugin cache
lando --clear
```

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/matomo`. This command will also show you _where_ the plugin is being loaded from.

## Basic Usage

@TODO: add usage

## Examples and Guides

@TODO: add examples

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando).

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/matomo/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/matomo/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/matomo/releases).

## Development

If you're interested in working on this plugin then we recommend you check out the [development guide](https://github.com/lando/matomo/blob/main/docs/development.md).

## Contributors

<a href="https://github.com/lando/matomo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/matomo" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Selected Resources

* [LICENSE](https://github.com/lando/matomo/blob/main/LICENSE.md)
* [The best professional advice ever](https://www.youtube.com/watch?v=tkBVDh7my9Q)
