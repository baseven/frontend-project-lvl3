install:
	npm install

test:
	npm test

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch

lint:
	npx eslint .

publish:
	npm publish	--dry-run