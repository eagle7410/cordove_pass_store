#!/usr/bin/env bash
OS=`lsb_release -a | grep "Distributor ID:" | awk '{print $3}'  | tr -s [:upper:] [:lower:] | tr -d [:space:]| tr -d [:space:] | sed 's/No LSB modules are available\.//g'`
echo $OS
