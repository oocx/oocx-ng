import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LabelIdGeneratorService {

    public static nextLabelId = 0;

    public getNextId(): string {
        return 'aclabel_' + (LabelIdGeneratorService.nextLabelId++);
    }
}
