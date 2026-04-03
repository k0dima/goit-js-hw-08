console.log("Gallery script is running!");
const images = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/orchids-4202820__480.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/orchids-4202820_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const createCard = ({ preview, original, description }) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          width="100%"
          height="200px"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};

let currentIndex = 0;
let instance = null;

const onKeyPress = (event) => {
  if (event.code === "Escape") {
    instance.close();
    return;
  }

  if (event.code === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  if (event.code === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }
};

const updateLightbox = () => {
  const content = instance.element().querySelector(".modal-content");
  const { original, description } = images[currentIndex];
  content.innerHTML = `<img class="image" src="${original}" alt="${description}" width="800" height="600">`;
};

const openLightbox = (index) => {
  currentIndex = index;
  const { original, description } = images[currentIndex];

  instance = window.basicLightbox.create(
    `
    <div class="modal-wrapper">
      <button class="nav-btn prev" aria-label="Previous image">❮</button>
      <div class="modal-content">
        <img class="image" src="${original}" alt="${description}" width="800" height="600">
      </div>
      <button class="nav-btn next" aria-label="Next image">❯</button>
    </div>
  `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onKeyPress);
        const prevBtn = instance.element().querySelector(".prev");
        const nextBtn = instance.element().querySelector(".next");

        prevBtn.onclick = () => {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateLightbox();
        };

        nextBtn.onclick = () => {
          currentIndex = (currentIndex + 1) % images.length;
          updateLightbox();
        };
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeyPress);
      },
    },
  );

  instance.show();
};

const galleryList = document.querySelector(".gallery");

galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName === "IMG") {
    const source = target.dataset.source;
    const index = images.findIndex((img) => img.original === source);
    openLightbox(index);
  }
});

const galleryMarkup = images.map(createCard).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
