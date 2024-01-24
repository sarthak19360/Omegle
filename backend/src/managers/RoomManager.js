let GLOBAL_ROOM_ID = 1;

const RoomManager = class {
  #rooms;
  constructor() {
    this.#rooms = new Map(); // {roomId, room(u1,u2)}
  }

  createRoom(user1, user2) {
    const roomId = this.generate();
    this.#rooms.set(roomId.toString(), {
      user1,
      user2,
    });

    user1.socket.emit("send-offer", {
      roomId,
    });
  }

  onOffer(roomId, sdp) {
    const user2 = this.#rooms.get(roomId.toString())?.user2;
    console.log("user2 is " + user2);
    user2.socket.emit("offer", {
      sdp,
      roomId,
    });
  }

  onAnswer(roomId, sdp) {
    const user1 = this.#rooms.get(roomId.toString())?.user1;
    console.log("user1 is " + user1);
    user1.socket.emit("answer", {
      sdp,
      roomId,
    });
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
};

export default RoomManager;
