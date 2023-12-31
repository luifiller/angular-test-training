import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy {
    @Output() liked = new EventEmitter<void>();
    
    @Input() description: string = '';
    @Input() src: string = '';
    @Input() likes: number = 0;

    private debounceSubject: Subject<void> = new Subject();
    private unsubscribe: Subject<void> = new Subject();

    constructor() {}

    ngOnInit(): void {
        this.debounceSubject
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.liked.emit());
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public like(): void {
        this.debounceSubject.next();
    }
}