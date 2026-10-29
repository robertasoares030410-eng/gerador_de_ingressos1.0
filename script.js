const form = document.getElementById("formIngresso");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const evento = document.getElementById("evento");
const foto = document.getElementById("foto");
const nomePreview = document.getElementById("nomePreview");
const eventoPreview = document.getElementById("eventoPreview");
const fotoPreview = document.getElementById("fotoPreview");
const iniciais = document.getElementById("iniciais");
form.addEventListener("submit", function(eventoFormulario) {
    eventoFormulario.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    nomePreview.textContent = nome.value.trim();
    eventoPreview.textContent = evento.value.trim();
    const partes = nome.value.trim().split(/\s+/);
    iniciais.textContent = (
        partes[0][0] +
        (partes.length > 1 ? partes[partes.length - 1][0] : "")
    ).toUpperCase();
    alert("Seu ingresso foi gerado com sucesso!");
});
foto.addEventListener("change", function() {
    const arquivo = foto.files[0];
    if (!arquivo) {
        fotoPreview.style.display = "none";
        iniciais.style.display = "block";
        return;
    }
    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha um arquivo de imagem válido.");
        foto.value = "";
        return;
    }
    const leitor = new FileReader();
    leitor.onload = function(evento) {
        fotoPreview.src = evento.target.result;
        fotoPreview.style.display = "block";
        iniciais.style.display = "none";
    };
    leitor.readAsDataURL(arquivo);
});


document.getElementById("baixar").addEventListener("click", function() {
    const ingresso = document.getElementById("ingresso");
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.onload = function() {
        html2canvas(ingresso, {
            scale: 2,
            backgroundColor: null
        }).then(function(canvas) {
            const link = document.createElement("a");
            link.download = "meu-ingresso.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        }).catch(function() {
            alert("Não foi possível baixar. Tente novamente.");
        });
    };
    script.onerror = function() {
        alert("Verifique sua conexão com a internet e tente novamente.");
    };
    document.head.appendChild(script);
});