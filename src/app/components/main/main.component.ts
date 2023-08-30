import { Component } from '@angular/core';
import { map } from 'rxjs/operators'
import { gamerpc } from 'src/app/utils/gamerpc';
import { cpu } from 'src/app/utils/cpu';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  gamerpc?: gamerpc[];
  cpu?: cpu[];

  constructor(private bs: BaseService) {
    this.bs.getGamerPc().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(data => {
      this.gamerpc = data;
      console.log(this.gamerpc);
    })

    this.bs.getCpu().snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(data => {
      this.cpu = data;
      console.log(this.cpu);
    })

  }

  getCpus(key: string | undefined) {
    return this.cpu?.find((k: any) => {
      return k.key == key;
    })

  }

}
