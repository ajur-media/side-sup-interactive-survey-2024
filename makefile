#!/usr/bin/make
PACKAGE_NAME  = side-sup-interactive-survey-2024
INSTALL_DIR = side-sup-interactive-survey-2024
PATH_PROJECT = $(DESTDIR)/var/www/$(INSTALL_DIR)

help:
	@perl -e '$(HELP_ACTION)' $(MAKEFILE_LIST)

update:		##@build Update project from GIT
	@echo Updating project from GIT
	git pull --no-rebase

make_env:   ##@work Prepare local environment
	@npm ci

remove_public:  ##work Clean local public directory
	@echo Cleaning public directory
	@dh_clean ./build/

build:	##@build Build DEB-package for production
	@echo Building project
	@dh_clean ./build/
	@GENERATE_SOURCEMAP=false  ./node_modules/.bin/react-scripts build
# PUBLIC_URL=/ добавить к строке выше, чтобы сделать пути считаемыми от абсолютного корня. Сейчас - от `./`
	@./node_modules/.bin/rimraf build/**/*.LICENSE*
#	@npm run build
	@dpkg-buildpackage -rfakeroot -uc -us --compression-level=9 --diff-ignore=node_modules --tar-ignore=node_modules
	@dh_clean ./build/
	@dh_clean

compile:		##@work Compile dev version
	@echo Compiling
	make remove_public
	@./node_modules/.bin/react-scripts build

install:  	##@system Install package. Don't run it manually!!!
	install -d $(PATH_PROJECT)
	cp -r build $(PATH_PROJECT)/
	chmod -R 777 $(PATH_PROJECT)/
	chmod 444 $(PATH_PROJECT)/build/*.html

dchr:		##@development Publish release
	@dch --controlmaint --release --distribution unstable

dchv:		##@development Append release
	@export DEBEMAIL="wombat@fontanka.ru" && \
	export DEBFULLNAME="Karel Wintersky" && \
	echo "$(YELLOW)------------------ Previous version header: ------------------$(GREEN)" && \
	head -n 3 debian/changelog && \
	echo "$(YELLOW)--------------------------------------------------------------$(RESET)" && \
	read -p "Next version: " VERSION && \
	dch --controlmaint -v $$VERSION

# ------------------------------------------------
# Add the following 'help' target to your makefile, add help text after each target name starting with '\#\#'
# A category can be added with @category
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)
HELP_ACTION = \
	%help; while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-_]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	print "usage: make [target]\n\n"; for (sort keys %help) { print "${WHITE}$$_:${RESET}\n"; \
	for (@{$$help{$$_}}) { $$sep = " " x (32 - length $$_->[0]); print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; }; \
	print "\n"; }

# -eof-
