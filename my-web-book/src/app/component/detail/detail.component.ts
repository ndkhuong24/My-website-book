import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from '../../service/comic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private comicId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicId = id !== null ? +id : 0;

    this.comicService.getDetailBtComicID(this.comicId).subscribe((response) => {
      console.log(response.data);
    });

    this.comicService.getById(this.comicId).subscribe((response) => {
      console.log(response);
    });

  }
}