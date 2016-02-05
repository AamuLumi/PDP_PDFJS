let fs = Meteor.npmRequire('fs');

Meteor.startup(function() {
	
	let dir = process.cwd() + '/.files/';
	
	if (!fs.existsSync(dir)){
    	fs.mkdirSync(dir);
	}
	
	WebApp.connectHandlers.use(function(req, res, next) {
		var re = /^\/pdf\/(.*)$/.exec(req.url);
		if (re !== null) {   // Only handle URLs that start with /uploads_url_prefix/*
			var filePath = process.cwd() + '/.files/' + re[1];
			var data = fs.readFileSync(filePath);
			res.writeHead(200, {"Content-Type" : "application/pdf" });
			res.write(data, "binary");
			res.end();
		} else {  // Other urls will have default behaviors
			next();
		}
	});
	
	

});

Meteor.methods({
  'PDF.generate' ({datas}) {
    return "http://" + this.connection.httpHeaders.host + '/' +
     Meteor.myFunctions.generatePDF(datas);
		
	/*Test only*/
	  
	/*var buffer = [];
	buffer.push("<?xml version=\"1.0\"?>");
	buffer.push("<document fontSize=\"16\" font=\"arial\" fontColor=\"black\">");
	buffer.push("<!--You have a CHOICE of the next 4 items at this level-->");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<table fontSize=\"16\" font=\"helvetica\" fontColor=\"black\">");
	buffer.push("<!--Optional:-->");
	buffer.push("<th fontSize=\"16\" font=\"courrier\" fontColor=\"yellow\">");
	buffer.push("<!--You have a CHOICE of the next 3 items at this level-->");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<tr fontSize=\"16\" font=\"courrier\" fontColor=\"red\">");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<text fontSize=\"16\" font=\"helvetica\" fontColor=\"black\">string</text>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<field type=\"text\" fontSize=\"16\" font=\"helvetica\" fontColor=\"green\"/>");
	buffer.push("</tr>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<text fontSize=\"16\" font=\"arial\" fontColor=\"green\">string</text>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<field type=\"text\" fontSize=\"16\" font=\"courrier\" fontColor=\"green\"/>");
	buffer.push("</th>");
	buffer.push("<td fontSize=\"16\" font=\"arial\" fontColor=\"yellow\">");
	buffer.push("<!--You have a CHOICE of the next 3 items at this level-->");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<tr fontSize=\"16\" font=\"courrier\" fontColor=\"green\">");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<text fontSize=\"16\" font=\"helvetica\" fontColor=\"yellow\">string</text>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<field type=\"numbers\" fontSize=\"16\" font=\"courrier\" fontColor=\"black\"/>");
	buffer.push("</tr>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<text fontSize=\"16\" font=\"courrier\" fontColor=\"green\">string</text>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<field type=\"numbers\" fontSize=\"16\" font=\"helvetica\" fontColor=\"yellow\"/>");
	buffer.push("</td>");
	buffer.push("</table>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<line type=\"horizontal\"/>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<text fontSize=\"16\" font=\"helvetica\" fontColor=\"black\">string</text>");
	buffer.push("<!--1 or more repetitions:-->");
	buffer.push("<field type=\"date\" fontSize=\"16\" font=\"arial\" fontColor=\"blue\"/>");
	buffer.push("</document>");
	buffer.push("");
	var str = buffer.join("");
	  
    Meteor.myFunctions.translate_XML.translate(str);
	  
	return 'blah';*/
  }
});
