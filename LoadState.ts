
module ElMeuJoc {
    export class LoadState extends Phaser.State {
        preload():void {
            super.preload();

            this.stage.backgroundColor = "#74538f";
            // Agregem un text de cargant
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...',
                {font: '30px Arial', fill: '#ffffff'});
            etiquetaCargando.anchor.setTo(0.5, 0.5);

            // Mostrem la barra de proces
            var progressBar = this.add.sprite(this.world.centerX, 200, 'progressBar');
            progressBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(progressBar);

            // Precarguem els sprites
            this.load.image('Keys', 'assets/Keys1.png');
            this.load.image('Espai', 'assets/espai.png');
            this.load.bitmapFont('carrier_command', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
            this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
            this.game.load.image('terradreta', 'assets/terra_dreta.png');
            this.game.load.image('baldainici', 'assets/baldaInici.png');
            this.game.load.image('baldes', 'assets/balda.png');
            this.game.load.image('gat', 'assets/gat_quiet.png');
            this.load.image('teclat', 'assets/teclat.png');
            this.load.image('llibre', 'assets/llibre1.png');
            this.load.image('rellotge', 'assets/rellotge.png');
            this.load.image('flor', 'assets/flor.png');
            this.load.image('basura', 'assets/basura.png');
            this.load.spritesheet('kitty', 'assets/Kitty2.png', 108, 78);
            this.load.image('score', 'assets/ScoreBackground.png');


            //Activem la fisica al joc
            this.physics.startSystem(Phaser.Physics.ARCADE);

        }

        create():void {
            super.create();
            this.game.state.start('menu');
        }
    }
}