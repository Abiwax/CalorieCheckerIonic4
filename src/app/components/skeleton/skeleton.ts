/*Components import*/
import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-skeleton',
  templateUrl: 'skeleton.html',
})
export class Skeleton {

  @Input() templates: any = [];
  @Input() template: any;
  @Input() type: any = 'list';
  base_templates: any = new Array(14);

  constructor() {
  }
}
