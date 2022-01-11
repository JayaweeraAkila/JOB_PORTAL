import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import languages from "../../data/languages.json";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


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
