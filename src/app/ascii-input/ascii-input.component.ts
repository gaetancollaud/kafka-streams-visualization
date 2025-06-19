import {Component, OnDestroy, OnInit} from '@angular/core';
import {TOPOLOGY_EXAMPLE_1, TOPOLOGY_EXAMPLE_2} from './examples';
import {Store} from '../store.service';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {ReplaySubject, Subject, takeUntil} from 'rxjs';

@Component({
    selector: 'app-ascii-input',
    templateUrl: './ascii-input.component.html',
    styleUrls: ['./ascii-input.component.scss'],
    standalone: false
})
export class AsciiInputComponent implements OnInit, OnDestroy {

  public formGroup: UntypedFormGroup;
  private destroySubject: Subject<any> = new ReplaySubject();

  public constructor(private store: Store, formBuilder: UntypedFormBuilder) {
    this.formGroup = formBuilder.group({
      'ascii': []
    })
  }

  ngOnInit(): void {
    this.store.getTopology()
      .pipe(takeUntil(this.destroySubject))
      .subscribe(topology => this.formGroup.patchValue({ascii: topology}));
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

  textAreaChanged() {
  }

  onSave() {
    this.store.setTopology(this.formGroup.get('ascii')?.value.trim());
  }

  onClear() {
    this.formGroup.patchValue({ascii: undefined});
    this.store.clearTopology();
  }

}
