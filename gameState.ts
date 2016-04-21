/**
 * Created by sandra on 18/04/2016.
 */
/// <reference path="phaser/phaser.d.ts"/>
//Example game: http://catscatscatscatscats.com/
//http://www.phaser.io/news/2015/11/be-a-cat
//74538f
module  ElMeuJoc{

    export class gameState extends Phaser.State {
        cursor:Phaser.CursorKeys;
        terraesquerra:Phaser.Sprite;
        gat:Phaser.Sprite;
        kitty:Phaser.Sprite;
        terradreta:Phaser.Sprite;
        baldainici:Phaser.Sprite;
        baldes:Phaser.Group;
        objectes:Phaser.Group;
        ESPAIH = 167;
        ESPAIV = 110;
        tiempo:Phaser.BitmapText;
        CONTADORTIEMPO = 30;
        contadorObjectes = 0;
        gameOver = false;
        puntuacio = 0;
        balda1 = false;
        balda2 = false;
        balda3 = false;
        balda4 = false;
        balda5 = false;
        balda6 = false;
        balda7 = false;
        balda8 = false;



        /**
         * Metodes que utilitzaré al create.
         */
        /**
         * Metode configObjectes serveix per congigurar el group d'objectes.
         */
        configObjectes(){
            this.objectes = this.add.group();
            this.objectes.enableBody = true;
            this.objectes.physicsBodyType = Phaser.Physics.ARCADE;
        }

