import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";  // Importiere die Routen von app.routes

@NgModule({
    imports: [RouterModule],  // Nutze die importierten Routen
    exports: [RouterModule] 
})
export class AppRoutingModule {}