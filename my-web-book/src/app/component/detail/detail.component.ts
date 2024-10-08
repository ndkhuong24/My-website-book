import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../service/comic.service';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private comicId: number = 0;

  public comic: any = {};
  public comicDetail: any = [];

  public translatedText: string = '';

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicId = id !== null ? +id : 0;

    this.comicService.getDetailBtComicID(this.comicId).subscribe((response) => {
      console.log(response.data);
      this.comicDetail = response.data;
    });

    this.comicService.getById(this.comicId).subscribe((response) => {
      console.log(response);
      this.comic = response;
    });
  }
}