import {
  Attribute,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FromEventObservable } from 'rxjs/observable/FromEventObservable';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

@Directive({
  selector: '[dashng-container-resizer]',
})
export class ContainerResizerDirective implements OnInit {
  @Input() type: string;
  @Input() component: object;
  @Input() nextComponent: object;

  @Output() resize = new EventEmitter<number>();

  private isDragging = false;
  private eventField: string;
  private moveEventsSub: Subscription;

  constructor(@Inject(DOCUMENT) private document: any,
              private el: ElementRef,
              private renderer: Renderer2) {

    if (this.type === 'row') {
      this.eventField = 'movementX';
    }
    else {
      this.eventField = 'movementY';
    }
  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'dashng-container-resizer');
    this.renderer.addClass(this.el.nativeElement, this.type);
  }

  stopEvents() {
    if (this.moveEventsSub) {
      this.moveEventsSub.unsubscribe();
      this.moveEventsSub = null;
    }
  }

  getMouseMove$(): Observable<Event> {
    return FromEventObservable.create(this.document, 'mousemove');
  }

  getWindowMouseUp$(): Observable<Event> {
    return FromEventObservable.create(window, 'mouseup');
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.moveEventsSub = this.getMouseMove$()
      .takeUntil(this.getWindowMouseUp$())
      .map(event => event[this.eventField])
      .subscribe(
        (delta: number) => {
          this.resize.emit(delta);
        },
        error => {
          console.error(error);
          this.moveEventsSub.unsubscribe();
        }
      )
    ;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.stopEvents();
  }

  //@HostListener('body:mouseout')
  onMouseOut() {
    console.log('body:mouseout');
    this.stopEvents();
  }
}
