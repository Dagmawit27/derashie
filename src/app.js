import { StoriesPage, StoryDetailPage } from './pages.js';


const app = document.getElementById('app'); // The container for all pages

// Render the stories list
export async function renderStoriesPage() {
  const html = await StoriesPage();
  app.innerHTML = html;

  // Make each story card clickable
  document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('click', () => {
      const storyId = card.dataset.storyId;
      renderStoryDetailPage(storyId);
    });
  });
}

// Render a single story detail page
export async function renderStoryDetailPage(storyId) {
  const html = await StoryDetailPage(storyId);
  app.innerHTML = html;

  // Make the back button work
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderStoriesPage();
    });
  }
}
