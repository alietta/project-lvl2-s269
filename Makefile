install: ;@echo "Installing ${PROJECT}....."; \
	npm install
publish:
	npm publish
start:
	npm run babel-node -- src/bin/gendiff.js /home/tatiana/hexlet/project_2/__tests__/__fixtures__/before.json /home/tatiana/hexlet/project_2/__tests__/__fixtures__/after.json
lint:
	npm run eslint .
test:
	npm test
.PHONY: install start
