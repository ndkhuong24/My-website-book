import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../service/comic.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comicService.getAllComic().subscribe((data) => {
      this.comics = data;

      data.forEach((comic: any) => {
        this.comicService.getDetailByComicID(comic.id).subscribe((detail) => {
          this.numberPages = detail.data.length;
        });
      });
    });
  }

  onCardClick(comic: any) {
    this.router.navigate([`/gallery/${comic.id}`]);
  }
}
