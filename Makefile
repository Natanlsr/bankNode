.PHONY: build-RuntimeDependenciesLayer build-lambda-common build-createAccountFunction build-depositCommandFunction build-withdrawCommandFunction 
.PHONY: build-transferCommandFunction build-getAccountCommandFunction

build-createAccountFunction:
	$(MAKE) HANDLER=src/handlers/CreateAccountHandle.ts build-lambda-common

build-depositCommandFunction:
	$(MAKE) HANDLER=src/handlers/DepositCommandHandle.ts build-lambda-common

build-withdrawCommandFunction:
	$(MAKE) HANDLER=src/handlers/WithdrawCommandHandle.ts build-lambda-common

build-transferCommandFunction:
	$(MAKE) HANDLER=src/handlers/TransferCommandHandle.ts build-lambda-common

build-getAccountCommandFunction:
	$(MAKE) HANDLER=src/handlers/GetAccountCommandHandle.ts build-lambda-common

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"

build-lambda-common:
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\", \"src/models/BaseDocument.ts\"] }" > tsconfig-only-handler.json
	npm run build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"
