


$(document).ready(function(){
 $('.modal').modal();
	$('.modal-trigger').click(function(e) {
		$('.modal-content-entries').empty();
		var content =  '<ul id="sortable" class="collection">';
		$('.filled-in:checked').each(function( index ) {

			var id = "#" + $(this).val();
			var name = $(id).find('.name').text();
			var quote = $(id).find('.layer-input').val();
			var linkTitle = $(id).find('.sub-title').text();
			var url = $(id).find('.sub-title').attr('href');

			content += '<li class="collection-item">'
			// content += '<p style="margin: 0; display:inline-block;">' + quote + '</p></div>';
			content += '<b><a style="display:inline-block;" href="' + url + '">' + linkTitle + '</a></b><br>';
			content += '<b><p style="margin: 0; display:inline-block;">' + name + ' says:&nbsp;&nbsp;</p></b>';
			content += '<p style="margin: 0; display:inline-block;">' + quote + '</p></div>';
			content += '</li>'
			
		});
		content += '</ul>'

		$('.modal-content-entries').append(content);
		// content =  '<ul id="sortable" class="collection"><li class="collection-item">1Alvin</li><li class="collection-item">2Alvin</li><li class="collection-item">3Alvin</li><li class="collection-item">4Alvin</li></ul>'
		// $('.modal-content').append(content);
		// var el = $('#sortable').get(0).outerHTML;
		
		var el = document.getElementById('sortable');
// var sortable = Sortable.create(el);
		var sortable = new Sortable(el, {ghostClass: "sortable-ghost", chosenClass: "current-ghost"});
	});
	
   
   

});


$(document).ready(function(){

	$('.dropdown-trigger').dropdown();
	$('.collapsible').collapsible();
	$('select').formSelect();

	$('.caret').click(function(e) {
		var inp = $(this).parent().find('input.dropdown-trigger');
		inp.trigger("click");	
	});
	$('select').on('change', function(e) {
		var i = e.target.id.substring(4);
		var q = $(this).val();
		$("#dd-" + i).val(q); 
		$("#dd-" + i).trigger("change");

	});
	$('li.selected').removeClass('selected');
	$('.layer-input').on('change', function(){
	    $(this).closest('.setQuoteForm').submit();
	    console.log("submitted");
	});
	$('#user-details').on('submit', function() {
		 location.reload(true);
	})

	// $(".layer-input").on("change paste keyup", function() {
	//    alert($(this).val()); 
	// });
});
     
