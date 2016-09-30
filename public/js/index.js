$(document).ready(function() {
	var socket = io();
	$('#bodyFull').fullpage({
		sectionsColor: ['#1bbc9b', '#4BBFC3'],
		anchors: ['firstPage', 'secondPage'],
		menu: '#menu',
		responsiveWidth: 900,
		loopTop: true,
		loopBottom: true
	});
	$('.box textarea').keyup(function(){
		if($(this).val().length > 303215) {
			socket.emit('message', $(this).val());
			$(this).val('');
		}
	});
	socket.on('message', function(msg){
		msg = JSON.parse(msg);
		var friend = '',
			write = '',
			like = '';
		$('.box textarea, .input').remove();
		$('.box').append("<img src=" + msg.picture.data.url + ">");
		$('.box').append("<p>당신의 이름: "+ msg.name + "</p>");
		$('.box').append("<p>당신의 성별: "+ msg.gender + "</p>");
		$('.box').append("<p>당신의 (만)나이: "+ msg.age_range.max + "</p>");
		$('.box').append("<p>당신의 생일: "+ msg.birthday + "</p>");
		$('.box').append("<p>당신의 이메일: "+ msg.email + "</p>");
		for(var i = 0; i < 5; i++) {
			friend += msg.friends.data[i].name + ", ";
			write += msg.posts.data[i].message + ", ";
			like += msg.likes.data[i].name + ", ";
		}
		$('.box').append("<p>당신의 전체 친구수: " + msg.friends.summary.total_count + "</p>");
		$('.box').append("<p>당신의 친구리스트(5개): " + friend + "</p>");
		$('.box').append("<p>당신이 좋아하는 페이지(5개): " + like + "</p>");
		$('.box').append("<p style='font-size: 1.4em'>당신의 최근글리스트(5개): " + write + "</p>");
		//$('.box textarea').val(msg);
	});
});
