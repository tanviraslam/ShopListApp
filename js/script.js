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
		addItem();
	});

	//Adding item via the return key
	$('#iteminput').keydown(function(event) {
		if(event.which === 13) {
			event.preventDefault();
			event.stopPropagation();
			addItem();
		}
	});

	//Selecting item in result list
	$(document.body).on('mouseenter','.listitem',function(e){
		e.stopPropagation();
		e.preventDefault();
		var $listitem = $(this);
		$listitem.addClass('itemselected');
		var $icons = $listitem.children('.tick, .cross');
		// $(this).toggleClass('contentwidth');
		if($listitem.hasClass('itemselected')){
			$icons.css({
				"display" : "inline-block"
			});
		}else{
			$icons.css("display","none");
		}
	}).on('mouseleave','.listitem',function(e){
		var $listitem = $(this);
		var $icons = $listitem.children('.tick, .cross');
		$listitem.removeClass('itemselected');
		$icons.css("display","none");
	});

	//hover, select, unselect tick and cross icons
	$(document.body).on('click','.tick',function(){
		var $parent = $(this).parent();
		if($(this).hasClass('ticked')){
			$(this).removeClass('ticked').css('color','red').next().css('color','green');
			$parent.removeClass('taskdone').children('.content').css("text-decoration", 'none');
		}else{
			$(this).css("color","#fff").addClass('ticked');
			$(this).next().css("color","#fff");
			$parent.addClass('taskdone').children('.content').css("text-decoration","line-through");
		}
	});

	$(document.body).on('click','.cross',function(){
		$(this).css("color","red");
		var $parent = $(this).parent();
		$parent.fadeTo('slow',0.0, function(e){
			$(this).remove();
		});
	});

	//Slider input form for more detailed list entry
	// $('#iteminput').click(function(){
	// 	$('#inputoptions').slideToggle();
	// });

	//Checking screen size, to adjust the tick and cross icons
	
	//Making the item content editable
	$(document.body)
		.on('mouseover', '.content', function(){
			$(this).css('cursor', 'text');
		})
		.on('click', '.content', function(){
			$(this).attr('contenteditable',function(index, value){
				console.log("test");
				if(value.toLowerCase() === 'true') return false;
				else return true;
			});
		});
});


function addItem(){
	var $iteminput = $('#iteminput');
	var $colors = ['#1ABC9C', '#2ECC71', '#3498DB', '#E67E22', '#E74C3C', '#F39C12', '#D35400'];
	
	if($iteminput.val()){
		var $randCol = $colors[Math.floor(Math.random() * $colors.length)];
		console.log($randCol);
		var itemHtml = '<div class="listitem" style="background:' +$randCol +';"><div class="content" contenteditable=false>'+$iteminput.val()+'</div><i class="fa fa-check tick fa-2x"></i><i class="fa fa-times cross fa-2x"></i></div>';
		$('#results').append(itemHtml);
		$iteminput.val("");
	}else{
		alertify.alert('Please enter an item');
	}
}

