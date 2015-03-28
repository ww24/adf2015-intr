function GameViewModel() {
  this.parent = ko.observable(false);
  this.connected = ko.observable(false);

  this.circle_x = ko.observable(0);
  this.circle_y = ko.observable(0);
}

GameViewModel.prototype.play = function () {
  /** Memo
   * http://connect-sp-server/connect/?redirect=redirect-url
   */
  location.assign("/connect/?redirect=" + location.href);
};

var flag = true;

GameViewModel.prototype.move = function (d) {
  var x = this.circle_x() + (d.x || 0);
  var y = this.circle_y() + (d.y || 0);

  if (x >= 500 && flag) {
    
    flag = false;
  }

  this.circle_x(x);
  this.circle_y(y);
};

// interface
GameViewModel.prototype.left = function () {};
GameViewModel.prototype.right = function () {};
