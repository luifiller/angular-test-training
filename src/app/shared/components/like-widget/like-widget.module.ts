import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LikeWidgetComponent } from "./like-widget.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { ActionDirectiveModule } from "../../directives/action/action.module";

@NgModule({
    declarations: [
        LikeWidgetComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ActionDirectiveModule,
    ],
    exports: [
        LikeWidgetComponent
    ],
    providers: [
        UniqueIdService
    ]
})

export class LikeWidgetModule { }