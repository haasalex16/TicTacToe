(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function ($el) {
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    this.resetBoard();
  };

  View.prototype.bindEvents = function () {
    this.$el.find(".grid").on("click","li.clickable", function(event) {
      var $clicked = $(event.currentTarget);
      $clicked.removeClass("clickable");
      $clicked.addClass(this.game.currentPlayer);
      this.game.playMove($clicked.data("pos"));
      this.gameOver();
    }.bind(this));
  };

  View.prototype.gameOver = function () {
    if (this.game.isOver()) {
      this.$el.find("li").removeClass("clickable");
      if (this.game.winner()) {
        this.$el.find(".message").append("<h1>" +
         this.game.winner() + " has won!</h1>");
      } else {
        alert("NO ONE WINS!");
      }
      this.$el.find(".restart").removeClass("hidden");
    }
  }

  View.prototype.resetBoard = function(){
    this.$el.find(".restart").on("click",function(event){
      console.log("clicked restart button");
      this.setupBoard();
    }.bind(this));
  }

  View.prototype.makeMove = function ($square) {
  };


  View.prototype.setupBoard = function () {
    var $ul = this.$el.find("ul");


    this.$el.find("li").detach();
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var arr = "["+ [i,j] +"]"
        $("<li>")
          .addClass("some-class")
          .attr("data-pos", arr)
          .appendTo($ul)
      }
    }
    this.$el.find(".restart").addClass("hidden");
    this.$el.find("h1").detach();

    var $li = this.$el.find("li");
    $li.addClass("clickable");
    $li.removeClass("x");
    $li.removeClass("o");
    this.game = new TTT.Game();
  };
})();
