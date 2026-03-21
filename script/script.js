const categoriesBtnsContainer = document.getElementById(
  "category-btn-container",
);

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
