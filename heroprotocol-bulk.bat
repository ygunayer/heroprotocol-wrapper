@echo off
docker run --name heroprotocol --rm -it -w /data/input -v="%CD%:/data/input" -v="%~dp0\bulk.sh:/bulk.sh" ygunayer/heroprotocol:latest /bin/ash /bulk.sh /data/input
@echo on