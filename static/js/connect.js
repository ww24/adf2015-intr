/**
 * node-connect-sp
 * client
 */

var realtime = (function () {
  var socket = io.connect(),
      method = {};

  function activation() {
    socket.emit("activate", {
      connect_id: location.pathname.split("/").pop()
    }, function (data) {
      connection_list.is_parent(data.is_parent);
      connection_list.connected(data.connected);
    });
  }

  // connect event
  socket.on("connect", activation);
  // activatable event
  socket.on("activatable", activation);

  socket.on("room_info:add", function (data) {
    console.log(data.client);
    connection_list.add(data.client);
  });
  socket.on("room_info:remove", function (data) {
    connection_list.remove(data.client.socket_id);
  });
  socket.on("room_info:activate", function (data) {
    connection_list.remove(data.client.socket_id);
  });

  socket.on("disconnect", function () {
    connection_list
      .remove()
      .connected(false);
  });

  // confirm disconnection
  function beforeunload() {
    return "別のページに移ると接続が切断されます。";
  }
  // window.addEventListener("beforeunload", beforeunload);
  // window.removeEventListener("beforeunload", beforeunload);

  // activate client
  method.activate = function (socket_id, callback) {
    var args = ["activate:client", {
      socket_id: socket_id
    }];

    callback && args.push(callback);

    socket.emit.apply(socket, args);
  };

  return method;
})();
