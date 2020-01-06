import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating',
  templateUrl: 'rating.html',
  styleUrls: ['rating.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {
  @Input() rate: number;
  @Input() readonly: boolean;
  @Input() size = 'default';
  @Output() rateChange: EventEmitter<number> = new EventEmitter();
  hoverRate: number;
  _onChange: Function;

  onClick(rate) {
    this.rate = rate;
    this.rateChange.emit(this.rate);
    // this._onChange(this.rate);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.rate = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
