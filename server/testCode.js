Meteor.myFunctions.testXMLtoJSON = function() {

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
	var str = buffer.join("");*/
	
	/*var buffer = [];
	buffer.push("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
	buffer.push("<root>");
	buffer.push("<content>");
	buffer.push("<text>Tables</text>");
	buffer.push("<style>header</style>");
	buffer.push("</content>");
	buffer.push("<content>Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.</content>");
	buffer.push("<content>");
	buffer.push("<text>A simple table (no headers, no width specified, no spans, no styling)</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>The following table has nothing more than a body array</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<body>Column 1</body>");
	buffer.push("<body>Column 2</body>");
	buffer.push("<body>Column 3</body>");
	buffer.push("<body>One value goes here</body>");
	buffer.push("<body>Another one here</body>");
	buffer.push("<body>OK?</body>");
	buffer.push("</table>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>A simple table with nested elements</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>It is of course possible to nest any other type of nodes available in pdfmake inside table cells</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<body>Column 1</body>");
	buffer.push("<body>Column 2</body>");
	buffer.push("<body>Column 3</body>");
	buffer.push("<body>");
	buffer.push("<stack>Let's try an unordered list</stack>");
	buffer.push("<stack>");
	buffer.push("<ul>item 1</ul>");
	buffer.push("<ul>item 2</ul>");
	buffer.push("</stack>");
	buffer.push("</body>");
	buffer.push("<body>or a nested table</body>");
	buffer.push("<body>");
	buffer.push("<table>");
	buffer.push("<body>Col1</body>");
	buffer.push("<body>Col2</body>");
	buffer.push("<body>Col3</body>");
	buffer.push("<body>1</body>");
	buffer.push("<body>2</body>");
	buffer.push("<body>3</body>");
	buffer.push("<body>1</body>");
	buffer.push("<body>2</body>");
	buffer.push("<body>3</body>");
	buffer.push("</table>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Inlines can be </text>");
	buffer.push("<text>");
	buffer.push("<text>styled");
	buffer.push("</text>");
	buffer.push("<italics>true</italics>");
	buffer.push("</text>");
	buffer.push("<text>");
	buffer.push("<text>easily as everywhere else</text>");
	buffer.push("<fontSize>10</fontSize>");
	buffer.push("</text>");
	buffer.push("</body>");
	buffer.push("</table>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>Defining column widths</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>Tables support the same width definitions as standard columns:</content>");
	buffer.push("<content>");
	buffer.push("<bold>true</bold>");
	buffer.push("<ul>auto</ul>");
	buffer.push("<ul>star</ul>");
	buffer.push("<ul>fixed value</ul>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<widths>100</widths>");
	buffer.push("<widths>*</widths>");
	buffer.push("<widths>200</widths>");
	buffer.push("<widths>*</widths>");
	buffer.push("<body>width=100</body>");
	buffer.push("<body>star-sized</body>");
	buffer.push("<body>width=200</body>");
	buffer.push("<body>star-sized</body>");
	buffer.push("<body>fixed-width cells have exactly the specified width</body>");
	buffer.push("<body>");
	buffer.push("<text>nothing interesting here</text>");
	buffer.push("<italics>true</italics>");
	buffer.push("<color>gray</color>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>nothing interesting here</text>");
	buffer.push("<italics>true</italics>");
	buffer.push("<color>gray</color>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>nothing interesting here</text>");
	buffer.push("<italics>true</italics>");
	buffer.push("<color>gray</color>");
	buffer.push("</body>");
	buffer.push("</table>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>Headers</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages</content>");
	buffer.push("<content>");
	buffer.push("<text>It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there's not enough space for the first row to be rendered here</text>");
	buffer.push("<color>gray</color>");
	buffer.push("<italics>true</italics>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<headerRows>1</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</body>");
	buffer.push("<body>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</body>");
	buffer.push("<body>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</body>");
	buffer.push("</table>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>Column/row spans</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>Each cell-element can set a rowSpan or colSpan</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<color>#444</color>");
	buffer.push("<table>");
	buffer.push("<widths>200</widths>");
	buffer.push("<widths>auto</widths>");
	buffer.push("<widths>auto</widths>");
	buffer.push("<headerRows>2</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header with Colspan = 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("<colSpan>2</colSpan>");
	buffer.push("<alignment>center</alignment>");
	buffer.push("</body>");
	buffer.push("<body />");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("<alignment>center</alignment>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("<alignment>center</alignment>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("<alignment>center</alignment>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("<alignment>center</alignment>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>");
	buffer.push("<rowSpan>3</rowSpan>");
	buffer.push("<text>rowSpan set to 3");
	buffer.push("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</text>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body></body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>");
	buffer.push("<colSpan>2</colSpan>");
	buffer.push("<rowSpan>2</rowSpan>");
	buffer.push("<text>Both:");
	buffer.push("rowSpan and colSpan");
	buffer.push("can be defined at the same time</text>");
	buffer.push("</body>");
	buffer.push("<body></body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body></body>");
	buffer.push("<body></body>");
	buffer.push("</table>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>Styling tables</text>");
	buffer.push("<style>subheader</style>");
	buffer.push("</content>");
	buffer.push("<content>You can provide a custom styler for the table. Currently it supports:</content>");
	buffer.push("<content>");
	buffer.push("<ul>line widths</ul>");
	buffer.push("<ul>line colors</ul>");
	buffer.push("<ul>cell paddings</ul>");
	buffer.push("</content>");
	buffer.push("<content>with more options coming soon...");
	buffer.push("");
	buffer.push("pdfmake currently has a few predefined styles (see them on the next page)</content>");
	buffer.push("<content>");
	buffer.push("<text>noBorders:</text>");
	buffer.push("<fontSize>14</fontSize>");
	buffer.push("<bold>true</bold>");
	buffer.push("<pageBreak>before</pageBreak>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>8</margin>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<headerRows>1</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("</table>");
	buffer.push("<layout>noBorders</layout>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>headerLineOnly:</text>");
	buffer.push("<fontSize>14</fontSize>");
	buffer.push("<bold>true</bold>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>20</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>8</margin>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<headerRows>1</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("</table>");
	buffer.push("<layout>headerLineOnly</layout>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>lightHorizontalLines:</text>");
	buffer.push("<fontSize>14</fontSize>");
	buffer.push("<bold>true</bold>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>20</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>8</margin>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<headerRows>1</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("</table>");
	buffer.push("<layout>lightHorizontalLines</layout>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<text>but you can provide a custom styler as well</text>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>20</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>8</margin>");
	buffer.push("</content>");
	buffer.push("<content>");
	buffer.push("<style>tableExample</style>");
	buffer.push("<table>");
	buffer.push("<headerRows>1</headerRows>");
	buffer.push("<body>");
	buffer.push("<text>Header 1</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 2</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>");
	buffer.push("<text>Header 3</text>");
	buffer.push("<style>tableHeader</style>");
	buffer.push("</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("<body>Sample value 1</body>");
	buffer.push("<body>Sample value 2</body>");
	buffer.push("<body>Sample value 3</body>");
	buffer.push("</table>");
	buffer.push("<layout />");
	buffer.push("</content>");
	buffer.push("<styles>");
	buffer.push("<header>");
	buffer.push("<fontSize>18</fontSize>");
	buffer.push("<bold>true</bold>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>10</margin>");
	buffer.push("</header>");
	buffer.push("<subheader>");
	buffer.push("<fontSize>16</fontSize>");
	buffer.push("<bold>true</bold>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>10</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>5</margin>");
	buffer.push("</subheader>");
	buffer.push("<tableExample>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>5</margin>");
	buffer.push("<margin>0</margin>");
	buffer.push("<margin>15</margin>");
	buffer.push("</tableExample>");
	buffer.push("<tableHeader>");
	buffer.push("<bold>true</bold>");
	buffer.push("<fontSize>13</fontSize>");
	buffer.push("<color>black</color>");
	buffer.push("</tableHeader>");
	buffer.push("</styles>");
	buffer.push("<defaultStyle />");
	buffer.push("</root>");
	var str = buffer.join("");
	
	let translator = Meteor.myFunctions.translate_XML;
	
	translator.translate(str);*/
	
	// playground requires you to assign document definition to a variable called dd

	/*var dd = {
		content: [
					{ text: 'Tables', style: 'header' },
					'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
					{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
					'The following table has nothing more than a body array',
					{
							style: 'tableExample',
							table: {
									body: [
											['Column 1', 'Column 2', 'Column 3'],
											['One value goes here', 'Another one here', 'OK?']
									]
							}
					},
					{ text: 'A simple table with nested elements', style: 'subheader' },
					'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
					{
							style: 'tableExample',
							table: {
									body: [
											['Column 1', 'Column 2', 'Column 3'],
											[
													{
															stack: [
																	'Let\'s try an unordered list',
																	{
																			ul: [
																					'item 1',
																					'item 2'
																			]
																	}
															]
													},
													[
														'or a nested table',
														{
															table: {
																body: [
																	[ 'Col1', 'Col2', 'Col3'],
																	[ '1', '2', '3'],
																	[ '1', '2', '3']
																]
															},
														}
													],
													{ text: [
															'Inlines can be ',
															{ text: 'styled\n', italics: true },
															{ text: 'easily as everywhere else', fontSize: 10 } ]
													}
											]
									]
							}
					},
					{ text: 'Defining column widths', style: 'subheader' },
					'Tables support the same width definitions as standard columns:',
					{
							bold: true,
							ul: [
									'auto',
									'star',
									'fixed value'
							]
					},
					{
							style: 'tableExample',
							table: {
									widths: [100, '*', 200, '*'],
									body: [
											[ 'width=100', 'star-sized', 'width=200', 'star-sized'],
											[ 'fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
									]
							}
					},
					{ text: 'Headers', style: 'subheader' },
					'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
					{ text: [ 'It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here' ], color: 'gray', italics: true },
					{
							style: 'tableExample',
							table: {
									headerRows: 1,
									// keepWithHeaderRows: 1,
									// dontBreakRows: true,
									body: [
											[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
											[
													'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
											]
									]
							}
					},
					{ text: 'Column/row spans', style: 'subheader' },
					'Each cell-element can set a rowSpan or colSpan',
					{
							style: 'tableExample',
							color: '#444',
							table: {
									widths: [ 200, 'auto', 'auto' ],
									headerRows: 2,
									// keepWithHeaderRows: 1,
									body: [
											[{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
											[{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ { rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3' ],
											[ '', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, '' ],
											[ 'Sample value 1', '', '' ],
									]
							}
					},
					{ text: 'Styling tables', style: 'subheader' },
					'You can provide a custom styler for the table. Currently it supports:',
					{
							ul: [
									'line widths',
									'line colors',
									'cell paddings',
							]
					},
					'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
					{ text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
					{
							style: 'tableExample',
							table: {
									headerRows: 1,
									body: [
											[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
									]
							},
							layout: 'noBorders'
					},
					{ text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
					{
							style: 'tableExample',
							table: {
									headerRows: 1,
									body: [
											[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
									]
							},
							layout: 'headerLineOnly'
					},
					{ text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
					{
							style: 'tableExample',
							table: {
									headerRows: 1,
									body: [
											[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
									]
							},
							layout: 'lightHorizontalLines'
					},
									{ text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
									{
							style: 'tableExample',
							table: {
									headerRows: 1,
									body: [
											[{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader'}, { text: 'Header 3', style: 'tableHeader' }],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
											[ 'Sample value 1', 'Sample value 2', 'Sample value 3' ],
									]
							},
							layout: {
															hLineWidth: function(i, node) {
																	return (i === 0 || i === node.table.body.length) ? 2 : 1;
															},
															vLineWidth: function(i, node) {
																	return (i === 0 || i === node.table.widths.length) ? 2 : 1;
															},
															hLineColor: function(i, node) {
																	return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
															},
															vLineColor: function(i, node) {
																	return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
															},
															// paddingLeft: function(i, node) { return 4; },
															// paddingRight: function(i, node) { return 4; },
															// paddingTop: function(i, node) { return 2; },
															// paddingBottom: function(i, node) { return 2; }
							}
					}
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 0, 0, 10]
			},
			subheader: {
				fontSize: 16,
				bold: true,
				margin: [0, 10, 0, 5]
			},
			tableExample: {
				margin: [0, 5, 0, 15]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
		defaultStyle: {
			// alignment: 'justify'
		}

	};
	
	console.log(JSON.stringify(dd));*/
	
	var buffer = [];
	buffer.push("{");
	buffer.push("\"content\": [{");
	buffer.push("\"text\": \"Tables\",");
	buffer.push("\"style\": \"header\"");
	buffer.push("}, \"Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.\", {");
	buffer.push("\"text\": \"A simple table (no headers, no width specified, no spans, no styling)\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"The following table has nothing more than a body array\", {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"body\": [\"Column 1\", \"Column 2\", \"Column 3\", \"One value goes here\", \"Another one here\", \"OK?\"]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": \"A simple table with nested elements\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"It is of course possible to nest any other type of nodes available in pdfmake inside table cells\", {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"body\": [\"Column 1\", \"Column 2\", \"Column 3\", {");
	buffer.push("\"stack\": [\"Let's try an unordered list\", {");
	buffer.push("\"ul\": [\"item 1\", \"item 2\"]");
	buffer.push("}]");
	buffer.push("}, \"or a nested table\", {");
	buffer.push("\"table\": {");
	buffer.push("\"body\": [\"Col1\", \"Col2\", \"Col3\", 1, 2, 3, 1, 2, 3]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": [\"Inlines can be \", {");
	buffer.push("\"text\": \"styled\",");
	buffer.push("\"italics\": \"true\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"easily as everywhere else\",");
	buffer.push("\"fontsize\": 10");
	buffer.push("}]");
	buffer.push("}]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": \"Defining column widths\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"Tables support the same width definitions as standard columns:\", {");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"ul\": [\"auto\", \"star\", \"fixed value\"]");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"widths\": [100, \"*\", 200, \"*\"],");
	buffer.push("\"body\": [\"width=100\", \"star-sized\", \"width=200\", \"star-sized\", \"fixed-width cells have exactly the specified width\", {");
	buffer.push("\"text\": \"nothing interesting here\",");
	buffer.push("\"italics\": \"true\",");
	buffer.push("\"color\": \"gray\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"nothing interesting here\",");
	buffer.push("\"italics\": \"true\",");
	buffer.push("\"color\": \"gray\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"nothing interesting here\",");
	buffer.push("\"italics\": \"true\",");
	buffer.push("\"color\": \"gray\"");
	buffer.push("}]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": \"Headers\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages\", {");
	buffer.push("\"text\": \"It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there's not enough space for the first row to be rendered here\",");
	buffer.push("\"color\": \"gray\",");
	buffer.push("\"italics\": \"true\"");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"headerrows\": 1,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\", \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\", \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": \"Column/row spans\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"Each cell-element can set a rowSpan or colSpan\", {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"color\": \"#444\",");
	buffer.push("\"table\": {");
	buffer.push("\"widths\": [200, \"auto\", \"auto\"],");
	buffer.push("\"headerrows\": 2,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header with Colspan = 2\",");
	buffer.push("\"style\": \"tableHeader\",");
	buffer.push("\"colspan\": 2,");
	buffer.push("\"alignment\": \"center\"");
	buffer.push("}, {}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\",");
	buffer.push("\"alignment\": \"center\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\",");
	buffer.push("\"alignment\": \"center\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\",");
	buffer.push("\"alignment\": \"center\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\",");
	buffer.push("\"alignment\": \"center\"");
	buffer.push("}, \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", {");
	buffer.push("\"rowspan\": 3,");
	buffer.push("\"text\": \"rowSpan set to 3Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor\"");
	buffer.push("}, \"Sample value 2\", \"Sample value 3\", {}, \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", {");
	buffer.push("\"colspan\": 2,");
	buffer.push("\"rowspan\": 2,");
	buffer.push("\"text\": \"Both:rowSpan and colSpancan be defined at the same time\"");
	buffer.push("}, {}, \"Sample value 1\", {}, {}]");
	buffer.push("}");
	buffer.push("}, {");
	buffer.push("\"text\": \"Styling tables\",");
	buffer.push("\"style\": \"subheader\"");
	buffer.push("}, \"You can provide a custom styler for the table. Currently it supports:\", {");
	buffer.push("\"ul\": [\"line widths\", \"line colors\", \"cell paddings\"]");
	buffer.push("}, \"with more options coming soon...pdfmake currently has a few predefined styles (see them on the next page)\", {");
	buffer.push("\"text\": \"noBorders:\",");
	buffer.push("\"fontsize\": 14,");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"pagebreak\": \"before\",");
	buffer.push("\"margin\": [0, 0, 0, 8]");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"headerrows\": 1,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\"]");
	buffer.push("},");
	buffer.push("\"layout\": \"noBorders\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"headerLineOnly:\",");
	buffer.push("\"fontsize\": 14,");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"margin\": [0, 20, 0, 8]");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"headerrows\": 1,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\"]");
	buffer.push("},");
	buffer.push("\"layout\": \"headerLineOnly\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"lightHorizontalLines:\",");
	buffer.push("\"fontsize\": 14,");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"margin\": [0, 20, 0, 8]");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"headerrows\": 1,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\"]");
	buffer.push("},");
	buffer.push("\"layout\": \"lightHorizontalLines\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"but you can provide a custom styler as well\",");
	buffer.push("\"margin\": [0, 20, 0, 8]");
	buffer.push("}, {");
	buffer.push("\"style\": \"tableExample\",");
	buffer.push("\"table\": {");
	buffer.push("\"headerrows\": 1,");
	buffer.push("\"body\": [{");
	buffer.push("\"text\": \"Header 1\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 2\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, {");
	buffer.push("\"text\": \"Header 3\",");
	buffer.push("\"style\": \"tableHeader\"");
	buffer.push("}, \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\", \"Sample value 1\", \"Sample value 2\", \"Sample value 3\"]");
	buffer.push("},");
	buffer.push("\"layout\": {}");
	buffer.push("}],");
	buffer.push("\"styles\": {");
	buffer.push("\"header\": {");
	buffer.push("\"fontsize\": 18,");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"margin\": [0, 0, 0, 10]");
	buffer.push("},");
	buffer.push("\"subheader\": {");
	buffer.push("\"fontsize\": 16,");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"margin\": [0, 10, 0, 5]");
	buffer.push("},");
	buffer.push("\"tableexample\": {");
	buffer.push("\"margin\": [0, 5, 0, 15]");
	buffer.push("},");
	buffer.push("\"tableheader\": {");
	buffer.push("\"bold\": \"true\",");
	buffer.push("\"fontsize\": 13,");
	buffer.push("\"color\": \"black\"");
	buffer.push("}");
	buffer.push("},");
	buffer.push("\"defaultstyle\": {}");
	buffer.push("}");
	var str = buffer.join("");
	
	var dd = JSON.parse(str);
	console.log(dd);

}
