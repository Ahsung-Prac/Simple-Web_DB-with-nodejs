const mdbConn = require('./mariaConn.js')
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', function(req, res)
{
		//res.send("hello");
        res.render('client.html')
});

var rowss
/* POST helo page. */
app.post('/hello', function(req, res, next)
{
        var str = req.query.input1;
        console.log(str);
		lstr = str.toLowerCase();
		var jstr;
		mdbConn.getUserList(lstr)
  		.then((rows) => {
		if(typeof rows != "string")
			jstr = JSON.stringify(rows);
		else
			jstr = null;

		res.json( {msg:str, sql:rows});
		if(!jstr){
		console.log("Empty tupble  or Invalid sql query");
		}
		else
      		console.log(jstr+"\n");
	})
  	.catch((errMsg) => {
    	console.log(errMsg);
	});
});


const port = process.env.PORT || 8085;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
