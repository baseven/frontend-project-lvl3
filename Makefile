install:
	npm install

develop:
	npx webpack-dev-server 

deploy:
	npm run deploy

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
