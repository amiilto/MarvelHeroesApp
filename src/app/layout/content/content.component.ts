import { Component, OnInit } from '@angular/core';
import { CharacterApiService } from 'src/app/services/api/character-api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  heroes: any;
  offset: any = '0'
  pageButtons: any;

  constructor(private characterService: CharacterApiService) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this.characterService.getCharacters(this.offset).subscribe(data => {
      this.heroes = data.results;
      let totalResults = data.total;
      let pages = Math.ceil(totalResults/10); //número total de resultados divido pela quantia de resultados por página, arredondados para cima.
      this.pageButtons = Array.from(Array(pages).keys(), x => x+1);
    });
  }

  getPaginationContent(value: any){
    let valueString = value as HTMLElement;
    let pageNumber = Number(valueString.innerHTML);
    if (pageNumber == 1){
      this.offset = '0'
    } else {
      this.offset = String((pageNumber-1)*10);
    }
    this.characterService.getCharacters(this.offset).subscribe(data => {
      this.heroes = data.results;
    });
  }  
}
