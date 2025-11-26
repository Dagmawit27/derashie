import { supabase } from './supabase.js'

export function HomePage() {
  return `
    <div class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Derashie Girl's and Young Women's Association</h1>
          <p>Building brighter futures through education, protection, and opportunity. In partnership with Plan International.</p>
          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <a href="#volunteer" class="btn btn-primary">Become a Volunteer</a>
            <a href="#programs" class="btn btn-secondary">Our Programs</a>
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Our Mission</h2>
          <p>We are committed to creating lasting change in the lives of children and women through comprehensive support programs.</p>
        </div>
        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">📚</div>
            <h3>Education for All</h3>
            <p>Ensuring every child, especially girls, has access to quality education and the opportunity to reach their full potential.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">🛡️</div>
            <h3>Child Protection</h3>
            <p>Creating safe environments where children can grow up free from violence, exploitation, and abuse.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">💪</div>
            <h3>Women's Empowerment</h3>
            <p>Supporting women through skills training, economic opportunities, and leadership development programs.</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Lives Impacted</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">25+</div>
            <div class="stat-label">Communities Served</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Active Programs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Volunteers</div>
          </div>
        </div>
      </div>
    </section>
  `
}

export function AboutPage() {
  return `
    <div class="hero" style="padding: 80px 0 60px;">
      <div class="container">
        <div class="hero-content">
          <h1>About Derashie Girl's and Young Women's Association</h1>
          <p>Partnering with Plan International to create lasting change</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Our Story</h2>
          <p>Derashie Girl's and Young Women's Association is a non-profit organization dedicated to improving the lives of children and women in underserved communities. Working in partnership with Plan International, we implement comprehensive programs that address education, protection, health, and economic empowerment.</p>
        </div>

        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To empower children and women to break the cycle of poverty and build sustainable futures through education, protection, and opportunity.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">👁️</div>
            <h3>Our Vision</h3>
            <p>A world where every child and woman has the opportunity to reach their full potential and live a life of dignity and purpose.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">❤️</div>
            <h3>Our Values</h3>
            <p>Respect, integrity, empowerment, collaboration, and a commitment to creating lasting positive change in communities.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--bg-light);">
      <div class="container">
        <div class="section-title">
          <h2>Our Team</h2>
          <p>Dedicated professionals working together to create impact</p>
        </div>
        <div class="team-grid">
          <div class="team-member">
            <div class="team-photo">SA</div>
            <div class="team-name">Sarah Anderson</div>
            <div class="team-role">Executive Director</div>
          </div>
          <div class="team-member">
            <div class="team-photo">MJ</div>
            <div class="team-name">Michael Johnson</div>
            <div class="team-role">Program Director</div>
          </div>
          <div class="team-member">
            <div class="team-photo">EC</div>
            <div class="team-name">Emily Chen</div>
            <div class="team-role">Education Coordinator</div>
          </div>
          <div class="team-member">
            <div class="team-photo">DW</div>
            <div class="team-name">David Williams</div>
            <div class="team-role">Community Outreach Manager</div>
          </div>
        </div>
      </div>
    </section>
  `
}

