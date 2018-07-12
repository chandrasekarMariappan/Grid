
$(function(){
	mainTableSelection('.lp-table');
	
});

function masonryBox(){
	 $('#subCategoryItemPanel').masonry({
      	itemSelector: '.btnOrange',
      	columnWidth: 100,
      	fitWidth: true
    });
}

function mainTableSelection(target){
	$(target + ' table').focus();
	$(document).on('keydown', target + ' table', function(e){
		var $id 	= $(target + ' table tr.selected');
		var index 	= $(target + ' table tbody tr').index($id);
		if(e.keyCode === 40){
			e.preventDefault();
			if($id.next('tr').length){
				$id.removeClass('selected').next().addClass('selected');
			}
		}
		if(e.keyCode === 38){
			e.preventDefault();
			if($id.prev('tr').length){
				$id.removeClass('selected').prev().addClass('selected');
			}
		}
		$(target).scrollTop(index * 17);
	});
	
	$(document).on('click', target + ' table tbody tr', function(e){
		$(target + ' table tbody tr').removeClass('selected');
		$(this).addClass('selected');
		$(target + ' table').focus();
	});
}

