/*
Developed by Paul Makarov
7/13/2012
For use in Strong Choices Instructor Guide Mobile Web App

*/
// JavaScript Document
	
	$('[data-role=page]').live('pageshow', function(event){
	
		
		if($.mobile.activePage !== undefined && $.mobile.activePage.attr("id") == "topics")
		{
			//alert($.mobile.activePage.find('textarea[name=notes-box]').attr('data-id'));
			var ta = $.mobile.activePage.find('textarea[name=notes-box]');
			
			var id = ta.attr('data-id');
			
			
				$.mobile.activePage.find('#notesSub').bind('click', function(event)
				{
					alert("Note Submitted");
					var text = ta.val();
					var noteObject = new Object();
					noteObject.id = id;
					noteObject.text = text;
					save(noteObject);
				});
				
				loadStoredDataIntoTextField();
				
			
		}
		
	});
	
	
	$('#notesPage').live('pageshow',function(event) {
         
		 // console.log(storage());
		 
		 var markup = storage();
		 if(markup != "<div data-role='content'></div>")
		 {
			 $(this).find('[ data-role=content]').html(markup);
			 $header = $(this).children( ":jqmData(role=header)" );
			 $header.find( "h1" ).html( "My Notes" );
			 $content = $(this).children( ":jqmData(role=content)" );
			 $(this).page();
			 $content.find(":jqmData(role=collapsible)").collapsible();
		 }
		
        
      });

	// load stored data (if it exists)
	function loadStoredDataIntoTextField()
	{
		var ta = $.mobile.activePage.find('textarea[name=notes-box]');
		var id = ta.attr('data-id');
		//alert(" for " + id);
		//Need to port the JSON object into a usuable javascript object
		var noteObject = JSON.parse(localStorage.getItem("note"+id));
		//if we have data  stored for this page, then write it to the text area
		if(noteObject != null)
		{
			ta.val(noteObject.text);
		}
		else return;
	}
	
	// save item
	function save(item)
	{
	 	localStorage.setItem("note"+item.id, JSON.stringify(item));
	}
	
	// get storage content * DEPRECATED *
	function storage()
	{
	var output= "<div data-role='content'>";
	   for (i=0; i <= localStorage.length - 1; i++) 
	    {  
		
		  note = localStorage.key(i);  
		 // console.log(note);
		  var noteObject = JSON.parse(localStorage.getItem(note));
		 var text = noteObject.text.replace(/\n\r?/g, '<br />');
			 output += "<div data-role='collapsible' data-theme='b' data-content-theme='a' data-mini='true'><h3>Page: " + noteObject.id + "</h3>";
			 output += "<p>" + text +"</p></div>";
		
	   }
	   return output += "</div>";
	}
	
	// clear storage
	function clear () 
	{
	   localStorage.clear();
	}