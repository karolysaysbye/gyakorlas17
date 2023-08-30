import { Component } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { gamerpc } from 'src/app/utils/gamerpc';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  
  newGamerPc: gamerpc = {
 
    comment: { text: '' }
  };


  constructor(private bs: BaseService) {}
  
  addNewPc(newGamerPc: gamerpc) {
    this.bs.addGamerPc(newGamerPc).then(() => {
      console.log('Sikeres hozzáadás!',newGamerPc);
    })
  }

}
