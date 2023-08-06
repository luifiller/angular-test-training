import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it(`Should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} 
        should trigger (@Output like) once when called multiple times
        within debounce time`, fakeAsync(() => {
    let likeSpy = spyOn(component.liked, 'emit');

    component.like();
    component.like();
    tick(500);

    expect(likeSpy).toHaveBeenCalledTimes(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name} 
    should trigger (@Output like) twice when called 
    outside debounce time`, fakeAsync(() => {
    let times = 0;

    component.liked.subscribe(() => times++);

    while (times < 2) {
      component.like();
      tick(500);
      times++;
    }

    expect(times).toBe(2);
  }));

  /*
    Utiliza-se (D) para identificar testes de DOM
    Esses testes tendem a aumentar o tempo de teste,
    porque fazem queries no DOM
  */
  it(`(D) Should display number of likes when (@Input likes) is incremented`, () => {
    component.likes++;
    fixture.detectChanges();

    const elementCounter: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(elementCounter.textContent.trim()).toBe('1');
  });

  it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
    component.likes++;

    fixture.detectChanges();
  
    const elementAriaLabel: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(elementAriaLabel.getAttribute('aria-label')).toBe('1 person liked');
  });

  it(`(D) Should have aria-label with ZERO(0) as default (@Input likes) value`, () => {
    const elementAriaLabel: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(elementAriaLabel.getAttribute('aria-label')).toBe('0 people liked');
  });

  it(`(D) Should display image with src and description when boun to properties`, () => {
    const someDescription = 'some description';
    const someSrc = 'http://somesite.com/img.jpg';

    component.description = someDescription;
    component.src = someSrc;

    fixture.detectChanges();

    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(someSrc);
    expect(img.getAttribute('alt')).toBe(someDescription);
  });
});
