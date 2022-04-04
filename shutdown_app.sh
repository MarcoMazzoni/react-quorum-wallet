#!/bin/bash

curr_dir=`pwd`
docker-compose down -v
cd 'config'
docker-compose down -v
cd $curr_dir
