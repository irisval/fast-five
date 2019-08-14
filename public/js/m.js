$(document).ready(function(){

	$('.modal-trigger').click(function(e) {
		$('.filled-in:checked').each(function( index ) {

			var id = "#" + $(this).val();
			var name = $(id).find('.name').text();
			var quote = $(id).find('#ff option:selected').text();
			var linkTitle = $(id).find('.sub-title').text();
			var url = $(id).find('.sub-title').attr('href');

			content = '<div style="margin-top: 20px; margin-bottom: 1px;"><b><a style="display:inline-block;" href="' + url + '">' + linkTitle + '</a></b></div>';
			content += '<div style="margin-top: 0;"><b><p style="margin: 0; display:inline-block;">' + name + ' says:&nbsp;&nbsp;</p></b>';
			content += '<p style="margin: 0; display:inline-block;">' + quote + '</p></div>';
		
			
			$('.modal-content').append(content);
		});

	});
	
    $('.modal').modal();

});


$(document).ready(function(){
	// $('select').formSelect();
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

	// $(".layer-input").on("change paste keyup", function() {
	//    alert($(this).val()); 
	// });
});
     
