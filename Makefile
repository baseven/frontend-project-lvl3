deploy:
	npm run deploy

develop:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

.PHONY: 
	test