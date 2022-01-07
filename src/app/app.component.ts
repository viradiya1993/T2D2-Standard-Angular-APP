import { Component , HostListener} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
  //   console.log(event , 'eee')
  //  // this.sharedService.setLocalStorage('wasPageClosed', 'true');
  //  localStorage.setItem('pageclose' , 'true' );
  //   return false;
  // }

}