        /**
         * Metode configGat serveix per configurar el Sprite Gat
         */
        // this.playerAnimationsLoad();
        configGat() {
            this.gat = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.height - 83,
                'kitty'
            );
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

        }
        /**
         * Metode configWorld serveix per configurar el mon
         */
        configWorld() {
            this.game.stage.backgroundColor = "#74538f";
            this.terraesquerra = this.game.add.sprite(
                this.game.world.width - 798,
                this.game.world.height - 100,
                'terraesquerra'
            );
            this.game.physics.arcade.enable(this.terraesquerra);
            this.terraesquerra.body.immovable = true;


            this.baldainici = this.game.add.sprite(
                this.game.world.width - 565,
                this.game.world.height - 35,
                'baldainici'
            );
            this.game.physics.arcade.enable(this.baldainici);
            this.baldainici.body.immovable = true;

            this.terradreta = this.game.add.sprite(
                this.game.world.width - 250,
                this.game.world.height - 100,
                'terradreta'
            )
            this.game.physics.arcade.enable(this.terradreta);
            this.terradreta.body.immovable = true;
            /*
             this.textIntro = this.game.add.bitmapText(this.world.centerX, 100, 'carrier_command','El joc del gatet !',30);
             this.textIntro.inputEnabled = true;
             this.textIntro.input.enableDrag();
             this.textIntro.anchor.setTo(0.5, 0.5);
             */
            this.tiempo = this.game.add.bitmapText(20, 10,'carrier_command', "Tiempo : " + this.CONTADORTIEMPO,15);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.temporitzadorPartida, this);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.tempsObjectes, this);
            // Cogemos los cursores para gestionar la entrada
            this.cursor = this.game.input.keyboard.createCursorKeys();
        }

        /**
         * Contador de la partida.
         */
        temporitzadorPartida() {

            this.CONTADORTIEMPO--;
        }
        /**
         * Metode configbaldes serveix per col·locar les baldes a la posició que l'hi toca
         */
        configbaldes() {

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
        }

        create():void {

            super.create();
            this.configWorld();
            this.configbaldes();
            this.configGat();
            this.configObjectes();
        }

        /**
         * Metodes utilitzats al update
         */
        /**
         * Metode que al chocar amb un obecte desapareix.
         * @param gat - Sprite gat (jugador)
         * @param objecte - Objectes que hi ha a les baldes
         */
        tirarObjectes(gat:Phaser.Sprite, objecte:Objecte) {
            var num = objecte.balda;
            objecte.kill();
            this.alliberarBlada(num);
            this.CONTADORTIEMPO=this.CONTADORTIEMPO+3;

        }

        /**
         *Metode que retorna un tipus de objecte al atzar.
         * @returns string tipus d'objecte
         */
        tipusObjecte():string {
            var tipus = Math.floor((Math.random() * 6) + 1);
            var object;
            if (tipus == 1) {
                object = 'teclat';
            } else if (tipus == 2) {
                object = 'llibre';
            } else if (tipus == 3) {
                object = 'rellotge';
            } else if (tipus == 4) {
                object = 'flor';
            } else {
                object = 'basura';
            }
            return object;
        }

        /**
         * Metode que crea objectes al atzar en una posició random
         */
        crearObjectes() {

            var posicions:Point[] = [new Point(1, 2), new Point(2, 0), new Point(2, 4), new Point(4, 0), new Point(4, 4), new Point(3, 1), new Point(3, 3), new Point(3, 2)];
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

        }

        playerAnimationsLoad(){

            this.gat.animations.add('idEsperar', [0,1,2,3], 10,true);
            this.gat.animations.add('idDreta', [8,9,10,11,12,13,14,15], 10,true);
            this.gat.animations.add('idEsquerra', [24,25,26,27,28,29,30,31], 10,true);

        }
        /**
         * Comprova si la balda està dispobible
         * @param balda id de la balda
         * @returns {boolean} false si està disponible true si esta ocupada.
         */
        comprovarBaldes(balda:number):boolean{
            var resposta = false;
            if(balda==1 && !this.balda1){
                this.balda1=true;
            }else if(balda==2 && !this.balda2){
                this.balda2=true;
            }else if(balda==3 &&  !this.balda3){
                this.balda3=true;
            }else if(balda==4 && !this.balda4){
                this.balda4=true;
            }else if(balda==5 && !this.balda5){
                this.balda5=true;
            }else if(balda==6 && !this.balda6){
                this.balda4=true;
            }else if(balda==7 && !this.balda7){
                this.balda7=true;
            }else if(balda==8 && !this.balda8){
                this.balda8=true;
            } else {
                resposta = true;
            }
            return resposta;
        }

        /**
         * Possa a true la balda que l'hi introduïm
         * @param balda número de la balda
         */
        alliberarBlada(balda:number) {
            if (balda == 1) {
                this.balda1 = false;
            } else if (balda == 2) {
                this.balda2 = false;
            } else if (balda == 3) {
                this.balda3 = false;
            } else if (balda == 4) {
                this.balda4 = false;
            } else if (balda == 5) {
                this.balda5 = false;
            } else if (balda == 6) {
                this.balda6 = false;
            } else if (balda == 7) {
                this.balda7 = false;
            } else {
                this.balda8 = false;
            }
        }

        /***
         * Metode per moure al jugador (gat)
         */
        movePlayer():void {
            // Si pulsamos el cursor izquierdo
            if (this.cursor.left.isDown) {
                // Movemos al jugador a la izquierda
                this.gat.body.velocity.x = -200;
                this.gat.animations.play('idEsquerra');
            }
            // Si pulsamos el cursor derecho
            else if (this.cursor.right.isDown) {
                // Movemos al jugador a la derecha
                this.gat.body.velocity.x = 200;
                this.gat.animations.play('idDreta');
            }
            // Si no se pulsan ni el cursor izquierdo ni el derecho
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

        }

        /**
         * Contador de temps per saber quan han de sortir cada un dels objectes
         */
        tempsObjectes() {
            this.contadorObjectes++;
        }
        update():void {
            super.update();
            this.game.physics.arcade.collide(this.gat, this.terradreta);
            this.game.physics.arcade.collide(this.gat, this.terraesquerra);
            this.game.physics.arcade.collide(this.baldes, this.gat);
            this.game.physics.arcade.collide(this.gat, this.objectes, this.tirarObjectes, null, this);
            this.movePlayer();
            if (this.contadorObjectes == 1) {
                this.crearObjectes();
                this.contadorObjectes=0;
            }

            if(!this.gameOver){
                this.tiempo.setText("Tiempo : " + this.CONTADORTIEMPO);
            }
            if(this.CONTADORTIEMPO==0){
                this.gameOver=true;
            }


        }


    }
    class Objecte extends Phaser.Sprite {
        balda;

        constructor(game:Phaser.Game, x:number, y:number, key:string, balda:number) {
            super(game, x, y, key, 0);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.balda = balda;
        }
    }
    class Balda extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
            super(game, x, y, key, frame);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;

        }
    }

}
