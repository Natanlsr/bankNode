.PHONY: build-createAccountFunction build-RuntimeDependenciesLayer build-depositCommandFunction build-withdrawCommandFunction build-transferCommandFunction build-getAccountCommandFunction

build-createAccountFunction:
	rm -rf dist
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-depositCommandFunction:
	rm -rf dist
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-withdrawCommandFunction:
	rm -rf dist
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-transferCommandFunction:
	rm -rf dist
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-getAccountCommandFunction:
	rm -rf dist
	npm run build
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"

# .PHONY: build-RuntimeDependenciesLayer build-lambda-common
# .PHONY: build-createAccountFunction

# build-createAccountFunction:
#     $(MAKE) HANDLER=src/handlers/CreateAccountHandle.ts build-lambda-common

# build-lambda-common:
#     npm install
# 	rm -rf dist
# 	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
# 	npm run build tsconfig-only-handler.json
# 	cp -r dist "$(ARTIFACTS_DIR)/"

# build-RuntimeDependenciesLayer:
# 	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
# 	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
# 	npm install --prefix "$(ARTIFACTS_DIR)/nodejs/"
# 	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
