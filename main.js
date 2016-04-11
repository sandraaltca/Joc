var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.ESPAIH = 167;
        this.ESPAIV = 150;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
        this.game.load.image('terradreta', 'assets/terra_dreta.png');
        this.game.load.image('baldainici', 'assets/baldaInici.png');
        this.game.load.image('baldes', 'assets/balda.png');
        this.game.load.image('gat', 'assets/gat_quiet.png');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.configGat = function () {
        this.gat = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 83, 'gat');
        // Cambiamos el "anchor" del jugador
        this.gat.anchor.setTo(0.5, 0.5);
        //Afegueixo fisica al gat.
        this.game.physics.arcade.enable(this.gat);
    };
    mainState.prototype.configWorld = function () {
        this.terraesquerra = this.game.add.sprite(this.game.world.width - 798, this.game.world.height - 100, 'terraesquerra');
        this.game.physics.arcade.enable(this.terraesquerra);
        this.terraesquerra.body.immovable = true;
        this.baldainici = this.game.add.sprite(this.game.world.width - 565, this.game.world.height - 35, 'baldainici');
        this.game.physics.arcade.enable(this.baldainici);
        this.baldainici.body.immovable = true;
        this.terradreta = this.game.add.sprite(this.game.world.width - 250, this.game.world.height - 100, 'terradreta');
        this.game.physics.arcade.enable(this.terradreta);
        this.terradreta.body.immovable = true;
    };
    mainState.prototype.createbaldes = function () {
        this.baldes = this.add.group();
        this.baldes.enableBody = true;
        this.baldes.physicsBodyType = Phaser.Physics.ARCADE;
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 5; y++) {
                if (x == 0 && y == 2 || x == 1 && y == 0 || x == 1 && y == 4 || x == 2 && y == 1 || x == 2 && y == 2 || x == 2 && y == 3) {
                    var newElement = new Balda(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, 'baldes');
                    this.baldes.add(newElement);
                }
            }
        }
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.game.stage.backgroundColor = "#74538f";
        this.configWorld();
        this.createbaldes();
        this.configGat();
        // Cogemos los cursores para gestionar la entrada
        this.cursor = this.game.input.keyboard.createCursorKeys();
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.game.physics.arcade.collide(this.gat, this.baldainici);
        this.game.physics.arcade.collide(this.gat, this.terradreta);
        this.game.physics.arcade.collide(this.gat, this.terraesquerra);
        this.game.physics.arcade.collide(this.baldes, this.gat);
        this.movePlayer();
    };
    mainState.prototype.movePlayer = function () {
        // Si pulsamos el cursor izquierdo
        if (this.cursor.left.isDown) {
            // Movemos al jugador a la izquierda
            this.gat.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown) {
            // Movemos al jugador a la derecha
            this.gat.body.velocity.x = 200;
        }
        else {
            // el jugador se para
            this.gat.body.velocity.x = 0;
        }
        // Si pulsamos la flecha arriba y el jugador está tocando el suelo
        if (this.cursor.up.isDown && this.gat.body.touching.down) {
            // el jugador se mueve hacia arriba (salto)
            this.gat.body.velocity.y = -320;
        }
    };
    return mainState;
})(Phaser.State);
var Balda = (function (_super) {
    __extends(Balda, _super);
    function Balda(game, x, y, key, frame) {
        _super.call(this, game, x, y, key, frame);
        this.objecte = false;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.height - 900;
    }
    return Balda;
})(Phaser.Sprite);
var ShooterGame = (function () {
    function ShooterGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return ShooterGame;
})();
window.onload = function () {
    var game = new ShooterGame();
};
//# sourceMappingURL=main.js.map