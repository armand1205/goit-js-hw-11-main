import { fetchImages } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.searchQuery.value.trim();

  if (!searchQuery) return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  try {
    const data = await fetchImages(searchQuery, page);
    displayImages(data.hits);
    totalHits = data.totalHits;
    if (data.hits.length < 40 || data.hits.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadMoreBtn.style.display = 'block';
    }

    Notiflix.Notify.success(`We found ${totalHits} images.`);
    lightbox.refresh();
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    const data = await fetchImages(searchQuery, page);
    displayImages(data.hits);
    totalHits = data.totalHits;

    if (data.hits.length < 40 || data.hits.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    lightbox.refresh();
    scrollToNewImages();
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong. Please try again.');
  }
});

function displayImages(images) {
  const imageCards = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a href="${largeImageURL}" class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b>: ${likes}</p>
          <p class="info-item"><b>Views</b>: ${views}</p>
          <p class="info-item"><b>Comments</b>: ${comments}</p>
          <p class="info-item"><b>Downloads</b>: ${downloads}</p>
        </div>
      </a>
    `;
      }
    )
    .join('');

  gallery.innerHTML += imageCards;
}

const lightbox = new SimpleLightbox('.gallery a');

function scrollToNewImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
