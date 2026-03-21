const categoriesBtnsContainer = document.getElementById(
  "category-btn-container",
);
const allTreesContainer = document.getElementById("all-trees-contaienr");

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
      "btn border-1 bg-transparent border-[#15803D] text-[#15803D] w-full";
    btn.innerText = category.category_name;
    categoriesBtnsContainer.append(btn);
  });
}

loadCategory();

async function loadAllTrees() {
  const url = "https://openapi.programming-hero.com/api/plants";

  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
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
                  <img class="h-40 w-full object-cover rounded-md" src=${tree.image} alt="" />
                </div>
                <div class="mt-3 space-y-3">
                  <h4 class="font-semibold text-[14px] text-[#1F2937]">
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
