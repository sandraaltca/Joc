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
        this.ESPAIV = 110;
        this.CONTADORTIEMPO = 60;
        this.contadorObjectes = 0;
        this.balda1 = false;
        this.balda2 = false;
        this.balda3 = false;
        this.balda4 = false;
        this.balda5 = false;
        this.balda6 = false;
        this.balda7 = false;
        this.balda8 = false;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.game.load.image('terraesquerra', 'assets/terraEsquerra.png');
        this.game.load.image('terradreta', 'assets/terra_dreta.png');
        this.game.load.image('baldainici', 'assets/baldaInici.png');
        this.game.load.image('baldes', 'assets/balda.png');
        this.game.load.image('gat', 'assets/gat_quiet.png');
        this.game.load.image('teclat', 'assets/teclat.png');
        this.game.load.image('llibre', 'assets/llibre1.png');
        this.game.load.image('rellotge', 'assets/rellotge.png');
        this.game.load.image('flor', 'assets/flor.png');
        this.game.load.image('basura', 'assets/basura.png');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.tipusObjecte = function () {
        var tipus = Math.floor((Math.random() * 6) + 1);
        var object;
        if (tipus == 1) {
            object = 'teclat';
        }
        else if (tipus == 2) {
            object = 'llibre';
        }
        else if (tipus == 3) {
            object = 'rellotge';
        }
        else if (tipus == 4) {
            object = 'flor';
        }
        else {
            object = 'basura';
        }
        return object;
    };
    mainState.prototype.sortirObjectes = function () {
        this.objectes = this.add.group();
        this.objectes.enableBody = true;
        this.objectes.physicsBodyType = Phaser.Physics.ARCADE;
        var x = Math.floor((Math.random() * 8) + 1);
        var y = Math.floor(Math.random() * 8);
        var object = this.tipusObjecte();
        if (x == 1 && y == 2 && !this.balda1) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 15, object, 1);
            this.objectes.add(newElement);
            this.balda1 = true;
        }
        else if (x == 2 && y == 0 && !this.balda2) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 64, object, 2);
            this.objectes.add(newElement);
            this.balda2 = true;
        }
        else if (x == 2 && y == 4 && !this.balda3) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 64, object, 3);
            this.objectes.add(newElement);
            this.balda3 = true;
        }
        else if (x == 4 && y == 0 && !this.balda4) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 90, object, 4);
            this.objectes.add(newElement);
            this.balda4 = true;
        }
        else if (x == 4 && y == 4 && !this.balda5) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 90, object, 5);
            this.objectes.add(newElement);
            this.balda5 = true;
        }
        else if (x == 3 && y == 1 && !this.balda6) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 80, object, 6);
            this.objectes.add(newElement);
            this.balda6 = true;
        }
        else if (x == 3 && y == 2 && !this.balda7) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 80, object, 7);
            this.objectes.add(newElement);
            this.balda7 = true;
        }
        else if (x == 3 && y == 3 && !this.balda8) {
            var newElement = new Objecte(this.game, y * this.ESPAIH, x * 80, object, 8);
            this.objectes.add(newElement);
            this.balda8 = true;
        }
    };
    mainState.prototype.configGat = function () {
        this.gat = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 83, 'gat');
        // Cambiamos el "anchor" del jugador
        this.gat.anchor.setTo(0.5, 0.5);
        //Afegueixo fisica al gat.
        this.game.physics.arcade.enable(this.gat);
        // que colisione contra las paredes.
        this.gat.body.collideWorldBounds = true;
        // Agregamos gravedad al jugador
        this.gat.body.gravity.y = 500;
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
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 5; y++) {
                if (x == 1 && y == 2 || x == 2 && y == 0 || x == 2 && y == 4 || x == 3 && y == 1 || x == 3 && y == 2 || x == 3 && y == 3) {
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
        this.tiempo = this.game.add.text(20, 10, "Tiempo : " + this.CONTADORTIEMPO, { font: "25px Fixedsys", fill: "#fff", align: "center" });
        this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorPartida, this);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.tempsObjectes, this);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.game.physics.arcade.collide(this.gat, this.terradreta);
        this.game.physics.arcade.collide(this.gat, this.terraesquerra);
        this.game.physics.arcade.collide(this.baldes, this.gat);
        if (this.contadorObjectes % 100 == 0) {
            this.sortirObjectes();
        }
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
        if (this.cursor.up.isDown) {
            // el jugador se mueve hacia arriba (salto)
            this.gat.body.velocity.y = -320;
        }
        if (this.CONTADORTIEMPO == 0) {
        }
    };
    mainState.prototype.temporitzadorPartida = function () {
        this.CONTADORTIEMPO--;
        this.tiempo.setText("Tiempo : " + this.CONTADORTIEMPO);
    };
    mainState.prototype.tempsObjectes = function () {
        this.contadorObjectes++;
    };
    return mainState;
})(Phaser.State);
var Objecte = (function (_super) {
    __extends(Objecte, _super);
    function Objecte(game, x, y, key, frame, balda) {
        _super.call(this, game, x, y, key, frame);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.height - 900;
        this.balda = balda;
    }
    return Objecte;
})(Phaser.Sprite);
var Balda = (function (_super) {
    __extends(Balda, _super);
    function Balda(game, x, y, key, frame) {
        _super.call(this, game, x, y, key, frame);
        this.objecte = false;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
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