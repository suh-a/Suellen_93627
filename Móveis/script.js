document.addEventListener('DOMContentLoaded', function(){
	const form = document.getElementById('contato-form');
	if(!form) return;

	form.addEventListener('submit', function(e){
		e.preventDefault();
		const nome = form.nome.value.trim();
		const email = form.email.value.trim();
		const mensagem = form.mensagem.value.trim();

		// simple validation
		if(!nome || !email || !mensagem){
			alert('Por favor, preencha todos os campos.');
			return;
		}

		// Simulate a submission (no backend) and show confirmation
		const btn = form.querySelector('.btn');
		const oldText = btn.textContent;
		btn.textContent = 'Enviando...';
		btn.disabled = true;

		setTimeout(() => {
			btn.textContent = oldText;
			btn.disabled = false;
			form.reset();
			const msg = document.createElement('div');
			msg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
			msg.style.marginTop = '12px';
			msg.style.padding = '10px';
			msg.style.background = '#29e982ff';
			msg.style.border = '1px solid #bfe6c9';
			msg.style.borderRadius = '6px';
			form.appendChild(msg);
			setTimeout(()=> msg.remove(), 6000);
		}, 900);
	});
});
