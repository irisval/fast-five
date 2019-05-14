$(function() {
	$('.filter').click(function(e) {
		let week =  $(this).attr('id');
		if (week == "filter-all") {
			$('div.sub').show();
			$('#viewing').html("viewing all submissions");
		} else {
			$('div.sub:not' + "(." + week.replace("filter-", "") +  ")").parent().hide();
			$('div.sub.'+week.replace("filter-", "")).parent().show();
			$('#viewing').html("viewing submissions from week of " + week.replace("filter-",""));
		}
		
		return false;
	});


	
		// let tf = $('.other-input-field');
		// $('.option-other').click(function(e) {
		// 	if (tf.hasClass('hidden')) {
		// 		tf.addClass('visible').removeClass('hidden');
		// 	} else {
		// 		tf.addClass('hidden').removeClass('visible');
		// 	}
		// });

	
});

