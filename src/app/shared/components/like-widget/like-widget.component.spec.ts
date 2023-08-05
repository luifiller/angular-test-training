import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component: LikeWidgetComponent = null;
    let uniqueIdService: UniqueIdService;


    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [LikeWidgetModule],
            providers: [
                {
                    provide: ComponentFixtureAutoDetect,
                    useValue: true
                },
                UniqueIdService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        uniqueIdService = TestBed.inject(UniqueIdService);
        component = fixture.componentInstance;
    })

    it(`#should create component`, () => {
        expect(component).toBeTruthy();
    })

    it(`#${LikeWidgetComponent.prototype.ngOnInit.name} 
        should automatically generate an ID when (@Input id) is NOT provided`, () => {
        expect(component.id).toBeTruthy();
    })

    it(`#${LikeWidgetComponent.prototype.ngOnInit.name} 
        should automatically generate an ID when (@Input id) is already provided`, () => {
        component.id = 'existing-id';
        const generateUniqueIdSpy = spyOn(uniqueIdService, 'generateUniqueIdWithPrefix');

        component.ngOnInit();
    
        expect(generateUniqueIdSpy).not.toHaveBeenCalled();
        expect(component.id).toBe('existing-id');
      });

    it(`#${LikeWidgetComponent.prototype.ngOnChanges.name}
    should update (spanAriaLabel) when changes are detected in (@Input likes)`, () => {
        const valuesLikes = [0, 1, 4];

        valuesLikes.forEach((value) => {
            component.likes = value;
            component.ngOnChanges();

            if (value === 1) {
                expect(component.spanAriaLabel).toBe('1 person liked');
            } else if (value === 0 || value > 1) {
                expect(component.spanAriaLabel).toBe(`${value} people liked`);
            }
        })
    })

    it(`#${LikeWidgetComponent.prototype.like.name}
        should trigger (@Output liked) when called`, () => {
        const spy = spyOn(component.liked, 'emit');
        
        component.like();
        expect(spy).toHaveBeenCalled();
    })
})