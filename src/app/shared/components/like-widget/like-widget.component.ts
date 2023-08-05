import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { UniqueIdService } from './../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.scss']
})
export class LikeWidgetComponent implements OnInit, OnChanges {
  @Output() public liked = new EventEmitter<void>();
  @Input() public likes: number = 0;
  @Input() public id: string = null;

  public fonts = { faThumbsUp };
  public spanAriaLabel: string = '';

  constructor(private uniqueIdService: UniqueIdService) { }

  public ngOnInit(): void {
    if (!this.id) {
      this.id = this.uniqueIdService.generateUniqueIdWithPrefix('like-widget');
    }
  }

  public ngOnChanges(): void {
    this.spanAriaLabel = this.likes === 1 ? '1 person liked' : `${this.likes} people liked`;
  }

  public like(): void {
    this.liked.emit();
  }
}
