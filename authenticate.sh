#!/usr/bin/env bash
read -p "Username: " USERNAME
read -sp "Password: " PASSWORD
curl -s -X POST https://duunit.jyu.fi/@login -H 'Accept: application/json' -H 'Content-Type: application/json' --data-raw '{"login": "'"$USERNAME"'", "password": "'"$PASSWORD"'"}' | jq .token -r | awk {'print "TOKEN="$1'} > .secrets
cat .secrets