export async function ProgramsPage() {
  const { data: programs, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching programs:', error)
    return '<div class="container"><p>Error loading programs</p></div>'
  }

  const categories = ['All', ...new Set(programs.map(p => p.category))]

  return `
    <div class="hero" style="padding: 80px 0 60px;">
      <div class="container">
        <div class="hero-content">
          <h1>Our Programs</h1>
          <p>Comprehensive initiatives supporting children and women</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="programs-filters">
          ${categories.map((cat, i) => `
            <button class="filter-btn ${i === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>
          `).join('')}
        </div>

        <div class="programs-grid">
          ${programs.map(program => `
            <div class="program-card" data-category="${program.category}">
              <img src="${program.image_url}" alt="${program.title}" class="program-image">
              <div class="program-content">
                <span class="program-category">${program.category}</span>
                <h3>${program.title}</h3>
                <p>${program.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

export async function StoriesPage() {
  const { data: stories, error } = await supabase
    .from('news_stories')
    .select('*')
    .order('published_date', { ascending: false })

  if (error) {
    console.error('Error fetching stories:', error)
    return '<div class="container"><p>Error loading stories</p></div>'
  }

  return `
    <div class="hero" style="padding: 80px 0 60px;">
      <div class="container">
        <div class="hero-content">
          <h1>Success Stories & News</h1>
          <p>Inspiring stories of transformation and community impact</p>
        </div>
      </div>
    </div>

    <section class="section" id="stories">
      <div class="container">
        <div class="stories-grid">
          ${stories.map(story => `
            <div class="story-card" data-story-id="${story.id}">
              <img src="${story.image_url}" alt="${story.title}" class="story-image">
              <div class="story-content">
                <div class="story-meta">
                  <span class="story-type ${story.category}">${story.category === 'success_story' ? 'Success Story' : 'News'}</span>
                  <span class="story-date">${formatDate(story.published_date)}</span>
                </div>
                <h3>${story.title}</h3>
                <p class="story-excerpt">${story.excerpt}</p>
                <span class="read-more">Read more →</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}

export async function StoryDetailPage(storyId) {
  const { data: story, error } = await supabase
    .from('news_stories')
    .select('*')
    .eq('id', storyId)
    .maybeSingle()

  if (error || !story) {
    return '<div class="container"><p>Story not found</p></div>'
  }

  return `
    <section class="section">
      <div class="container">
        <div class="story-detail">
          <a href="#stories" class="back-btn">← Back to Stories</a>
          <img src="${story.image_url}" alt="${story.title}" class="story-detail-image">
          <div class="story-detail-content">
            <div class="story-meta">
              <span class="story-type ${story.category}">${story.category === 'success_story' ? 'Success Story' : 'News'}</span>
              <span class="story-date">${formatDate(story.published_date)}</span>
            </div>
            <h1>${story.title}</h1>
            ${story.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
          </div>
        </div>
      </div>
    </section>
  `
}

export function VolunteerPage() {
  return `
    <div class="hero" style="padding: 80px 0 60px;">
      <div class="container">
        <div class="hero-content">
          <h1>Become a Volunteer</h1>
          <p>Join our community of changemakers</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="form-section">
          <div class="section-title">
            <h2>Volunteer Signup</h2>
            <p>Fill out the form below to express your interest in volunteering with us. We'll get in touch with you soon!</p>
          </div>

          <div id="volunteer-message"></div>

          <form id="volunteer-form">
            <div class="form-group">
              <label for="full_name">Full Name *</label>
              <input type="text" id="full_name" name="full_name" required>
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone">
            </div>

            <div class="form-group">
              <label for="interest_area">Area of Interest</label>
              <select id="interest_area" name="interest_area">
                <option value="">Select an area</option>
                <option value="Education">Education</option>
                <option value="Children">Child Protection</option>
                <option value="Women">Women's Empowerment</option>
                <option value="Health">Healthcare</option>
                <option value="Admin">Administrative Support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Tell us about yourself</label>
              <textarea id="message" name="message" placeholder="Share your interests, skills, and why you want to volunteer..."></textarea>
            </div>

            <button type="submit" class="btn btn-cta" style="width: 100%;">Submit Application</button>
          </form>
        </div>
      </div>
    </section>
  `
}

export function ContactPage() {
  return `
    <div class="hero" style="padding: 80px 0 60px;">
      <div class="container">
        <div class="hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="form-section">
          <div class="section-title">
            <h2>Send us a Message</h2>
            <p>We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.</p>
          </div>

          <div id="contact-message"></div>

          <form id="contact-form">
            <div class="form-group">
              <label for="contact_name">Name *</label>
              <input type="text" id="contact_name" name="name" required>
            </div>

            <div class="form-group">
              <label for="contact_email">Email *</label>
              <input type="email" id="contact_email" name="email" required>
            </div>

            <div class="form-group">
              <label for="contact_phone">Phone Number</label>
              <input type="tel" id="contact_phone" name="phone">
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input type="text" id="subject" name="subject" required>
            </div>

            <div class="form-group">
              <label for="contact_message">Message *</label>
              <textarea id="contact_message" name="message" required placeholder="Your message..."></textarea>
            </div>

            <button type="submit" class="btn btn-cta" style="width: 100%;">Send Message</button>
          </form>

          <div class="contact-info">
            <h3>Contact Information</h3>
            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <strong>Address:</strong><br>
                  123 Hope Street, Community Center<br>
                  City, State 12345
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div>
                  <strong>Phone:</strong><br>
                  +1 (555) 123-4567
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div>
                  <strong>Email:</strong><br>
                  info@hopefoundation.org
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">🕐</div>
                <div>
                  <strong>Office Hours:</strong><br>
                  Monday - Friday: 9:00 AM - 5:00 PM<br>
                  Saturday: 10:00 AM - 2:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}


// pages.js

// ... (HomePage, AboutPage, ProgramsPage, StoriesPage, StoryDetailPage, 
//        VolunteerPage, ContactPage remain the same)

// REMOVED: export async function BlogPage() { ... }
// REMOVED: export async function BlogDetailPage(postId) { ... }

// --- New Gallery Page ---

// Sample gallery images for a quick start
const galleryImages = [
    { url: './image/photo_1.jpg', alt: 'Women in a training session' },
    { url: './image/photo_3.jpg', alt: 'Girl studying outside' },
    { url: './image/photo_4.jpg', alt: 'Children smiling in school' },
    { url: './image/photo_8.jpg', alt: 'Community workshop' },
    { url: './image/photo_9.jpg', alt: 'Adult and child bonding' },
    { url: './image/photo_12.jpg', alt: 'Community workshop' },
    { url: './image/photo_2.jpg', alt: 'Community workshop' },
];

export async function GalleryPage() {
    // You could fetch image URLs from a Supabase table here if you create one!
    // For now, we use a local array.

    return `
        <div class="hero" style="padding: 80px 0 60px;">
          <div class="container">
            <div class="hero-content">
              <h1>Our Photo Gallery</h1>
              <p>Moments of impact, community, and empowerment.</p>
            </div>
          </div>
        </div>

        <section class="section">
          <div class="container">
            <div class="gallery-grid">
              ${galleryImages.map(image => `
                <div class="gallery-item">
                  <img src="${image.url}" alt="${image.alt}">
                  <div class="gallery-overlay">${image.alt}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
    `;
}
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
