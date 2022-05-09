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
  heroName: string;
  heroSeries: any;
  heroEvents: any;
  heroThumbnail: string;
  totalResults: any;
  pages: any;
  oldPageNumber: any = '1';
  oldValueString: HTMLDivElement;

  constructor(private characterService: CharacterApiService) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this.characterService.getCharacters(this.offset).subscribe(data => {
      this.heroes = data.results;
      this.totalResults = data.total;
      this.pages = Math.ceil(this.totalResults/10); //número total de resultados divido pela quantia de resultados por página, arredondados para cima.
      this.pageButtons = Array.from(Array(this.pages).keys(), x => x+1);
    });
    let paginationButtons: HTMLDivElement = document.querySelector("#paginationButtons")!;
    paginationButtons.style.display = 'block';
  }

  getPaginationContent(value: any) {
    let valueString = value as HTMLDivElement;
    let pageNumber = Number(valueString.innerHTML);
    if (pageNumber == 1){
      this.offset = '0'
    } else {
      this.offset = String((pageNumber-1)*10);
    }
    this.characterService.getCharacters(this.offset).subscribe(data => {
      this.heroes = data.results;
    });

    if (pageNumber < this.oldPageNumber) {
      this.rollLeft();
      this.oldPageNumber = pageNumber;
    } else if (pageNumber > this.oldPageNumber) {
      this.rollRight();
      this.oldPageNumber = pageNumber;
    }
  }

  rollRight() {
    let contentDiv = document.querySelector('#paginationButtons')!;
    contentDiv.scrollLeft += 52;
  }

  rollLeft() {
    let contentDiv = document.querySelector('#paginationButtons')!;
    contentDiv.scrollLeft += -52;
  }

  search() {
    let searchInput: HTMLInputElement = document.querySelector("#search-input")!;
    let searchString = searchInput.value;
    this.characterService.getCharacters('0', searchString).subscribe(data => {
      if (data.results.length > 0) {
        let paginationButtons: HTMLDivElement = document.querySelector("#paginationButtons")!;
        paginationButtons.style.display = 'none';
        this.heroes = data.results;
      }
    });
  }

  resetTable(){
    let searchInput: HTMLInputElement = document.querySelector("#search-input")!;
    if (searchInput.value == '') {
      this.getAllCharacters();
    }
  }
  
  openModal(heroname: string, heroseries: any, heroevents: any, herothumbnail: string) {
    let modal: HTMLDivElement = document.querySelector(".modal")!;
    modal.style.display = 'block'
    this.heroName = heroname;
    this.heroSeries = heroseries;
    this.heroEvents = heroevents;
    this.heroThumbnail = herothumbnail;
  }

  closeModal() {
    let modal: HTMLDivElement = document.querySelector(".modal")!;
    modal.style.display = 'none';
  }

}
