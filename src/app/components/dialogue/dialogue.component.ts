import { Component, OnInit } from '@angular/core';
import { DialogueService } from 'src/app/services/dialogue.service';
import { Dialogue } from 'src/app/model/Dialogue';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  currentDialogue: Dialogue | null = null;

  constructor(private dialogueService: DialogueService) {
    this.dialogueService.currentDialogue.subscribe(dialogue => {
      this.currentDialogue = dialogue;

      if (dialogue) {
        setTimeout(() => this.dialogueService.clearDialogue(), 4000); 
      }
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getAlertClass(type: string): string {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-secondary';
    }
  }

  closeDialogue(): void {
    this.dialogueService.clearDialogue();
  }
  

}
