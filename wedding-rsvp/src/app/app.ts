
import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {

  private readonly endpoint =
    'https://script.google.com/macros/s/AKfycbwNu2QPgMEIrIqvQktEYwHk-3C-O4N9BhfghH-8mf_GMdplDfkHm9p38YG6gZk60qlT/exec';

  // Wedding background music
  @ViewChild('weddingMusic', { read: ElementRef })
  weddingMusic!: ElementRef<HTMLAudioElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {

    // Run audio playback only in the browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const audioElement = this.weddingMusic?.nativeElement;

    if (!audioElement || typeof audioElement.play !== 'function') {
      console.error('Wedding audio element is not available.');
      return;
    }

    audioElement.volume = 0.30;

    audioElement.play()
      .then(() => {
        console.log('Wedding background music started ❤️');
      })
      .catch((error: Error) => {
        console.log(
          'Browser blocked automatic music playback:',
          error.message
        );
      });
  }

  // RSVP form state
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
      pellikoduku: false,
      message: ''
    };
  }

  // Submit RSVP
  async submitRsvp(formDirective: any) {

    if (formDirective.invalid || this.submitting) {
      return;
    }

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
        'Your RSVP request was sent successfully.';

      this.form = this.emptyForm();
      formDirective.resetForm(this.form);

    } catch {

      this.isError = true;
      this.status =
        'Unable to send your RSVP. Please try again.';

    } finally {
      this.submitting = false;
    }
  }
}
