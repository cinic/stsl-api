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

1. Visit [http://localhost:3009/symbols/a](http://localhost:3009/symbols/a)
<pre>
curl http://localhost:3009/symbols/aapl
{"price":175.85,"logo":"https://storage.googleapis.com/iex/api/logos/AAPL.png","news":"https://api.iextrading.com/1.0/stock/aapl/article/8921854722133528"}

curl http://localhost:3009/symbols/1
{"message":"Unknown symbol"}
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
