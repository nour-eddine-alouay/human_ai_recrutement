import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.css']
})
export class ShareButtonsComponent implements OnInit{
  customUrl!: string
  constructor(
    public dialogRef: MatDialogRef<ShareButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {link: string}
  ) { }

  ngOnInit(): void {
    this.customUrl = this.data.link
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
