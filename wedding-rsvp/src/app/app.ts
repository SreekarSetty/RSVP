
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private readonly endpoint =
    'https://script.google.com/macros/s/AKfycbwNu2QPgMEIrIqvQktEYwHk-3C-O4N9BhfghH-8mf_GMdplDfkHm9p38YG6gZk60qlT/exec';

  submitting = false;
  status = '';
  isError = false;

  form = this.emptyForm();

  private emptyForm() {
    return {
      guestName: '',
      email: '',
      attending: 'Yes',
      numberOfGuests: 1,
      haldi: false,
      sangeeth: false,
      wedding: true,
      message: ''
    };
  }

  async submitRsvp(formDirective: any) {
    if (formDirective.invalid || this.submitting) return;

    this.submitting = true;
    this.status = '';
    this.isError = false;

    const payload = {
      ...this.form,
      numberOfGuests: this.form.attending === 'Yes'
        ? this.form.numberOfGuests
        : 0
    };

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      this.status =
        'Your RSVP request was sent. The browser cannot verify the Google Sheets response yet.';

      this.form = this.emptyForm();
      formDirective.resetForm(this.form);

    } catch {
      this.isError = true;
      this.status = 'Unable to send your RSVP. Please try again.';

    } finally {
      this.submitting = false;
    }
  }
}
