@echo off
docker run --name heroprotocol --rm -it -w /data/input -v="%CD%:/data/input" ygunayer/heroprotocol:latest python /data/heroprotocol/heroprotocol.py %1 %2 %3 %4 %5 %6 %7 %8 %9
@echo on