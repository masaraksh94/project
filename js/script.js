window.addEventListener('DOMContentLoaded', () => {
	let headerBtn = document.querySelector('.popup_engineer_btn'),
		modal = document.querySelector('.popup_engineer'),
		closeBtnCall = document.getElementsByClassName('popup_close')[0],
		closeBtn = document.getElementsByClassName('popup_close')[1],
		phoneLinkHeader = document.getElementsByClassName('phone_link')[0],
		phoneLinkFooter = document.getElementsByClassName('phone_link')[1],
		popup = document.querySelector('.popup');

	//modal

	function call(button, cross, background) {

		button.addEventListener('click', () => {
			modal.style.display = 'block';
		});

		cross.addEventListener('click', () => {
			modal.style.display = 'none';
		});

		background.addEventListener('click', function(e) {
			if (e.target == modal) {
				this.style.display = 'none';
			}
		});	
	};

	call(headerBtn, closeBtn, modal);


	function popupBtn(button, cross, background) {

		button.addEventListener('click', () => {
			popup.style.display = 'block';
		});

		cross.addEventListener('click', () => {
			popup.style.display = 'none';
		});

		background.addEventListener('click', function(e) {
			if (e.target == popup) {
				this.style.display = 'none';
			}
		});	
	};
	popupBtn(phoneLinkHeader, closeBtnCall, popup);
	popupBtn(phoneLinkFooter, closeBtnCall, popup);


    setTimeout("document.querySelector('.popup_engineer').style.display='block'", 60000);



	//form

	let message = new Object();
		message.loading = "Загрузка, одождите!";
		message.success = "Спасибо! Заявка принята, с вами свяжутся";
		message.failure = "Что-то пошло не так!!! ";


	let form = document.querySelectorAll('form');

	for (let i = 0; i < form.length; i++) {

		input = form[i].getElementsByTagName('input'),
		statusMessage = document.createElement('div');
		statusMessage.classList.add('message');
		form[i].getElementsByTagName('input').value = '';
		

		form[i].addEventListener('submit', function(event) {
			event.preventDefault();
			form[i].appendChild(statusMessage);

			//AJAX

			let request = new XMLHttpRequest();
				request.open("POST", "server.php")

				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

				let formData = new FormData(form);

				request.send(formData);

				request.onreadystatechange = function() {
					if (request.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (request.readyState === 4) {
						if (request.status == 200 && request.status < 300) {
							statusMessage.innerHTML = message.success;
						} else {
							statusMessage.innerHTML = message.failure;
						}
					}

				};
				for (let i = 0; i < input.length; i++) {
						input[i].value = '';
				}
		});
	};

//only numbers
	function exclude(value) {

		value.onkeypress = function(event) {

			let except = getNum(event);

			if (except < '0' || except > '9') {
				return false;
			}
		};

		function getNum(event) {

		    if (event.which != 0 && event.charCode != 0) {
			    if (event.which < 32);
			    return String.fromCharCode(event.which) 
		    } 
	    };
	};

//telefon number
	let inputTelefon = document.querySelectorAll('input[name="user_phone"]');

	for (var i = 0; i < inputTelefon.length; i++) {
		exclude(inputTelefon[i]);
	};

//timer

let deadLine = '2018-10-04';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t/1000) % 60).toString(),
			minutes = Math.floor((t/1000/60) % 60).toString(),
			hours = Math.floor( (t/(1000*60*60)) % 24 ).toString(),
			days = Math.floor( t/(1000*60*60*24) ).toString();

			if (days.length < 2) {
				days = '0' + days;
			}

			if (hours.length < 2) {
				hours = '0' + hours;
			}

			if (minutes.length < 2) {
				minutes = '0' + minutes;
			}

			if (seconds.length < 2) {
				seconds = '0' + seconds;
			}

			return {
				'total': t,
				'days' : days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
	};

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			days = timer.querySelector('.days'),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minuts'),
			seconds = timer.querySelector('.seconds');

			function updateClock() {
				let t = getTimeRemaining(endtime)
					timeInterval  = setInterval(updateClock, 1000);

				days.innerHTML = t.days;
				hours.innerHTML = t.hours;
				minutes.innerHTML = t.minutes;
				seconds.innerHTML = t.seconds;

				if (t.total <= 0) {
					clearInterval(timeInterval);

					days.innerHTML = '00';
					hours.innerHTML = '00';
					minutes.innerHTML = '00';
					seconds.innerHTML = '00';
				}
			};

			updateClock();
	};
	setClock('timer', deadLine);

	
}); 
