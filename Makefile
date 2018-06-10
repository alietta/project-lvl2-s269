install: ;@echo "Installing ${PROJECT}....."; \
	npm install
publish:
	npm publish
start:
	npm run babel-node -- src/bin/gendiff.js -f json /home/tatiana/hexlet/project_2/__tests__/__fixtures__/beforeJSON2.json /home/tatiana/hexlet/project_2/__tests__/__fixtures__/afterJSON2.json
lint:
	npm run eslint .
test:
	npm test
.PHONY: install start
