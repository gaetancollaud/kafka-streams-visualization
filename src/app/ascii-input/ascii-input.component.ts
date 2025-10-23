import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {TOPOLOGY_EXAMPLE_1, TOPOLOGY_EXAMPLE_2} from './examples';
import {Store} from '../store.service';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ReplaySubject, Subject, takeUntil} from 'rxjs';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-ascii-input',
    templateUrl: './ascii-input.component.html',
    styleUrls: ['./ascii-input.component.scss'],
    imports: [MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatInput, CdkTextareaAutosize, MatCardActions, MatButton]
})
export class AsciiInputComponent implements OnInit, OnDestroy {

  public formGroup: UntypedFormGroup;
  private destroySubject: Subject<any> = new ReplaySubject();

  public constructor(private store: Store, formBuilder: UntypedFormBuilder) {
    this.formGroup = formBuilder.group({
      'ascii': []
    })

    effect(() => {
      const topology = this.store.topology();
      this.formGroup.patchValue({ascii: topology})
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  onExample1() {
    this.formGroup.patchValue({ascii: TOPOLOGY_EXAMPLE_1})
    this.onSave();
  }

  onExample2() {
    this.formGroup.patchValue({ascii: TOPOLOGY_EXAMPLE_2})
    this.onSave();
  }

  onSave() {
    this.store.setTopology(this.formGroup.get('ascii')?.value.trim());
  }

  onClear() {
    this.formGroup.patchValue({ascii: undefined});
    this.store.clearTopology();
  }

}
