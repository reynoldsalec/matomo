---
description: Use Matomo on Lando for local development; powered by Docker and Docker Compose, config php version, swap db or caching backends or web server, use composer. Matomo CLI and artisan, xdebug and custom config files, oh and also import and export databases.
---

# Matomo

Matomo is the leading Free/Libre open analytics platform.

 Lando offers a configurable [recipe](https://docs.lando.dev/config/recipes.html) for installing [Matomo](https://matomo.org/).

[[toc]]

## Getting Started

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/).
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

However, because you are a developer and developers never ever [RTFM](https://en.wikipedia.org/wiki/RTFM), you can also try out this recipe with a vanilla install of Matomo with the commands as follows:

```bash
# Initialize a Matomo recipe
lando init \
  --source remote \
  --remote-url https://builds.matomo.org/matomo.tar.gz \
  --remote-options="--strip-components 1" \
  --recipe matomo \
  --webroot . \
  --name my-first-Matomo-app

# Start it up
lando start

# List information about this app.
lando info
```

## Configuration

While Lando [recipes](https://docs.lando.dev/config/recipes.html) set sane defaults so they work out of the box, they are also [configurable](https://docs.lando.dev/config/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/config/lando.html). If you are unsure about where this goes or what this means, we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/config/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: Matomo
config:
  php: '7.3'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  cache: none
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough, all Lando recipes can be further [extended and overriden](https://docs.lando.dev/config/recipes.html#extending-and-overriding-recipes).

### Choosing a php version

You can set `php` to any version that is available in our [php service](./php.html). However, you should consult the [Matomo requirements](https://Matomo.com/docs/5.7/installation#web-server-configuration) to make sure that version is actually supported by Matomo itself.

The [recipe config](https://docs.lando.dev/config/recipes.html#config) to set the Matomo recipe to use `php` version `8.1` is shown below:

```yaml
recipe: matomo
config:
  php: '8.1'
```

### Choosing a composer version

You can set `composer_version` to any version that is available in our [php service](./php.html#installing-composer).

```yaml
recipe: matomo
config:
  composer_version: '1.10.1'
```

### Choosing a web server

By default, this recipe will be served by the default version of our [apache](./apache.html) service but you can also switch this to use [`nginx`](./nginx.html). We *highly recommend* you check out both the [apache](./apache.html) and [nginx](./nginx.html) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: matomo
config:
  via: apache
```

#### With nginx

```yaml
recipe: matomo
config:
  via: nginx
```

### Choosing a database backend

By default, this recipe will use the default version of our [mysql](./mysql.html) service as the database backend but you can also switch this to use [`mariadb`](./mariadb.html) or ['postgres'](./postgres.html) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database`, we *highly recommend* you check out the [mysql](./mysql.html), [mariadb](./mariadb.html) and ['postgres'](./postgres.html) services before you change the default.

Also note that like the configuration of the `php` version, you should consult the [Matomo requirements](https://Matomo.com/docs/5.7/database#configuration) to make sure the `database` and `version` you select is actually supported by Matomo itself.

#### Using MySQL (default)

```yaml
recipe: matomo
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: matomo
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: matomo
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: matomo
config:
  database: postgres:9.6
```

### Choosing a caching backend

By default, this recipe will not spin up a caching backend.

However, you can specify one using the `cache` recipe config and setting it to use either our use [`redis`](./redis.html) or [`memcached`](./memcached.html) service. Note that you can optionally/additionally specify a particular version for either *as long as it is a version documented as available for use with lando* for either service.

If you are unsure about how to configure the `cache`, we *highly recommend* you check out our [redis](./redis.html) and [memcached](./memcached.html)) docs as well as the [Matomo ones](https://Matomo.com/docs/5.7/cache#configuration).

#### Using redis (recommended)

```yaml
recipe: matomo
config:
  cache: redis
```

#### Using Memcached

```yaml
recipe: matomo
config:
  cache: memcached
```

#### Using a custom version

```yaml
recipe: matomo
config:
  cache: redis:2.8
```

### Using xdebug

This is just a passthrough option to the [xdebug setting](./php.html#toggling-xdebug) that exists on all our [php services](./php.html). The `tl;dr` is `xdebug: true` enables and configures the php xdebug extension and `xdebug: false` disables it.

```yaml
recipe: matomo
config:
  xdebug: true|false
```

However, for more information we recommend you consult the [php service documentation](./php.html).


### Using custom config files

You may need to override our [default Matomo config](https://github.com/lando/matomo/tree/main/recipes/matomo) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](./apache.html#configuration) and [nginx](./nginx.html#configuration) if you plan to use a custom `vhosts` or `server` config.

#### A hypothetical project

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want.

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

#### Landofile using custom Matomo config

```yaml
recipe: matomo
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```

## Connecting to your database and/or cache

Lando will automatically set up a database with a user and password and also set an environment variable called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

The default database connection information for a Matomo site is shown below:

Note that the `host` is not `localhost` but `database`.

```yaml
database: matomo
username: matomo
password: matomo
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

If you've also specified a caching backend, the default connection settings are shown below:

```yaml
host: cache
# Redis
port: 6379
# Memcache
port: 11211
```

You can also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Importing Your Database

Once you've started up your Matomo site, you will need to pull in your database and files before you can really start to dev all the dev. Pulling your files is as easy as downloading an archive and extracting it to the correct location. Importing a database can be done using our helpful `lando db-import` command.

```bash
# Grab your database dump
curl -fsSL -o database.sql.gz "https://url.to.my.db/database.sql.gz"

# Import the database
# NOTE: db-import can handle uncompressed, gzipped or zipped files
# Due to restrictions in how Docker handles file sharing your database
# dump MUST exist somewhere inside of your app directory.
lando db-import database.sql.gz
```

You can learn more about the `db-import` command [over here](https://docs.lando.dev/guides/db-import.html).

## Tooling

By default, each Lando Matomo recipe will also ship with helpful dev utilities.

This means you can use things like the Matomo's `console` cli, `composer` and `php` via Lando and avoid mucking up your actual computer trying to manage `php` versions and tooling.

```bash
lando console           Runs Matomo console commands
lando composer          Runs composer commands
lando db-export [file]  Exports database from a service into a file
lando db-import <file>  Imports a dump file into database service
lando Matomo           Runs Matomo commands
lando mysql             Drops into a MySQL shell on a database service
lando php               Runs php commands
```

### Usage examples

```bash
# List Matomo console commands
lando console

# Run composer install
lando composer install

# Drop into a mysql shell
lando mysql

# Check the app's php version
lando php -v
```

You can also run `lando` from inside your app directory for a complete list of commands. This is always advisable as your list of commands may not be 100% the same as above. For example, if you set `database: postgres` you will get `lando psql` instead of `lando mysql`.

<RelatedGuides tag="matomo"/>
