import { Component, Input, Output, OnInit } from '@angular/core';
import { Score } from '../models/score.model'
import "../../../node_modules/p5/lib/addons/p5.dom";
import * as p5 from 'p5';



@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})

export class ScoreComponent implements OnInit {
  score: Score = new Score();
  currentTime = new Date();
  displayScore: number = this.score.points;
  displayLevel: number = this.score.level;
  displayLines: number = this.score.lines;

  constructor() {}

  ngOnInit() {
  }



}
