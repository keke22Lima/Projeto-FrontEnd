function InimigoRapido(context, imagem, imgExplosao) {
    this.context = context;
    this.imagem = imagem;
    this.imgExplosao = imgExplosao;

    this.largura = 40;
    this.altura = 40;

    this.x = Math.random() * (context.canvas.width - this.largura);
    this.y = -this.altura;

    this.velocidade = 400;
}

InimigoRapido.prototype = {
    atualizar: function() {
        this.y += this.velocidade * this.animacao.decorrido / 1000;

        // Remove se sair da tela
        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },

    desenhar: function() {
        var ctx = this.context;

        ctx.save();

        // DESENHA A IMAGEM DO INIMIGO (ANTES você usava fillRect)
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);

        ctx.restore();
    },

    retangulosColisao: function() {
        return [{
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura
        }];
    },

    colidiuCom: function(outro) {
        if (outro instanceof Tiro || outro instanceof TiroEspecial) {

            var explosao = new Explosao(this.context, this.imgExplosao);
            explosao.x = this.x;
            explosao.y = this.y;

            this.animacao.novoSprite(explosao);

            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    }
};