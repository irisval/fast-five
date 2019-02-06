

// $(window).on('load', function() {
 

// });

$(function() {
	$('.filter').click(function(e) {
		let week =  $(this).attr('id');
		if (week == "filter-all") {
			$('div.sub').show();
			$('#viewing').html("viewing all submissions");
		} else {
			$('div.sub:not' + "(." + week.replace("filter-", "") +  ")").hide();
			$('div.sub.'+week.replace("filter-", "")).show();
			$('#viewing').html("viewing submissions from week of " + week.replace("filter-",""));
		}
		
		return false;
	});
});


// document.addEventListener('DOMContentLoaded', function(){ 
//     let wf =  document.querySelectorAll(".filter");

// 	for (let i = 0; i < wf.length; i++) {
// 		wf[i].addEventListener("click", function(e) {
// 			let w = e.id;
// 			console.log("w: " + w);
// 			let v = document.querySelectorAll("div.sub[class*='" + w + "']");
// 			console.log(v);
// 			v.forEach(function(v) {
// 				v.classList.remove("none");
// 			});
// 			let h = document.querySelectorAll("div.sub:not([class*='" + w + "'])");;
// 			h.forEach(function(h) {
// 				h.classList.add("none");
// 			});
// 			//console.log(h);

// 		});
// 	}
// }, true);



