var SOM_TIRO_ESPECIAL = new Audio();
SOM_TIRO_ESPECIAL.src = 'snd/laserUp.mp3'; // pode trocar depois se quiser
SOM_TIRO_ESPECIAL.volume = 0.3;
SOM_TIRO_ESPECIAL.load();

function TiroEspecial(context, nave) {
   this.context = context;
   this.nave = nave;
   
   this.largura = 5;
   this.altura = 20;
   this.x = nave.x + 18;
   this.y = nave.y - this.altura;
   this.velocidade = 400; 
   this.largura = 20;
   this.altura = canvas.height
   this.x = nave.x + 10;
   this.y = 0;
   
   this.cor = 'white'; // COR DIFERENTE

   SOM_TIRO_ESPECIAL.currentTime = 0.0;
   SOM_TIRO_ESPECIAL.play();
}

TiroEspecial.prototype = {
   atualizar: function() {
      this.y -= this.velocidade * this.animacao.decorrido / 1000;

      if (this.y < -this.altura) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },

   desenhar: function() {
   var ctx = this.context;

   ctx.save();

   // brilho
   ctx.shadowColor = this.cor;
   ctx.shadowBlur = 20;

   // corpo do tiro
   ctx.fillStyle = this.cor;
   ctx.fillRect(this.x, this.y, this.largura, this.altura);

   ctx.fillStyle = 'LightGrey';
   ctx.fillRect(this.x + 1, this.y, this.largura - 2, this.altura);

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
   }
};