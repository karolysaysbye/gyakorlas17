import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { gamerpc } from '../utils/gamerpc';
import { cpu } from '../utils/cpu';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  refGamerpc: AngularFireList<gamerpc>
  refCpu: AngularFireList<cpu>

  constructor(private db: AngularFireDatabase) {
    this.refGamerpc = this.db.list('gamer');
    this.refCpu = this.db.list('cpu');
  }

  getGamerPc() {
    return this.refGamerpc;
  }

  getCpu() {
    return this.refCpu;
  }

  deleteGamerPc(key: string) {
    return this.refGamerpc.remove(key);
  }

  addGamerPc(gamerpc: gamerpc) {
    return this.refGamerpc.push(gamerpc);
  }

  updateGamerPc(key: string, data: any) {
    return this.refGamerpc.update(key, data);
  }

}
