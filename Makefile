install: ;@echo "Installing ${PROJECT}....."; \
	npm install
publish:
	npm publish
lint:
	npm run eslint .

.PHONY: install start
