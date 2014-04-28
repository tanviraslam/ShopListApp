$(document).ready(function(){
	$(".additem,.vplus,.hplus").hover(function(){
		$('.additem').css("background", "#27AE60");
		$('.vplus,.hplus').css("background", "#fff");
	}, function(){
		$('.additem').css("background", "#fff");
		$('.vplus,.hplus').css("background", "#2ECC71");
	});

	//Adding item. Check for when the input is empty
	$('.additem').click(function(){
		var $iteminput = $('#iteminput');
		if($iteminput.val()){
			var itemHtml = '<div class="listitem"><div class="content">'+$iteminput.val()+'</div><i class="fa fa-check tick fa-2x"></i><i class="fa fa-times cross fa-2x"></i></div>'
			$('#results').append(itemHtml);
			$iteminput.val("");
		}
	});

	//Selecting item in result list
	$(document.body).on('click','.content',function(e){
		e.stopPropagation();
		e.preventDefault();
		var $listitem = $(this).parent();
		$listitem.toggleClass('itemselected');
		var $icons = $listitem.children('.tick, .cross');
		$(this).toggleClass('contentwidth');
		if($listitem.hasClass('itemselected')){
			$icons.css({
				"display" : "inline-block"
			});
		}else{
			$icons.css("display","none");
		}
	});

	//hover, select, unselect tick and cross icons
	$(document.body).on('click','.tick',function(){
		$(this).css("color","#fff");
		$(this).next().css("color","#fff");
		$(this).parent().addClass('taskdone').children('.content').css("text-decoration","line-through");
	});

	$(document.body).on('click','.cross',function(){
		$(this).css("color","red");
		var $parent = $(this).parent();
		$parent.fadeTo('slow',0.0, function(){
			$(this).remove();
		});
	});
});
