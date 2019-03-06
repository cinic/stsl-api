# Local running

1. Install latest lts [Node.js and npm](https://nodejs.org/)
2. Clone repository
<pre>
git clone https://github.com/cinic/stsl-api.git
</pre>
3. Run app
<pre>
npm start
</pre>
4. Visit [http://localhost:3009/symbols/a](http://localhost:3009/symbols/a)
5. Try curl
<pre>
curl http://localhost:3009/symbols/aapl
curl http://localhost:3009/symbols/1
</pre>

# Run tests

1. Install npm dependencies
<pre>
npm i
</pre>
2. Run tests
<pre>
npm run test
</pre>
