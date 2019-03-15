SHELL := /usr/bin/env bash
export PATH := node_modules/.bin:$(PATH)

SOURCES := $(shell find src -type f)

GATSBY_BUILD_FLAGS ?=

.PHONY: all
all: build

.PHONY: build
build: public

.PHONY: clean
clean:
	$(RM) -r .cache public

.PHONY: develop
develop: node_modules
	gatsby develop

.PHONY: purge
purge: clean
	$(RM) -r node_modules

.PHONY: prettier
prettier: node_modules
	prettier --write $$(find src -name "*.js")
	prettier --write --single-quote false $$(find src -name "*.scss")

.PHONY: serve
serve: node_modules public
	gatsby serve

.PHONY: watch
watch: develop

.PHONY: public
public: node_modules $(SOURCES)
	gatsby build ${GATSBY_BUILD_FLAGS}

node_modules: package.json
	yarn install
	touch node_modules
