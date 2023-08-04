import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;

    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule],
            providers: [
                {
                    provide: ComponentFixtureAutoDetect,
                    useValue: true
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    })

    it(`#should create component`, () => {
        expect(component).toBeTruthy();
    })

    it(`#${LikeWidgetComponent.prototype.ngOnInit.name} 
        should automatically generate an ID when (@Input id) is not assigned`, () => {
        expect(component.id).toBeTruthy();
    })

    it(`#${LikeWidgetComponent.prototype.ngOnInit.name} 
        should NOT automatically generate an ID when (@Input id) is assinged`, () => {
        const someId = 'someId';

        component.id = someId;

        expect(component.id).toBe('someId');
    })

    it(`#${LikeWidgetComponent.prototype.like.name}
        should trigger (@Output liked) when called`, () => {
        const spy = spyOn(component.liked, 'emit');
        
        component.like();
        expect(spy).toHaveBeenCalled();
    })
})