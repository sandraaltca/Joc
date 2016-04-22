var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var Point = Phaser.Point;
var ElMeuJoc;
(function (ElMeuJoc) {
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        function SimpleGame() {
            _super.call(this, 800, 600, Phaser.AUTO, "gameDiv");
            this.scorePun = 0;
            this.state.add("load", ElMeuJoc.LoadState);
            this.state.add("menu", ElMeuJoc.menuStartGame);
            this.state.add("game", ElMeuJoc.gameState);
            this.state.add("gameover", ElMeuJoc.Gameover);
            this.state.start("load");
        }
        return SimpleGame;
    })(Phaser.Game);
    ElMeuJoc.SimpleGame = SimpleGame;
})(ElMeuJoc || (ElMeuJoc = {}));
window.onload = function () {
    var game = new ElMeuJoc.SimpleGame();
};
/**
 * Created by 47419119l on 18/04/16.
 */
/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
var ElMeuJoc;
(function (ElMeuJoc) {
    var menuStartGame = (function (_super) {
        __extends(menuStartGame, _super);
        function menuStartGame() {
            _super.apply(this, arguments);
        }
        menuStartGame.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.stage.backgroundColor = "#74538f";
            this.teclesMov = this.add.sprite(this.world.centerX - 100, this.world.centerY, 'Keys');
            this.teclesMov.anchor.setTo(0.5, 0.5);
            this.textIntro = this.game.add.bitmapText(this.world.centerX, 100, 'carrier_command', 'Sigues un gat !', 30);
            this.textIntro.anchor.setTo(0.5, 0.5);
            this.cursor = this.game.input.keyboard.createCursorKeys();
            this.kitty = this.add.sprite(this.world.centerX, this.world.centerY - 25, 'kitty');
            this.kitty.animations.add('idEsperar', [0, 1, 2, 3], 10, true);
            this.kitty.animations.play('idEsperar');
        };
        menuStartGame.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.cursor.up.isDown) {
                this.game.state.start("game");
            }
        };
        return menuStartGame;
    })(Phaser.State);
    ElMeuJoc.menuStartGame = menuStartGame;
})(ElMeuJoc || (ElMeuJoc = {}));
var ElMeuJoc;
(function (ElMeuJoc) {
    var LoadState = (function (_super) {
        __extends(LoadState, _super);
        function LoadState() {
            _super.apply(this, arguments);
        }
        LoadState.prototype.preload = function () {
            _super.prototype.preload.call(this);
            this.stage.backgroundColor = "#74538f";
            // Agregem un text de cargant
            var etiquetaCargando = this.add.text(this.world.centerX, 150, 'cargando...', { font: '30px Arial', fill: '#ffffff' });
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
        };
        LoadState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.state.start('menu');
        };
        return LoadState;
    })(Phaser.State);
    ElMeuJoc.LoadState = LoadState;
})(ElMeuJoc || (ElMeuJoc = {}));
/**
 * Created by 47419119l on 18/04/16.
 */
