import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../models/cargo.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toast: ToastrService) { }

  success(msg: string){
    this.toast.success(msg, "¡Exito!", {
      timeOut: 5000,
    });
  }
  error(msg: string){
    this.toast.error(msg, "¡Error!", {
      timeOut: 5000,
    });
  }
  info(msg: string){
    this.toast.info(msg, "¡Aviso!", {
      timeOut: 5000,
    });
  }
  warning(msg: string){
    this.toast.warning(msg, "¡Advertencia!", {
      timeOut: 5000,
    });
  }
}
