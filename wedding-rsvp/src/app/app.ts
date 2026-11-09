
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <header class="hero">
      <div class="ganesha">ॐ</div>
      <p class="eyebrow">TOGETHER WITH OUR FAMILIES</p>
      <h1>Sreekar <span>&</span><br />Indusree</h1>
      <div class="flourish">✦ ❀ ✦</div>
      <p class="invitation">
        We joyfully invite you to celebrate our wedding
        and share in the beginning of our forever.
      </p>
      <h2>February 19 & 20, 2027</h2>
      <p class="place">ALLEN · TEXAS</p>
      <a class="hero-button" href="#rsvp">KINDLY RSVP</a>
    </header>

    <section class="blessing">
      <div class="deity">॥ श्री गणेशाय नमः ॥  ॐ सद्गुरु ॥</div>
      <p>With the blessings of Lord Ganesha and Lord Venkateswara</p>
      <p>we invite you to be part of our special celebrations.</p>
    </section>

    <section class="celebrations">
      <p class="eyebrow">SAVE THE DATES</p>
      <h2>Our Wedding Celebrations</h2>
      <p class="section-intro">Two beautiful days filled with traditions, music and memories.</p>

      <div class="event-grid">
        <article class="event-card">
        <div class="event-icon">
        <img src="images/haldi-ghibli.jpg" alt="Our Haldi celebration" />
      </div>
          <p class="event-date">FEBRUARY 19 · MORNING</p>
          <h3>Haldi</h3>
          <p>A morning of turmeric, blessings and joyful traditions.</p>
          <a class="venue" href="https://www.google.com/maps?q=3712+Highland+Bayou+Dr,+Prosper,+TX+75078" target="_blank" rel="noopener noreferrer">
  3712 Highland Bayou Dr, Prosper, TX 75078
</a>
        </article>

        <article class="event-card">
  <div class="event-icon">
  <img src="images/PelliKodukuPelliKuthuruGibhili.jpeg" alt="Our Sangeeth celebration" />
  </div>

  <p class="event-date">FEBRUARY 19 · AFTERNOON</p>
  <h3>Pellikoduku & Pellikuthuru</h3>
  <p>
    A beautiful Telugu pre-wedding tradition celebrating the bride
    and groom with blessings, family customs and joyful moments.
  </p>
  <a class="venue" href="https://www.google.com/maps?q=3712+Highland+Bayou+Dr,+Prosper,+TX+75078" target="_blank" rel="noopener noreferrer">
  3712 Highland Bayou Dr, Prosper, TX 75078
</a>
</article>

        <article class="event-card">
        <div class="event-icon">
        <img src="images/sangeeth-ghibli.jpg" alt="Our Sangeeth celebration" />
      </div>
          <p class="event-date">FEBRUARY 19 · EVENING</p>
          <h3>Sangeeth</h3>
          <p>An evening of music, dance and celebration.</p>
          <a class="venue" href="https://www.google.com/maps?q=351+Southwind+Ln,+Fairview,+TX+75069" target="_blank" rel="noopener noreferrer">
  351 Southwind Ln, Fairview, TX 75069
</a>
        </article>

        <article class="event-card">
        <div class="event-icon wedding-event-image">
  <img
    src="images/marriage-ghibli.jpg"
    alt="Our complete South Indian wedding ceremony"
  />
</div>
          <p class="event-date">FEBRUARY 20 · MORNING</p>
          <h3>Wedding</h3>
          <p>Join us as we begin our beautiful journey together.</p>
          <a class="venue" href="https://www.google.com/maps?q=351+Southwind+Ln,+Fairview,+TX+75069" target="_blank" rel="noopener noreferrer">
  351 Southwind Ln, Fairview, TX 75069
</a>
        </article>
      </div>
    </section>

    <section class="rsvp-section" id="rsvp">
      <p class="eyebrow">YOUR PRESENCE IS OUR PRESENT</p>
      <h2>Kindly Respond</h2>
      <p class="section-intro">Please let us know if you can join our celebrations.</p>

      <form #rsvpForm="ngForm" (ngSubmit)="submitRsvp(rsvpForm)">
        <label for="guestName">Full name *</label>
        <input
          id="guestName"
          name="guestName"
          [(ngModel)]="form.guestName"
          required
          placeholder="Your full name"
        />

        <label for="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          [(ngModel)]="form.email"
          email
          placeholder="Your email address"
        />

        <label>Will you be joining us? *</label>
        <div class="radio-options">
          <label>
            <input type="radio" name="attending" value="Yes"
              [(ngModel)]="form.attending" required />
            Joyfully accept
          </label>
          <label>
            <input type="radio" name="attending" value="No"
              [(ngModel)]="form.attending" required />
            Regretfully decline
          </label>
        </div>

        @if (form.attending === 'Yes') {
          <label for="numberOfGuests">Number of guests including yourself *</label>
          <select id="numberOfGuests" name="numberOfGuests"
            [(ngModel)]="form.numberOfGuests" required>
            <option [ngValue]="1">1 guest</option>
            <option [ngValue]="2">2 guests</option>
            <option [ngValue]="3">3 guests</option>
            <option [ngValue]="4">4 guests</option>
            <option [ngValue]="5">5 guests</option>
            <option [ngValue]="6">6 guests</option>
            <option [ngValue]="7">7 guests</option>
            <option [ngValue]="8">8 guests</option>
          </select>

          <label>Which celebrations will you attend?</label>
          <div class="event-options">
            <label><input type="checkbox" name="haldi"
              [(ngModel)]="form.haldi" /> Haldi</label>
            <label><input type="checkbox" name="sangeeth"
              [(ngModel)]="form.sangeeth" /> Sangeeth</label>
            <label><input type="checkbox" name="wedding"
              [(ngModel)]="form.wedding" /> Wedding</label>
          </div>
        }

        <label for="message">Your wishes for the couple</label>
        <textarea id="message" name="message" rows="4"
          [(ngModel)]="form.message"
          placeholder="Write us a little message..."></textarea>

        <button type="submit" [disabled]="submitting || rsvpForm.invalid">
          {{ submitting ? 'Submitting...' : 'Send My RSVP' }}
        </button>

        @if (status) {
          <p class="status" [class.error]="isError">{{ status }}</p>
        }
      </form>
    </section>

    <footer>
      <div class="flourish">✦ ❀ ✦</div>
      <h2>Sreekar & Indu Sree</h2>
      <p>With love, we look forward to celebrating with you.</p>
      <p class="footer-date">FEBRUARY 19–20, 2027</p>
    </footer>
  `
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
        ? this.form.numberOfGuests : 0
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
