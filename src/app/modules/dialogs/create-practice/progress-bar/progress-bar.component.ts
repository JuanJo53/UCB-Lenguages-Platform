import { Component, OnInit } from "@angular/core";
import { Combo } from "src/app/models/ComboBox/comboBox";
@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  endDate = new Date(1990, 0, 1);
  tipoPreguntaSeleccionado: string;

  tipoPregunta: Combo[] = [
    { value: "1", display: "Simple" },
    { value: "2", display: "Drag and Drop" },
  ];
  tipoRespuesta: Combo[] = [
    { value: "1", display: "Unique" },
    { value: "2", display: "Multiple" },
  ];

  constructor() {}

  ngOnInit(): void {}
  next() {
    console.log("next");
  }
  previous() {
    console.log("previous");
  }
  selected() {
    console.log(this.tipoPreguntaSeleccionado);
  }
}
