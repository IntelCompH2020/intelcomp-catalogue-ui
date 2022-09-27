import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CatalogueService} from "../../services/catalogue.service";
import {Survey, SurveyAnswer} from "../../domain/survey";
import {Subscriber, zip} from "rxjs";
import {FormControlService} from "../../../catalogue-ui/services/form-control.service";
import {Model} from "../../../catalogue-ui/domain/dynamic-form-model";


@Component({
  selector: 'pages-form',
  templateUrl: 'form.component.html',
  providers: [FormControlService]
})

export class FormComponent implements OnInit, OnDestroy {

  subscriptions = [];
  tabsHeader: string = null;
  surveyAnswers: SurveyAnswer = null
  vocabulariesMap: Map<string, object[]> = null
  datasetType: string;
  model: Model = null;
  ready = false;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogueService: CatalogueService,
              private formService: FormControlService) {
  }

  ngOnInit() {
    this.ready = false;
    this.datasetType = this.activatedRoute.snapshot.params['resourceTypeModel'];
    this.subscriptions.push(
      zip(
        this.formService.getFormModelByType(this.datasetType),
        this.formService.getUiVocabularies()).subscribe(
        res => {
          this.model = res[0].results[0];
          this.vocabulariesMap = res[1]
        },
        error => {console.log(error)},
        () => {this.ready = true}
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

}
