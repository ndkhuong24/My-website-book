import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../service/comic.service';
import { TranslateService } from '../../service/translate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private comicId: number = 0;

  public comic: any = {};
  public comicDetail: any = [];

  public comicTags: any = [];
  public comicArtists: any = [];
  public comicCharacters: any = [];
  public comicGroups: any = [];
  public comicLanguages: any = [];
  public comicCategories: any = [];
  public comicParodies: any = [];

  public translatedText: string = '';

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicId = id !== null ? +id : 0;

    this.comicService.getDetailBtComicID(this.comicId).subscribe((response) => {
      this.comicDetail = response.data;
    });

    this.comicService.getById(this.comicId).subscribe((response) => {
      this.comic = response;

      this.comicTags = response.tags;
      this.comicArtists = response.artists;
      this.comicCharacters = response.characters;
      this.comicGroups = response.groups;
      this.comicLanguages = response.languages;
      this.comicCategories = response.category;
      this.comicParodies = response.parodies;
    });
  }

  onRadioButtonSelectTags(_t13: any) {
    console.log(_t13);
  }

  onRadioButtonSelectArtist(arg0: any) {
    console.log(arg0);
  }

  onRadioButtonSelectCharacter(arg0: any) {
    console.log(arg0);
  }

  onRadioButtonSelectGroup(arg0: any) {
    console.log(arg0);
  }

  onRadioButtonSelectLanguage(arg0: any) {
    console.log(arg0);
  }

  onRadioButtonSelectParody(arg0: any) {
    console.log(arg0);
  }

  onRadioButtonSelectCategory(arg0: any) {
    console.log(arg0);
  }
}