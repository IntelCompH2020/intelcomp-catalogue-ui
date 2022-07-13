import {Component} from "@angular/core";
import {LandingPageService} from "../../../../catalogue-ui/services/landing-page.service";
import {LandingPageComponent} from "../../../../catalogue-ui/pages/landingpages/dataset/landing-page.component";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../services/navigation.service";
import {UserService} from "../../../services/user.service";
import {UserInfo} from "../../../domain/userInfo";

declare var UIkit: any;

@Component({
  selector: 'pages-dataset',
  templateUrl: 'dataset-landing-page.component.html',
  providers: [LandingPageService]
})

export class DatasetLandingPageComponent extends LandingPageComponent {

  userInfo: UserInfo = null;
  projectName: string = null;

  constructor(protected override route: ActivatedRoute,
              protected override landingPageService: LandingPageService,
              protected navigationService: NavigationService,
              protected router: Router,
              protected userService: UserService) {
    super(route, landingPageService)
  }

  override ngOnInit() {
    super.ngOnInit();
    this.projectName = environment.projectName;
    if (this.userService.userInfo !== null) {
      this.userInfo = this.userService.userInfo;
    } else {
      this.subscriptions.push(
        this.userService.getUserInfo().subscribe(
          res => {
            this.userInfo = res;
            this.userService.roleToSessionStorage(res);
          },
          error => {
            console.log(error);
          }
        )
      );
    }
  }

  gotoRequestData(instanceVersion, datasetId) {
    this.navigationService.setDataRequestIds(instanceVersion, datasetId);
    this.router.navigate([`/request-data`]).then(
      UIkit.modal('#modal-dataset-instances').hide()
    );
  }

  download(url: string) {
    window.open(url, '_blank');
  }

}
