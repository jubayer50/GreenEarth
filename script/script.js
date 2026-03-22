const categoriesBtnsContainer = document.getElementById(
  "category-btn-container",
);
const allTreesContainer = document.getElementById("all-trees-contaienr");
const loadingContainer = document.getElementById("loading-container");
const plantDetailModal = document.getElementById("plant_details_modal");

// modal
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");

async function loadCategory() {
  const url = "https://openapi.programming-hero.com/api/categories";

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);

  const btnCategorys = data.categories;

  // --------------------------------

  btnCategorys.forEach((category) => {
    // console.log(category);
    const btn = document.createElement("button");
    btn.className =
      "rounded-md py-1.5 border-1 border-[#15803D] text-[#15803D] w-full";
    btn.innerText = category.category_name;
    btn.onclick = () => selectCategoryBtn(category.id, btn);
    categoriesBtnsContainer.append(btn);
  });
}

loadCategory();

function showLoading() {
  allTreesContainer.innerHTML = "";
  loadingContainer.classList.remove("hidden");
}

function hideLoading() {
  loadingContainer.classList.add("hidden");
}

async function loadAllTrees() {
  showLoading();

  const url = "https://openapi.programming-hero.com/api/plants";

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  hideLoading();

  allTreesDisplay(data.plants);
}

loadAllTrees();

function allTreesDisplay(trees) {
  trees.forEach((tree) => {
    // console.log(tree);
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg p-2";
    div.innerHTML = `
                <div>
                  <img class="h-[180px] w-full object-cover rounded-md" src=${tree.image} alt="" />
                </div>
                <div class="mt-3 space-y-3">
                  <h4 class="font-semibold text-[14px] text-[#1F2937] hover:text-[#15803D]" onclick='openModal(${tree.id})'>
                   ${tree.name}
                  </h4>
                  <p class="text-[12px] text-[#1F2937] line-clamp-2">
                    ${tree.description}
                  </p>
                  <div class="flex justify-between items-center">
                    <p
                      class="text-[#15803D] font-bold text-[12px] bg-[#DCFCE7] py-1 px-2 rounded-full"
                    >
                      ${tree.category}
                    </p>
                    <p class="text-[14px] font-semibold">${tree.price}</p>
                  </div>
                  <button
                    class="btn bg-[#15803D] rounded-full font-bold text-white w-full"
                  >
                    Add to Cart
                  </button>
    `;
    allTreesContainer.append(div);
  });
}

async function selectCategoryBtn(categoryId, btn) {
  // console.log(categoryId, btn);
  showLoading();

  // btn style
  const allCategoriesBtns = document.querySelectorAll(
    "#category-btn-container button, #all-tree-btn",
  );
  allCategoriesBtns.forEach((allCategoryBtn) => {
    allCategoryBtn.classList.add("text-[#15803D]");
    allCategoryBtn.classList.remove("bg-[#15803D]", "text-white");
  });

  btn.classList.add("bg-[#15803D]", "text-white");

  // console.log(allCategoriesBtns);

  const url = `https://openapi.programming-hero.com/api/category/${categoryId}
`;

  const res = await fetch(url);
  const data = await res.json();
  hideLoading();
  allTreesDisplay(data.plants);
  // console.log(data);
}

const allTreesBtn = document.getElementById("all-tree-btn");

allTreesBtn.addEventListener("click", function () {
  const allCategoriesBtns = document.querySelectorAll(
    "#category-btn-container button, #all-tree-btn",
  );
  allCategoriesBtns.forEach((allCategoryBtn) => {
    allCategoryBtn.classList.add("text-[#15803D]");
    allCategoryBtn.classList.remove("bg-[#15803D]", "text-white");
  });

  allTreesBtn.classList.add("bg-[#15803D]", "text-white");

  loadAllTrees();
});

// modal
async function openModal(treeId) {
  // console.log(treeId);

  const url = `https://openapi.programming-hero.com/api/plant/${treeId}`;

  const res = await fetch(url);
  const data = await res.json();
  const treeDetails = data.plants;

  modalTitle.innerText = treeDetails.name;
  modalImage.src = treeDetails.image;
  modalCategory.innerText = treeDetails.category;
  modalPrice.innerText = treeDetails.price;
  modalDescription.innerText = treeDetails.description;

  plantDetailModal.showModal();
}
