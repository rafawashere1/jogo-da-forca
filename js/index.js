class Forca {
    txtChute = document.getElementById('txtChute');
    btnTentativa = document.getElementById('btnTentativa');
    btnTentarNovamente = document.getElementById('btnTentarNovamente');
    palavraParcial = document.getElementById('palavraParcial');
    tentativas = document.getElementById('tentativas');
    palavraSecreta = "";
    letrasEncontradas = [];
    erros = 0;
    mensagemFinal = "";
  
    constructor() {
      this.obterPalavraSecreta();
      this.registrarEventos();
      this.txtChute.addEventListener('input', () => this.limitarChute());
      this.btnTentativa.addEventListener('click', () => this.avaliarChute());
      this.letrasEncontradas = this.PopularLetrasEncontradas(this.palavraSecreta.length);
      this.atualizarPalavraParcial();
    }

    avaliarChute() {
        const palpite = this.txtChute.value.toUpperCase();
        this.txtChute.value = '';
    
        if (palpite.length !== 1 || !/[A-Z]/.test(palpite)) {
            console.error('Valor inválido!');
          return;
        }
    
        const jogadorAcertou = this.JogadorAcertou(palpite);
    
        if (!jogadorAcertou) {
          this.atualizarImagem();
          this.atualizarTentativas();
        }

        this.txtChute.focus();
    }

    registrarEventos() {
      this.btnTentativa.addEventListener('click', () => this.avaliarChute());
      this.btnTentarNovamente.addEventListener('click', () => this.reiniciarJogo());
    }
  
    JogadorAcertou(palpite) {
        let letraFoiEncontrada = false;
      
        for (let i = 0; i < this.palavraSecreta.length; i++) {
          if (palpite.toUpperCase() === this.palavraSecreta[i]) {
            this.letrasEncontradas[i] = palpite.toUpperCase();
            letraFoiEncontrada = true;
          }
        }
      
        if (letraFoiEncontrada) {
          const jogadorAcertou = this.letrasEncontradas.join('') === this.palavraSecreta;
      
          if (jogadorAcertou) {
            this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
            this.btnTentativa.disabled = true;
            this.exibirNotificacao(this.mensagemFinal, jogadorAcertou);
          } else {
            this.mensagemFinal = `Você acertou a letra ${palpite}!`;
            this.exibirNotificacao(this.mensagemFinal, true);
          }
      
          this.atualizarPalavraParcial();
          return jogadorAcertou;
        } else {
          this.atualizarTentativas();
          this.erros++;
          this.tentativas.textContent = `Erros: ${this.erros}/7`;
          if (this.jogadorPerdeu()) {
            this.btnTentativa.disabled = true;
            this.mensagemFinal = "Você perdeu! Tente novamente...";
            this.exibirNotificacao(this.mensagemFinal, false);
          } else {
            this.exibirNotificacao(`A letra ${palpite} não está na palavra.`, false);
          }
        }
      }
  
    jogadorPerdeu() {
      return this.erros === 7;
    }
  
    obterPalavraSecreta() {
      const palavras = [
        "INCONSTITUCIONALISSIMAMENTE",
        "WUKONG",
        "INTER",
        "COLORADO",
        "TENEBROSO",
        "CARAMBOLA",
        "JENIPAPO",
        "TESTE"
      ];
  
      const indiceAleatorio = Math.floor(Math.random() * palavras.length);
  
      this.palavraSecreta = palavras[indiceAleatorio].toUpperCase();
    }

    atualizarImagem() {
        const imgForca = document.querySelector('.cabecalho > img');
        imgForca.src = `img/${this.erros + 1}.png`;
      }
    
    atualizarTentativas() {
        this.tentativas.textContent = `Erros: ${this.erros}/7`;
      }
    
    atualizarPalavraParcial() {
        this.palavraParcial.textContent = `Palavra: ${this.letrasEncontradas.join(' ')}`;
      }
  
    PopularLetrasEncontradas(tamanho) {
      const letrasEncontradas = new Array(tamanho).fill('_');
      return letrasEncontradas;
    }
  
    atualizarPalavraParcial() {
      this.palavraParcial.textContent = `Palavra: ${this.letrasEncontradas.join(' ')}`;
    }
  
    exibirNotificacao(mensagem, jogadorAcertou) {
        const pnlConteudo = document.getElementById('pnlConteudo');
    
        const txtNotificacao = document.createElement('p');
        txtNotificacao.textContent = mensagem;
        
        this.classificarNotificacao(jogadorAcertou, txtNotificacao);
    
        pnlConteudo.querySelector('p')?.remove();
    
        pnlConteudo.appendChild(txtNotificacao);
      }
  
      classificarNotificacao(jogadorAcertou, txtNotificacao) {
        if(jogadorAcertou) {
          txtNotificacao.classList.remove('notificacao-erro');
          txtNotificacao.classList.add('notificacao-acerto');
          return;
        }
    
        txtNotificacao.classList.remove('notificacao-acerto');
        txtNotificacao.classList.add('notificacao-erro');
      }

    limitarChute() {
        let inputValue = this.txtChute.value;
    
        inputValue = inputValue.replace(/[^a-zA-Z]/g, '');
    
        if (inputValue.length > 0) {
          inputValue = inputValue.charAt(0);
        }
    
        this.txtChute.value = inputValue;
      }
  
    reiniciarJogo() {
        const pnlConteudo = document.getElementById('pnlConteudo');
        this.obterPalavraSecreta();
        this.letrasEncontradas = this.PopularLetrasEncontradas(this.palavraSecreta.length);
        this.erros = 0;
        this.atualizarImagem();
        this.atualizarPalavraParcial();
        this.atualizarTentativas();
        this.txtChute.value = '';
        this.palavraParcial.textContent = 'Palavra:';

        pnlConteudo.querySelector('p')?.remove();
        
        this.btnTentativa.disabled = false;
      }
  }
  
  window.addEventListener('load', () => new Forca());