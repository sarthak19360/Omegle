import RoomManager from "./RoomManager.js";

const UserManager = class {
  #users; // an array of users(name,socket)
  #queue; // an array of userIds(socketId)
  #roomManager; // room manager
  constructor() {
    this.#users = [];
    this.#queue = [];
    this.#roomManager = new RoomManager();
  }

  addUser(name, socket) {
    this.#users.push({
      name,
      socket,
    });
    this.#queue.push(socket.id);
    socket.send("lobby");
    this.clearQueue();
    this.initHandler(socket);
  }

  removeUser(socketId) {
    const user = this.#users.find((x) => x.socket.if === socketId);
    this.#users = this.#users.filter((x) => x.socket.id !== socketId);
    this.#queue = this.#queue.filter((x) => x === socketId);
  }

  clearQueue() {
    if (this.#queue.length < 2) {
      return;
    }
    const id1 = this.#queue.pop();
    const id2 = this.#queue.pop();
    const user1 = this.#users.find((x) => x.socket.id === id1);
    const user2 = this.#users.find((x) => x.socket.id === id2);

    if (!user1 || !user2) {
      return;
    }
    console.log("creating room");
    const room = this.#roomManager.createRoom(user1, user2);
    this.clearQueue();
  }

  initHandler(socket) {
    socket.on("offer", ({ sdp, roomId }) => {
      this.#roomManager.onOffer(roomId, sdp);
    });
    socket.on("answer", ({ sdp, roomId }) => {
      this.#roomManager.onAnswer(roomId, sdp);
    });
  }
};

export default UserManager;
