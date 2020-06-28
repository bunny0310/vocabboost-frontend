import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HelpersService } from '../helpers.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {

  constructor(private APIService: APIServiceService,
    public helpersService: HelpersService, public breakpointObserver: BreakpointObserver) { }
    words: [] = [];
    wordsDisplay: any = [];
    message = '';
    pageSize = 5;
    pageIndex = 0;
    searchKeyword = '';
    searchType = '';
    showContainer = false;
    dataSource = new MatTableDataSource(this.words);
    wordsSub: Subscription;
    displayedColumns: string[] = ['name', 'meaning', 'sentence', 'types', 'tags', 'synonyms'];
    @Output()
    page: EventEmitter<PageEvent>;
    ngOnInit() {
      this.APIService.getWords('');
      this.helpersService.loading = true;
      this.APIService.getWordsUpdateListener()
      .subscribe(response => {
        this.words = response.data;
        console.log(response.data.length);
        console.log(response.data);
        const arr: [] = [];
        for (let word of this.words) {
            arr.push(word);
        }
        // if (arr.length < 5) {
        //   this.message = 'You need to have atleast 5 words in your dictionary';
        // } else {
        //   this.message = '';
        // }
        this.dataSource.data = this.setWords();
        this.helpersService.loading = false;
      });
      this.breakpointObserver
      .observe(['(max-width: 1150px)', '(max-height:600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
        } else {
          this.showContainer = false;
        }
      });
    }

    setWords() {
      const prod = (this.pageIndex * this.pageSize);
      const length = this.words.length;
      const end = (length >= prod + this.pageSize) ? prod + this.pageSize : length ;
      return this.words.slice(prod, end);
    }
    onPageFired(event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.dataSource = new MatTableDataSource(this.setWords());
      console.log(this.setWords.length);
    }

    search() {
        this.dataSource = new MatTableDataSource(this.applyFilters(this.searchKeyword, this.searchType));
    }

    applyFilters(keyword, type) {
      if (keyword === '') {
        return this.setWords();
      }
      this.APIService.getWords('search', keyword, type);
      this.helpersService.loading = true;
      this.APIService.getWordsUpdateListener()
      .subscribe(response => {
        this.words = response.data;
        console.log(response.data.length);
        console.log(response.data);
        const arr: [] = [];
        for (let word of this.words) {
            arr.push(word);
        }
        // if (arr.length < 5) {
        //   this.message = 'You need to have atleast 5 words in your dictionary';
        // } else {
        //   this.message = '';
        // }
        this.helpersService.loading = false;
        return arr;
      });
      return this.setWords();
    }

}

