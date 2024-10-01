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

  constructor(
    private comicService: ComicService,
  ) { }

  ngOnInit(): void {
    this.comicService.getAllComic().subscribe((data) => {
      this.comics = data;
    });
  }
}
