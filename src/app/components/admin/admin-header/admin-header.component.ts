import { Component, OnInit } from '@angular/core';
import languages from "../../../data/languages.json";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  langList:any[] = languages;
  selectedLang: any;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.setDefaultLang(this.langList[1]);
    this.setBrowserLanguage();

  }
  setDefaultLang(lang: any) {
    this.selectedLang = lang;
    this.translate.setDefaultLang(this.selectedLang.lang);
  }
  setBrowserLanguage() {
    let browserLanguage = this.translate.getBrowserLang();
    this.langList.forEach(language => {
        if(language.lang == browserLanguage ){
          this.setDefaultLang(language);
        }
    });
  }

  changeLanguage(element){
    this.translate.setDefaultLang(this.selectedLang.lang);
  }

}
