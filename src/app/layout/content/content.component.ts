import { Component, OnInit } from '@angular/core';
import { Observable, map} from 'rxjs';
import { CharacterApiService } from 'src/app/services/api/character-api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  heroes = new Array;
  columns = ["Personagem", "Séries", "Eventos"];
  offset: string = '30'

  constructor(private characterService: CharacterApiService) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this.characterService.getCharacters(this.offset).subscribe(result => {
      this.heroes = result; console.log(this.heroes); debugger
    });
  }
  
}
