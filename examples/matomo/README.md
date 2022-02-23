Matomo Example
===============

This example exists primarily to test the following documentation:

* [Matomo Recipe](https://docs.devwithlando.io/tutorials/matomo.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty matomo recipe
rm -rf matomo && mkdir -p matomo && cd matomo
lando init --source remote --remote-url https://builds.matomo.org/matomo.tar.gz --remote-options="--strip-components 1" --recipe matomo --webroot . --name my-first-Matomo-app

# Should start up successfully
cd matomo
echo -e "\nplugins:\n  \"@lando/matomo/\": ./../../" >> .lando.yml
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should return the matomo default page
cd matomo
lando ssh -s appserver -c "curl -L localhost" | grep "Matomo"

# Should use 7.4 as the default php version
cd matomo
lando php -v | grep "PHP 7.4"

# Should be running apache 2.4 by default
cd matomo
lando ssh -s appserver -c "apachectl -V | grep 2.4"
lando ssh -s appserver -c "curl -IL localhost" | grep Server | grep 2.4

# Should be running mysql 5.7 by default
cd matomo
lando mysql -V | grep 5.7

# Should not enable xdebug by default
cd matomo
lando php -m | grep xdebug || echo $? | grep 1

# Should have redis running
cd matomo
lando ssh -s cache -c "redis-cli CONFIG GET databases"

# Should use the default database connection info
cd matomo
lando mysql -umatomo -pmatomo matomo -e quit

# Should have Matomo console available
cd matomo
lando console
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd matomo
lando destroy -y
lando poweroff
```
