import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../service/comic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public comics: any[] = [];

  public numberPages: number = 0;

  constructor(
    private comicService: ComicService,
  ) { }

  ngOnInit(): void {
    this.comicService.getAllComic().subscribe((data) => {
      this.comics = data;

      // Lặp qua data để lấy ID của từng phần tử và log ra từng ID
      data.forEach((comic: any) => {
        this.comicService.getDetailBtComicID(comic.id).subscribe((detail) => {
          this.numberPages = detail.data.length;
        });
      });
    });
  }
}
