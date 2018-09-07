window.addEventListener('DOMContentLoaded', () => {
	let headerBtn = document.querySelector('.popup_engineer_btn'),
		modal = document.querySelector('.popup_engineer'),
		closeBtn = document.querySelectorAll('.popup_close')

	//modal
	headerBtn.addEventListener('click', () => {
		modal.style.display = 'block';
	});

	for (let i = 0; i < closeBtn.length; i++) {
		closeBtn[i].addEventListener('click', () => {
			modal.style.display = 'none';
		});
	};

	modal.addEventListener('click', function(e) {
		if (e.target == modal) {
			this.style.display = 'none';
		}
	})

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

//calc




}); 