/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
var ElMeuJoc;
(function (ElMeuJoc) {
    var Gameover = (function (_super) {
        __extends(Gameover, _super);
        function Gameover() {
            _super.apply(this, arguments);
        }
        Gameover.prototype.create = function () {
            _super.prototype.create.call(this);
            this.game.stage.backgroundColor = "#74538f";
            this.cursor = this.game.input.keyboard.createCursorKeys();
            var gameOverBac = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'score');
            gameOverBac.anchor.setTo(0.5, 0.5);
            var titol = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 180, 'carrier_command', "  Has sigut un gat! ", 18);
            titol.anchor.setTo(0.5, 0.5);
            var score1 = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 150, 'carrier_command', " Has tirat ", 15);
            score1.anchor.setTo(0.5, 0.5);
            var score = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 100, 'carrier_command', "0", 40);
            score.anchor.setTo(0.5, 0.5);
            var score1 = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 30, 'carrier_command', " coses. ", 15);
            score1.anchor.setTo(0.5, 0.5);
            var teclas = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'Keys');
            teclas.anchor.setTo(0.5, 0.5);
        };
        Gameover.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.cursor.up.isDown) {
                this.game.state.start("game");
            }
        };
        return Gameover;
    })(Phaser.State);
    ElMeuJoc.Gameover = Gameover;
})(ElMeuJoc || (ElMeuJoc = {}));
/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
var ElMeuJoc;
(function (ElMeuJoc) {
    var gameState = (function (_super) {
        __extends(gameState, _super);
        function gameState() {
            _super.apply(this, arguments);
            this.ESPAIH = 167;
            this.ESPAIV = 110;
            this.CONTADORTIEMPO = 6;
            this.gameOver = false;
            this.contadorObjectes = 0;
            this.backgrndOvr = false;
            this.balda1 = false;
            this.balda2 = false;
            this.balda3 = false;
            this.balda4 = false;
            this.balda5 = false;
            this.balda6 = false;
            this.balda7 = false;
            this.balda8 = false;
        }
        /**
         * Metodes que utilitzaré al create.
         */
        /**
         * Metode configObjectes serveix per congigurar el group d'objectes.
         */
        gameState.prototype.configObjectes = function () {
            this.objectes = this.add.group();
            this.objectes.enableBody = true;
            this.objectes.physicsBodyType = Phaser.Physics.ARCADE;
        };
        /**
         * Metode configGat serveix per configurar el Sprite Gat
         */
        // this.playerAnimationsLoad();
        gameState.prototype.configGat = function () {
            this.gat = this.game.add.sprite(this.game.world.centerX, this.game.world.height - 83, 'kitty');
            // Cambiamos el "anchor" del jugador
            this.gat.anchor.setTo(0.5, 0.5);
            this.playerAnimationsLoad();
            //Afegueixo fisica al gat.
            this.game.physics.arcade.enable(this.gat);
            // que colisione contra las paredes.
            this.gat.body.collideWorldBounds = true;
            // Agregamos gravedad al jugador
            this.gat.body.gravity.y = 500;
            this.gat.animations.play('idEsperar');
        };
        /**
         * Metode configWorld serveix per configurar el mon
         */
        gameState.prototype.configWorld = function () {
            this.game.stage.backgroundColor = "#74538f";
            this.terraesquerra = this.game.add.sprite(this.game.world.width - 798, this.game.world.height - 100, 'terraesquerra');
            this.game.physics.arcade.enable(this.terraesquerra);
            this.terraesquerra.body.immovable = true;
            this.baldainici = this.game.add.sprite(this.game.world.width - 565, this.game.world.height - 35, 'baldainici');
            this.game.physics.arcade.enable(this.baldainici);
            this.baldainici.body.immovable = true;
            this.terradreta = this.game.add.sprite(this.game.world.width - 250, this.game.world.height - 100, 'terradreta');
            this.game.physics.arcade.enable(this.terradreta);
            this.terradreta.body.immovable = true;
            this.tiempo = this.game.add.bitmapText(20, 10, 'carrier_command', "Tiempo : " + this.CONTADORTIEMPO, 15);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorPartida, this);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.tempsObjectes, this);
            // Cogemos los cursores para gestionar la entrada
            this.cursor = this.game.input.keyboard.createCursorKeys();
        };
        /**
         * Contador de la partida.
         */
        gameState.prototype.temporitzadorPartida = function () {
            this.CONTADORTIEMPO--;
        };
        /**
         * Metode configbaldes serveix per col·locar les baldes a la posició que l'hi toca
         */
        gameState.prototype.configbaldes = function () {
            this.baldes = this.add.group();
            this.baldes.enableBody = true;
            this.baldes.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 4; x++) {
                for (var y = 0; y < 5; y++) {
                    if (x == 1 && y == 2 || x == 2 && y == 0 || x == 2 && y == 4 || x == 3 && y == 1 || x == 3 && y == 2 || x == 3 && y == 3) {
                        var newElement = new Balda(this.game, y * this.ESPAIH, x * this.ESPAIV + 50, 'baldes', 0);
                        this.baldes.add(newElement);
                    }
                }
            }
        };
        gameState.prototype.create = function () {
            _super.prototype.create.call(this);
            this.configWorld();
            this.configbaldes();
            this.configGat();
            this.configObjectes();
        };
        /**
         * Metodes utilitzats al update
         */
        /**
         * Metode que al chocar amb un obecte desapareix.
         * @param gat - Sprite gat (jugador)
         * @param objecte - Objectes que hi ha a les baldes
         */
        gameState.prototype.tirarObjectes = function (gat, objecte) {
            var num = objecte.balda;
            objecte.kill();
            this.alliberarBlada(num);
        };
        /**
         *Metode que retorna un tipus de objecte al atzar.
         * @returns string tipus d'objecte
         */
        gameState.prototype.tipusObjecte = function () {
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
        /**
         * Metode que crea objectes al atzar en una posició random
         */
        gameState.prototype.crearObjectes = function () {
            var posicions = [new Point(1, 2), new Point(2, 0), new Point(2, 4), new Point(4, 0), new Point(4, 4), new Point(3, 1), new Point(3, 3), new Point(3, 2)];
            var parametros = {
                "1, 2": {
                    balda: 1,
                    altura: 15
                },
                "2, 0": {
                    balda: 2,
                    altura: 64
                },
                "2, 4": {
                    balda: 3,
                    altura: 64
                },
                "4, 0": {
                    balda: 4,
                    altura: 90
                },
                "4, 4": {
                    balda: 5,
                    altura: 90
                },
                "3, 1": {
                    balda: 6,
                    altura: 80
                },
                "3, 2": {
                    balda: 7,
                    altura: 80
                },
                "3, 3": {
                    balda: 8,
                    altura: 80
                }
            };
            var pos = this.rnd.pick(posicions);
            var x = pos.x;
            var y = pos.y;
            var param = parametros[x + ", " + y];
            var balda = param["balda"];
            var altura = param["altura"];
            var objectType = this.tipusObjecte();
            if (!this.comprovarBaldes(balda)) {
                var newElement = new Objecte(this.game, y * this.ESPAIH, x * altura, objectType, balda);
                this.objectes.add(newElement);
            }
        };
        gameState.prototype.playerAnimationsLoad = function () {
            this.gat.animations.add('idEsperar', [0, 1, 2, 3], 10, true);
            this.gat.animations.add('idDreta', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
            this.gat.animations.add('idEsquerra', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
        };
        /**
         * Comprova si la balda està dispobible
         * @param balda id de la balda
         * @returns {boolean} false si està disponible true si esta ocupada.
         */
        gameState.prototype.comprovarBaldes = function (balda) {
            var resposta = false;
            if (balda == 1 && !this.balda1) {
                this.balda1 = true;
            }
            else if (balda == 2 && !this.balda2) {
                this.balda2 = true;
            }
            else if (balda == 3 && !this.balda3) {
                this.balda3 = true;
            }
            else if (balda == 4 && !this.balda4) {
                this.balda4 = true;
            }
            else if (balda == 5 && !this.balda5) {
                this.balda5 = true;
            }
            else if (balda == 6 && !this.balda6) {
                this.balda4 = true;
            }
            else if (balda == 7 && !this.balda7) {
                this.balda7 = true;
            }
            else if (balda == 8 && !this.balda8) {
                this.balda8 = true;
            }
            else {
                resposta = true;
            }
            return resposta;
        };
        /**
         * Possa a true la balda que l'hi introduïm
         * @param balda número de la balda
         */
        gameState.prototype.alliberarBlada = function (balda) {
            if (balda == 1) {
                this.balda1 = false;
            }
            else if (balda == 2) {
                this.balda2 = false;
            }
            else if (balda == 3) {
                this.balda3 = false;
            }
            else if (balda == 4) {
                this.balda4 = false;
            }
            else if (balda == 5) {
                this.balda5 = false;
            }
            else if (balda == 6) {
                this.balda6 = false;
            }
            else if (balda == 7) {
                this.balda7 = false;
            }
            else {
                this.balda8 = false;
            }
        };
        /***
         * Metode per moure al jugador (gat)
         */
        gameState.prototype.movePlayer = function () {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.gat.body.velocity.x = -200;
                this.gat.animations.play('idEsquerra');
            }
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.gat.body.velocity.x = 200;
                this.gat.animations.play('idDreta');
            }
            else {
                // el jugador se para
                this.gat.body.velocity.x = 0;
                this.gat.animations.play('idEsperar');
            }
            // Si pulsamos la flecha arriba y el jugador está tocando el suelo
            if (this.cursor.up.isDown) {
                // el jugador se mueve hacia arriba (salto)
                this.gat.body.velocity.y = -320;
                this.gat.animations.play('idDreta');
            }
            if (this.CONTADORTIEMPO == 0) {
            }
        };
        /**
         * Contador de temps per saber quan han de sortir cada un dels objectes
         */
        gameState.prototype.tempsObjectes = function () {
            this.contadorObjectes++;
        };
        gameState.prototype.update = function () {
            _super.prototype.update.call(this);
            this.game.physics.arcade.collide(this.gat, this.terradreta);
            this.game.physics.arcade.collide(this.gat, this.terraesquerra);
            this.game.physics.arcade.collide(this.baldes, this.gat);
            this.game.physics.arcade.collide(this.gat, this.objectes, this.tirarObjectes, null, this);
            if (!this.gameOver) {
                this.tiempo.setText("Tiempo : " + this.CONTADORTIEMPO);
                if (this.contadorObjectes == 1) {
                    this.crearObjectes();
                    this.contadorObjectes = 0;
                }
                this.movePlayer();
            }
            else {
                this.game.state.start("gameover");
            }
            if (this.CONTADORTIEMPO == 0) {
                this.gameOver = true;
                this.backgrndOvr = true;
            }
        };
        return gameState;
    })(Phaser.State);
    ElMeuJoc.gameState = gameState;
    var Objecte = (function (_super) {
        __extends(Objecte, _super);
        function Objecte(game, x, y, key, balda) {
            _super.call(this, game, x, y, key, 0);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.balda = balda;
        }
        return Objecte;
    })(Phaser.Sprite);
    var Balda = (function (_super) {
        __extends(Balda, _super);
        function Balda(game, x, y, key, frame) {
            _super.call(this, game, x, y, key, frame);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
        }
        return Balda;
    })(Phaser.Sprite);
})(ElMeuJoc || (ElMeuJoc = {}));
//# sourceMappingURL=main.js.map