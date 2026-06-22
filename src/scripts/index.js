import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import '../styles/main.scss';
import 'swiper/css';
import 'swiper/css/navigation';

window.addEventListener('load', () => {
	const swiperReviews = new Swiper('.reviews__swiper', {
		modules: [Navigation],
		direction: 'horizontal',
		loop: true,
		grabCursor: true,
		initialSlide: 1,
		freeMode: true,
		scrollbar: false,
		navigation: {
			nextEl: '.reviews__btn--next',
			prevEl: '.reviews__btn--prev',
			addIcons: true,
		},

		spaceBetween: 16,
		slidesPerView: 1,
		watchSlidesProgress: true,

		breakpoints: {
			1440: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

	const swiper = new Swiper('.products__swiper', {
		direction: 'horizontal',
		// loop: true,
		grabCursor: true,

		freeMode: true,
		scrollbar: false,
		navigation: false,
		slidesOffsetBefore: 16,

		spaceBetween: 16,
		slidesPerView: 1.82,

		breakpoints: {
			1440: {
				slidesOffsetBefore: 0,
				slidesPerView: 4,
				spaceBetween: 20,
			},
		},
	});

	(() => {
		const bar = document.querySelector('.js-announcement-bar');
		const closeBarBtn = document.querySelector('.js-bar-btn');

		const closeBar = (e) => {
			bar.classList.add('invisible');
		};

		closeBarBtn.addEventListener('click', closeBar);
	})();

	(() => {
		const openBtn = document.querySelector('.js-open-menu');
		const closeBtn = document.querySelector('.js-close-menu');
		const backdrop = document.querySelector('.js-menu-backdrop');

		const openMenu = () => {
			backdrop.classList.add('is-open');
			document.body.style.overflow = 'hidden';
		};

		const closeMenu = () => {
			backdrop.classList.remove('is-open');
			document.body.style.overflow = '';
		};

		backdrop.addEventListener('click', ({ target, currentTarget }) => {
			if (target === currentTarget) {
				closeMenu();
			}
		});

		openBtn.addEventListener('click', openMenu);
		closeBtn.addEventListener('click', closeMenu);
	})();
});
