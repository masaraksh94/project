window.addEventListener('DOMContentLoaded', () => {
	let headerBtn = document.querySelector('.popup_engineer_btn'),
		modal = document.querySelector('.popup_engineer'),
		closeBtnCall = document.getElementsByClassName('popup_close')[0],
		closeBtn = document.getElementsByClassName('popup_close')[1],
		phoneLink = document.querySelector('.phone_link'),
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
	call(phoneLink, closeBtnCall, modal);

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

//tabs

}); 
