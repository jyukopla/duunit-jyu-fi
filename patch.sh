#!/usr/bin/env bash
# Patches unmerged issue in gatsby-source-filesystem where it does not
# support fetching private content with JWT authentication
patch -N -p1 < gatsby-source-filesystem.patch
