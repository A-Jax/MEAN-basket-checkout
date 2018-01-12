import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // include routing 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { BasketComponent } from './components/basket/basket.component'

const appRoutes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'basket', component: BasketComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
