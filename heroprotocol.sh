#!/bin/bash
docker run --name heroprotocol --rm -it -w /data/input -v=$(pwd):/data/input ygunayer/heroprotocol:latest python /data/heroprotocol/heroprotocol.py