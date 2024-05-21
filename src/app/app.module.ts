import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ContrasenaOlvidadaComponent } from './contrasena-olvidada/contrasena-olvidada.component';
import { SharedModule } from './shared/shared.module';
import { AdminGuard } from './guardianes/admin.guard';
import { FormularioReservaComponent } from './formulario-reserva/formulario-reserva.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AppRoutingModule    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AyudaComponent,
    ContrasenaOlvidadaComponent,
    FormularioReservaComponent

  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
