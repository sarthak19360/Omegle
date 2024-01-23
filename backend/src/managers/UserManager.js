import RoomManager from "./RoomManager";

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
    this.clearQueue();
    this.initHandler(socket);
  }

  removeUser(socketId) {
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
    const room = this.#roomManager.createRoom(user1, user2);
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
