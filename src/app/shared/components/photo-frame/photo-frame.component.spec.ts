import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { PhotoFrameComponent } from "./photo-frame.component";
import { PhotoFrameModule } from "./photo-frame.module";

describe(PhotoFrameComponent.name, () => {
    let fixture: ComponentFixture<PhotoFrameComponent> = null;
    let component: PhotoFrameComponent = null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PhotoFrameModule],
            providers: [
                {
                    provide: ComponentFixtureAutoDetect,
                    useValue: true
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PhotoFrameComponent);
        component = fixture.componentInstance;
    })

    it(`#should create component`, () => {
        expect(component).toBeTruthy();
    });

    it(`#${PhotoFrameComponent.prototype.like.name} 
        should trigger (@Output like) once when called multiple times
        within debounce time`, fakeAsync(() => {
        let likeSpy = spyOn(component.liked, 'emit');
        
        component.like();
        component.like();
        tick(500);
        
        expect(likeSpy).toHaveBeenCalledTimes(1)
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
})