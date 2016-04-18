var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var Point = Phaser.Point;
var MyGame;
(function (MyGame) {
    var SimpleGame = (function (_super) {
        __extends(SimpleGame, _super);
        function SimpleGame() {
            _super.call(this, 800, 600, Phaser.AUTO, "gameDiv");
            /// this.state.add("load", LoadState);
            // this.state.add("menu", MenuState);
            this.state.add("game", gameState);
            this.state.start("game");
        }
        return SimpleGame;
    })(Phaser.Game);
    MyGame.SimpleGame = SimpleGame;
})(MyGame || (MyGame = {}));
window.onload = function () {
    var game = new MyGame.SimpleGame();
};
//# sourceMappingURL=main.js.map