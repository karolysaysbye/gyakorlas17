import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { gamerpc } from 'src/app/utils/gamerpc';
import { cpu } from 'src/app/utils/cpu';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  gamerpc?: gamerpc[];
  cpu?: cpu[];

  constructor(private bs: BaseService) {
    this.bs.getGamerPc().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(data => {
      this.gamerpc = data;
      console.log(this.gamerpc);
    })

    this.bs.getCpu().snapshotChanges().pipe(map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(data => {
      this.cpu = data;
      console.log(this.cpu);
    })

   
  }

  getCpus(key: string | undefined) {
    return this.cpu?.find((k: any) => {
      return k.key ==key;
    })
  }

  editPc(gamerpc: gamerpc) {
   const data = gamerpc;

   if(gamerpc.key) {
    this.bs.updateGamerPc(gamerpc.key, data).then(() => {
      console.log('Sikeres frissítés!');
    })
   }
  }

  deletePc(gamerpc: gamerpc) {
    if (gamerpc.key) {
      this.bs.deleteGamerPc(gamerpc.key).then(() => {
        console.log('Sikeres törlés!')
      })
    }
  }

}
