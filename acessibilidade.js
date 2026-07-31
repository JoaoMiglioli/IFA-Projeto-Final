// acessibilidade.js
document.addEventListener("DOMContentLoaded", () => {
    // 1. Controle de Alto Contraste
    const btnContrast = document.getElementById('btn-contrast');
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
        });
    }
    // Verifica a preferência salva
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    // 2. Controle de Tamanho de Fonte
    let fontSizePercent = parseInt(localStorage.getItem('fontSizePercent')) || 100;
    
    function setFontSize(percent) {
        fontSizePercent = Math.min(Math.max(percent, 80), 160);
        document.documentElement.style.fontSize = fontSizePercent + '%';
        localStorage.setItem('fontSizePercent', fontSizePercent);
    }

    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnReset = document.getElementById('btn-font-reset');

    if (btnIncrease) btnIncrease.addEventListener('click', () => setFontSize(fontSizePercent + 10));
    if (btnDecrease) btnDecrease.addEventListener('click', () => setFontSize(fontSizePercent - 10));
    if (btnReset) btnReset.addEventListener('click', () => setFontSize(100));
    
    // Aplica a fonte salva ao carregar a página
    if (localStorage.getItem('fontSizePercent')) {
        setFontSize(fontSizePercent);
    }

    // 3. Leitor de Tela Nativo (API SpeechSynthesis)
    const btnSpeak = document.getElementById('btn-speak');
    if (btnSpeak) {
        btnSpeak.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                if (speechSynthesis.speaking) {
                    speechSynthesis.cancel();
                    btnSpeak.textContent = '🔊 Ouvir Página';
                    return;
                }
                const textToRead = document.querySelector('main').innerText;
                const utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.lang = 'pt-BR';
                utterance.onend = () => { btnSpeak.textContent = '🔊 Ouvir Página'; };
                speechSynthesis.speak(utterance);
                btnSpeak.textContent = '⏹️ Parar Leitura';
            } else {
                alert('Seu navegador não suporta leitura de tela nativa.');
            }
        });
    }
});

// Função extra para ler textos específicos (usada nos botões do 2º trimestre)
function readSpecificText(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        speechSynthesis.speak(utterance);
    }
}