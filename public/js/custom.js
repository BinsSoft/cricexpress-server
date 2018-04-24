$(function(){
	
	$(".m-tab-menu").click(function(){
		$(".m-tab-menu").removeClass('active');
		$(this).addClass('active');
		var contentElement = $(this).find("a").attr('href');
		$(".m-tab-content").hide();
		$(contentElement).show();
		if(contentElement == '#scorecards') {
			$.ajax({
				url : '/match-score/'+$(this).data("match"),
				type : 'GET',
				beforeSend : function(){},
				success : function(respose) {
					$(".home-loader-container").hide();
					if(Object.keys(respose.data).length > 0) {
						const element =  $(".match-score-setails");
						var appendHtml = '';
						for(var i in respose.data) {
							var row = respose.data[i];
							appendHtml += '<div class="ins-content" data-id="'+i+'">';
								appendHtml += '<div class="ins-headding">';
									appendHtml += '<div class="ins-headding-name">';
										appendHtml += row.heading;
									appendHtml += '</div>';	
									appendHtml += '<div class="ins-headding-score">';
										appendHtml += row.currentScore;
									appendHtml += '</div>';		
									appendHtml += '<div class="clearfix">';		
									appendHtml += '</div>';		
								appendHtml += '</div>';
								appendHtml += '<div class="ins-score">';
									appendHtml += '<table cellpadding="0" cellspacing="0">';
										appendHtml += '<thead>';
											appendHtml += '<tr>';
												appendHtml += '<th></th>';
												appendHtml += '<th></th>';
												appendHtml += '<th>Run</th>';
												appendHtml += '<th>Ball</th>';
												appendHtml += '<th>4(s)</th>';
												appendHtml += '<th>6(s)</th>';
											appendHtml += '</tr>';
										appendHtml += '</thead>';
										appendHtml += '<tbody>';
										if(row.scores != undefined) {
											for(var s of row.scores) {
												appendHtml += '<tr>';
													appendHtml += '<td>'+s.name+'</td>';
													appendHtml += '<td>'+s.status+'</td>';
													appendHtml += '<td>'+s.run+'</td>';
													appendHtml += '<td>'+s.ball+'</td>';
													appendHtml += '<td>'+s.fours+'</td>';
													appendHtml += '<td>'+s.sixs+'</td>';
												appendHtml += '</tr>';
											}
										}
										if(row.extra != undefined) {
											appendHtml += '<tr>';
												appendHtml += '<td>Extra</td>';
												appendHtml += '<td >'+row.extra.run+'</td>';
												appendHtml += '<td colspan="4">'+row.extra.ball+'</td>';
												
											appendHtml += '</tr>';
										}
										if(row.did_not_bat != undefined) {
											appendHtml += '<tr>';
												appendHtml += '<td colspan="1">Did Not Bat</td>';
												appendHtml += '<td colspan="5">'+row.did_not_bat.name+'</td>';
												
											appendHtml += '</tr>';
										}
										if(row.fallOfWickets != undefined) {
											appendHtml += '<tr>';
													appendHtml += '<td colspan="1" >Fall Of Wickets</td>';
													appendHtml += '<td colspan="5">';
											for( var w of row.fallOfWickets ) {
												appendHtml += w+'<br/>';
											}
											appendHtml += '</td>';
											appendHtml += '</tr>';
										}
										appendHtml += '</tbody>';
									appendHtml += '</table>';
								appendHtml += '</div>';
								appendHtml += '<div class="ins-score">';
									appendHtml += '<table cellpadding="0" cellspacing="0">';
										appendHtml += '<thead>';
											appendHtml += '<tr>';
												appendHtml += '<th></th>';
												appendHtml += '<th>O</th>';
												appendHtml += '<th>M</th>';
												appendHtml += '<th>R</th>';
												appendHtml += '<th>W</th>';
												appendHtml += '<th>NB</th>';
												appendHtml += '<th>WB</th>';
												appendHtml += '<th>ECO</th>';
											appendHtml += '</tr>';
										appendHtml += '</thead>';
										appendHtml += '<tbody>';
										if(row.bowlers != undefined) {
											for(var b of row.bowlers) {
												appendHtml += '<tr>';
													appendHtml += '<td width="5%">'+b.name+'</td>';
													appendHtml += '<td>'+b.over+'</td>';
													appendHtml += '<td>'+b.madin+'</td>';
													appendHtml += '<td>'+b.run+'</td>';
													appendHtml += '<td>'+b.wicket+'</td>';
													appendHtml += '<td>'+b.NB+'</td>';
													appendHtml += '<td>'+b.WD+'</td>';
													appendHtml += '<td>'+b.ECO+'</td>';
												appendHtml += '</tr>';
											}
										}
										appendHtml += '</tbody>';
									appendHtml += '</table>';
								appendHtml += '</div>';		
							appendHtml += '</div>';
						}
						element.html(appendHtml);
						$(".ins-headding").click(function(){
							$(".ins-score").slideUp();
							$(this).parent().find(".ins-score").slideDown();
						});
						$(".ins-headding").first().trigger('click');
					}
				}
			})
		}
	})

	var url = window.location.href;
	var urlArr = url.split("#");
	if(urlArr.length > 1) {
		$("a[href='#"+urlArr[1]+"']").parent().trigger("click");
	} else {
		$(".m-tab-menu.active").trigger("click");
	}


	$("input[name=search-series]").keyup(function(){
		const searchText = $(this).val();
		$(".series-container .series-item").removeClass('hidden');
		$(".series-container .series-item").each(function(i,e) {
			var itemHtml = $(e).html();
			if(itemHtml.indexOf(searchText) == -1 ) {
				$(e).addClass('hidden');
			}
		})
	})

	$(".menu-btn").click(function(){
		$(".main-menu").slideToggle();
	})
	$(".loader-handel").click(function(){
		$(".home-loader-container").show();
	})

	$(".sub-menu-link").click(function(){
		$(this).next().slideToggle();
	})
	$(".rank-heading").click(function(){
		$(".rank-panel").find("table.team-rank-table").slideUp('slow');
		$(this).parents(".rank-panel").find("table.team-rank-table").slideDown('slow');
	})
	$(document).scroll(function(){
		if(document.documentElement.scrollTop > 50) {
			$(".scroll-top-btn ").fadeIn();
		} else {
			$(".scroll-top-btn ").fadeOut();
		}
	})
	$(".scroll-top-btn ").click(function(){
		$("body,html").stop().animate({scrollTop:0}, 500, 'swing');
	});
})