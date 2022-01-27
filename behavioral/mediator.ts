interface IParticipant {
  name: string;
  send(msg: string, to?: IParticipant): void;
  receive(msg: string, from: IParticipant): void;
  setChatroom(room: IChatRoom): void;
}

interface IChatRoom {
  join(participant: IParticipant): void;
  send(from: IParticipant, msg: string, to?: IParticipant): void;
}

class Participant implements IParticipant {
  public chatroom: IChatRoom;

  constructor(public name: string) {}

  receive(msg: string, from: IParticipant): void {
    console.log(`${from.name} to ${this.name}: ${msg}`);
  }

  send(msg: string, to?: IParticipant): void {
    this.chatroom.send(this, msg, to);
  }

  setChatroom(room: IChatRoom): void {
    this.chatroom = room;
  }
}

class Chatroom implements IChatRoom {
  private participants: Map<string, IParticipant> = new Map();

  join(participant: IParticipant): void {
    this.participants.set(participant.name, participant);
    participant.setChatroom(this);
    console.log(`User ${participant.name} has join chat`);
  }

  send(from: IParticipant, msg: string, to?: IParticipant): void {
    if (to) {
      const receiver = this.participants.get(to.name);
      receiver.receive(msg, from);
      return;
    }

    this.participants.forEach((receiver) => {
      if (receiver.name !== from.name) {
        receiver.receive(msg, from);
      }
    });
  }
}

(() => {
  const john = new Participant("John");
  const keyl = new Participant("Keyl");
  const eve = new Participant("Eve");

  const chatroom = new Chatroom();
  chatroom.join(john);
  chatroom.join(keyl);
  chatroom.join(eve);

  john.send("Hi Keyl", keyl);
  eve.send("Hi everyone!");
})();
