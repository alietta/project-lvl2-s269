install: ;@echo "Installing ${PROJECT}....."; \
	npm install
gendiff:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npm run eslint .

.PHONY: install start
