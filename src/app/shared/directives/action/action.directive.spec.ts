import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule],
    });

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    fixture.detectChanges();

    const dummyDiv: HTMLElement =
      fixture.nativeElement.querySelector('.dummy-component');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    dummyDiv.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it(`(D) (@Output appAction) should emit event with payload when clicked`, () => {
    fixture.detectChanges();

    const dummyDiv: HTMLElement =
      fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');

    dummyDiv.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });
});

@Component({
  template: `<div
    class="dummy-component"
    (appAction)="actionHandler($event)"
  ></div>`,
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  public actionHandler($event: Event): void {
    this.event = $event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}
