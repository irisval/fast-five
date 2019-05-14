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
	$('select').formSelect();
	$('.dropdown-trigger').dropdown();

});

     
