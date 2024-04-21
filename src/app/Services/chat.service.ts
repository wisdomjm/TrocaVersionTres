import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFireDatabase
  ) { }


  enviarMensaje(emisorId: string, receptorId: string, mensaje: string, avatarImage: string) {
    const chatId = this.generarChatId(emisorId, receptorId);
    this.db.list(`chats/${chatId}`).push({
      senderId: emisorId,
      receiverId: receptorId,
      message: mensaje,
      avatar: avatarImage,
      timestamp: new Date().getTime()
    });
  }
  
  obtenerMensajes(emisorId: string, receptorId: string) {
    const chatId = this.generarChatId(emisorId, receptorId);
    return this.db.list(`chats/${chatId}`).valueChanges();
  }

  private generarChatId(uid1: string, uid2: string) {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  }

}
