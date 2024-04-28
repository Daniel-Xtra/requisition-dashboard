import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TDepartment } from 'src/app/types/user';

@Component({
  selector: 'app-new-requisition',

  templateUrl: './new-requisition.component.html',
  styleUrl: './new-requisition.component.scss',
})
export class NewRequisitionComponent implements OnInit {
  @Output() requisitions = new EventEmitter();
  addForm: FormGroup;
  length = 1;
  departments: TDepartment[] = [];
  private apiService = inject(ApiService);
  private toast = inject(ToastService);
  ngOnInit(): void {
    this.initialize();
    this.division();
  }

  phoneKeyDown(e: any) {
    const keyCode = e.keyCode;
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode != 8
    ) {
      e.preventDefault();
    }
  }

  closeModal() {
    document.getElementById('request-modal').style.display = 'none';
    document
      .getElementsByTagName('body')[0]
      .classList.remove('overflow-y-hidden');
  }

  onAddItem() {
    const items = <FormArray>this.addForm.get('requests');
    if (items.length < 4) {
      this.length++;
      items.push(
        new FormGroup({
          item: new FormControl('', Validators.required),
          qty_required: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      );
    }
  }

  onDeleteItem(index: number) {
    const items = <FormArray>this.addForm.get('requests');
    if (items.length > 1) {
      this.length--;
      items.removeAt(index);
    }
  }

  initialize() {
    let request = new FormArray([
      new FormGroup({
        item: new FormControl('', Validators.required),
        qty_required: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    ]);
    this.addForm = new FormGroup({
      division: new FormControl('', Validators.required),
      purpose: new FormControl(''),

      requests: request,
    });
  }

  async division() {
    this.apiService.getDepartments().subscribe({
      next: async ({ data, status, message }) => {
        this.departments = [...data];
      },
      error: async ({ message }) => {},
    });
  }

  onSubmit() {
    this.apiService.addRequisition(this.addForm.value).subscribe({
      next: (res: any) => {
        this.addForm.reset();
        this.requisitions.emit();
      },
      error: (error) => {
        this.toast.error(error);
      },
    });
  }
}
