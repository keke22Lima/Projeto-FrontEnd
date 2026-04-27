var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro(context, nave) {
   this.context = context;
   this.nave = nave;
   
   this.largura = 4;
   this.altura = 12;

   this.x = nave.x + 18;  
   this.y = nave.y - this.altura;

   this.velocidade = 400;

   this.cor = 'yellow';

   this.rastro = [];

   SOM_TIRO.currentTime = 0.0;
   SOM_TIRO.play();
}

Tiro.prototype = {

   atualizar: function() {
      this.y -= this.velocidade * this.animacao.decorrido / 1000;

      this.rastro.push({ x: this.x, y: this.y });

      if (this.rastro.length > 5) {
         this.rastro.shift();
      }

      if (this.y < -this.altura) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },

   desenhar: function() {
      var ctx = this.context;
      ctx.save();

      for (var i = 0; i < this.rastro.length; i++) {
         var p = this.rastro[i];

         ctx.globalAlpha = i / this.rastro.length;
         ctx.fillStyle = "orange";
         ctx.fillRect(p.x, p.y, this.largura, this.altura);
      }

      ctx.globalAlpha = 1;

      ctx.shadowColor = "yellow";
      ctx.shadowBlur = 10;

      var grad = ctx.createLinearGradient(
         this.x,
         this.y,
         this.x,
         this.y + this.altura
      );

      grad.addColorStop(0, "white");
      grad.addColorStop(0.5, "yellow");
      grad.addColorStop(1, "orange");

      ctx.fillStyle = grad;

      ctx.fillRect(this.x, this.y, this.largura, this.altura);

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