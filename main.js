
const accessKey = "_PKB_th8g6vXYkC6XwEIRSHKnLM1RN4NJn0DX4gvGGk";
const secretKey = "n-ghupHX254qq5TpU11tWhV7nExQzosb61Jm_GNCYpc"
const count = 9;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
let galleryContainer = document.querySelector('.gallery__container');
const body = document.querySelector('body');
const loader = document.querySelector('.loader');
const changeGrid = document.querySelector('.header__grid');
changeGrid.addEventListener('click', () => {
	body.classList.toggle('grid')
})
const backTop = document.querySelector('.back-top');
const loadImages = () => {
	loader.style.display = "grid";
	fetch(apiUrl)
		.then((res) => {
			return res.json();
		})
		.then(data => {
			const photos = data;
			addImagesToGallery(photos);
			loader.style.display = "none";
		})
		.catch(err => {
			console.log(err);
		});
};
const addImagesToGallery = photos => {
	photos.forEach(photo => {
		let el = document.createElement("div");
		el.classList.add('gallery__item');
		el.classList.add(`${photo.id}`)
		el.innerHTML =
			`<a class="gallery__link" href="#">
                    <img class="gallery__image" src="${photo.urls.regular}"
                        alt="${photo.alt_description}">
                    <div class="gallery__overlay">
                        <div class="gallery__profile">
                            <img class="gallery__avatar"
                                src="${photo.user.profile_image.medium}">
                            <span class="gallery__user">@${photo.user.username}</span>
                        </div>
                        <div class="gallery__stats">
                            <div class="gallery__likes">
                                <i class="fas fa-heart"></i>
                                <span class="gallery__likes-num">${photo.likes}</span>
                            </div>
                            <div class="gallery__downloads">
                                <i class="fas fa-cloud-download-alt"></i>
                                <span class="gallery__download-num">${photo.downloads}</span>
                            </div>
                        </div>
                    </div>
                </a>`;

		el.addEventListener('click', (e) => {
			e.preventDefault();
			const content = photos.find(img => img.id === el.classList[1])
			openModal(content)
		})
		galleryContainer.appendChild(el);
		function openModal(content) {
			const modal = document.querySelector('.popup');
			modal.classList.add('showModal');
			document.body.classList.toggle('lock-scroll');
			backTop.style.display = 'none'
			modal.innerHTML =
				`
			<button type="button" class="popup__close">
			<i class="fas fa-times"></i>
			</button>
			<div class="popup__content">
			<div class="popup__info">
				<div class="popup__profile">
				<div class="popup__avatar-info">
					<img class="popup__avatar"
						src="${content.user.profile_image.medium}">
					<div>
						<span class="popup__name">${content.user.name}</span>
						<span class="popup__user">@${content.user.username}</span>
					</div>
				</div>	
					<a href="${content.user.links.portfolio}" target="_blank" class="popup__portfolio">Check out my portfolio</a>
				</div>
				<div class="popup__profile-social">
					<a class="popup__profile-social-link" href="https://www.instagram.com/${content.user.instagram_username}" target="_blank">
						<i class="fab fa-instagram-square"></i>
						<span class="instagram-profile">${content.user.instagram_username}</span>
					</a>
					<a class="popup__profile-social-link" href="https://www.twitter.com/${content.user.twitter_username}" target="_blank">
						<i class="fab fa-twitter-square"></i>
						<span class="twitter-profile">${content.user.twitter_username}</span>
					</a>
					<a class="popup__profile-social-link" href="${content.links.html}" target="_blank">
						<i class="fab fa-unsplash"></i>
						<span class="unsplash">See it on Unsplash</span>
					</a>
				</div>
			</div>
			<div class="popup__image-container">
				<div class="popup__image-box">
					<img class="popup__image"
						src="${content.urls.regular}"
						alt="${content.alt_description}">
				</div>
				<div class="popup__stats">
					<div class="popup__likes">
						<i class="fas fa-heart"></i>
						<span class="popup__likes-num">${content.likes}</span>
					</div>
					<div class="popup__downloads">
						<i class="fas fa-cloud-download-alt"></i>
						<span class="popup__download-num">${content.downloads}</span>
					</div>
				</div>
				<p class="popup__desc">${content.alt_description}</p>
			</div>
		</div>
			`
			let popupPort = document.querySelectorAll('.popup__portfolio');
			popupPort.forEach(port => {
				if (content.user.portfolio_url === null) {
					port.style.display = 'none'
					port.style.pointerEvents = "none"
				}
			})
			let popupDesc = document.querySelectorAll('.popup__desc');
			popupDesc.forEach(desc => {
				if (content.alt_description === null) {
					desc.style.display = 'none';
				}
			})
			let twitters = document.querySelectorAll('.twitter-profile');
			twitters.forEach(twitter => {
				if (content.user.twitter_username === null) {
					twitter.style.display = 'none';
					twitter.parentNode.style.pointerEvents = "none"
				}
			})
			let instagrams = document.querySelectorAll('.instagram-profile');
			instagrams.forEach(instagram => {
				if (content.user.instagram_username === null) {
					instagram.style.display = 'none';
					instagram.parentNode.style.pointerEvents = "none"
				}
			})
			const popupClose = document.querySelector('.popup__close');
			popupClose.addEventListener('click', () => {
				modal.classList.remove('showModal');
				document.body.classList.toggle('lock-scroll')
				backTop.style.display = 'block'
			});
			window.addEventListener('keyup', (e) => {
				e.preventDefault();
				if (e.key == 'Escape') { modal.classList.remove('showModal') }
			});
		};
	});
};
window.addEventListener('scroll', function () {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
		loadImages();
	}
});
loadImages();