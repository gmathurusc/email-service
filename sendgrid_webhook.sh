#!/usr/bin/env bash
function localtunnel {
  lt -s gmathuruscsrm --port 3000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
