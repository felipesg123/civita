document.getElementById('cpfForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();
    const msg = document.getElementById('message');
    let messages = [];

    // Validação de Email
    if (validarEmail(email)) {
        messages.push('O e-mail é válido!');
    } else {
        messages.push('O e-mail é inválido!');
    }

    // Verificação se a senha foi preenchida
    if (!senha) {
        messages.push('Por favor, insira sua senha!');
    }

    // Validação de CPF
    if (validarCPF(cpf)) {
        messages.push('O CPF é válido!');
    } else {
        messages.push('O CPF é inválido!');
    }

    // Exibindo as mensagens
    if (messages.length > 0) {
        msg.innerHTML = messages.join('<br>'); // Exibe as mensagens separadas por uma nova linha
        msg.style.color = messages.some(m => m.includes('inválido') || m.includes('Por favor')) ? 'red' : 'green';
    }
});

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}