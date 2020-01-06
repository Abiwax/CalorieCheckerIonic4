import {Component, Input} from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html',
  styleUrls: ['timeline.scss']
})
export class TimelineComponent {
  @Input('endIcon') endIcon = 'ionic';

  constructor() {

  }

}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['timeline.scss']
})
export class TimelineItemComponent {
  constructor() {

  }
}


@Component({
  selector: 'timeline-time',
  template: '<span>{{time.subtitle}}</span> <span>{{time.title}}</span>',
  styleUrls: ['timeline.scss']
})
export class TimelineTimeComponent {
  @Input('time') time:any = {subtitle: '', title: ''};

  constructor() {

  }
}
