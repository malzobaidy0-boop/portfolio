const menu = [
  {
    id: "pizza",
    title: "البيتزا",
    items: [
      {"name": "بيتزا خضار", "small": 12, "large": 16},
      {"name": "بيتزا مرغريتا", "small": 12, "large": 16},
      {"name": "بيتزا بيبروني", "small": 13, "large": 17},
      {"name": "بيتزا هوت دوغ بالخضار", "small": 13, "large": 17},
      {"name": "بيتزا الدجاج وصوص الرانش", "small": 13, "large": 17},
      {"name": "بيتزا الدجاج وصوص الديناميت", "small": 13, "large": 17},
      {"name": "بيتزا قطع اللحم والخضار", "small": 13, "large": 17},
    ],
  },
  {
    id: "meat",
    title: "مناقيش اللحوم والدجاج",
    items: [
      {"name": "صفيحة لحم", "small": 12},
      {"name": "لحم بالجبنة", "small": 13},
      {"name": "دجاج سادة", "small": 10},
      {"name": "دجاج بالجبنة", "small": 12},
      {"name": "بيبروني بالجبنة", "small": 12},
      {"name": "هوت دوغ بالجبنة", "small": 12},
      {"name": "تونة سادة", "small": 10},
      {"name": "تونة بالجبنة", "small": 12},
    ],
  },
  {
    id: "cheese",
    title: "مناقيش الزعتر والأجبان",
    items: [
      {"name": "زعتر", "small": 7},
      {"name": "زعتر بالجبنة", "small": 10},
      {"name": "جبنة عكاوي", "small": 9},
      {"name": "موزاريلا", "small": 9},
      {"name": "كرافت سائلة", "small": 9},
      {"name": "شيدر", "small": 9},
      {"name": "ميكس الأجبان الأربعة", "small": 12},
      {"name": "جبنة صوص", "small": 9},
    ],
  },
  {
    id: "labneh",
    title: "مناقيش اللبنة",
    items: [
      {"name": "لبنة سادة", "small": 8},
      {"name": "لبنة لبنانية بالخضار", "small": 10},
      {"name": "لبنة زعتر", "small": 9},
      {"name": "لبنة زيتون", "small": 9},
      {"name": "لبنة جبنة", "small": 9},
    ],
  },
  {
    id: "spinach",
    title: "مناقيش السبانخ والمحمّرة",
    items: [
      {"name": "سبانخ سادة", "small": 7},
      {"name": "سبانخ جبنة", "small": 9},
      {"name": "سبانخ لبنة", "small": 9},
      {"name": "سبانخ محمّرة سبايسي", "small": 8},
      {"name": "محمّرة سبايسي", "small": 6},
      {"name": "محمّرة بالجبنة", "small": 8},
      {"name": "محمّرة باللبنة", "small": 7},
    ],
  },
  {
    id: "dessert",
    title: "الحلا",
    items: [
      {"name": "نوتيلا", "small": 10},
      {"name": "لبنة عسل", "small": 10},
      {"name": "عش البلبل عسل", "small": 10},
      {"name": "حلاوة سادة", "small": 8},
      {"name": "حلاوة بالجبنة", "small": 10},
    ],
  },
];

const home = document.querySelector("#home");
const category = document.querySelector("#category");
const heading = document.querySelector("#category-title");
const categories = document.querySelector("#categories");
const itemCount = document.querySelector("#item-count");
const items = document.querySelector("#items");
const numerals = new Intl.NumberFormat("ar-SA");

function formatCount(number) {
  return numerals.format(number) + " أصناف";
}

for (const section of menu) {
  const link = document.createElement("a");
  link.className = "category-link";
  link.dataset.photo = section.id;
  link.href = "#" + section.id;
  const name = document.createElement("span");
  name.className = "category-name";
  name.textContent = section.title;
  const count = document.createElement("span");
  count.className = "count";
  count.textContent = formatCount(section.items.length);
  link.append(name, count);
  categories.append(link);
}

function render(focusHeading = false) {
  const section = menu.find(entry => "#" + entry.id === location.hash);
  home.hidden = Boolean(section);
  document.querySelector("#hero").hidden = Boolean(section);
  document.querySelector(".masthead").hidden = !section;
  category.hidden = !section;
  document.querySelector(".back").hidden = !section;
  if (section) {
    heading.textContent = section.title;
    itemCount.textContent = formatCount(section.items.length);
    items.replaceChildren();
    for (const item of section.items) {
      const card = document.createElement("li");
      const title = document.createElement("h2");
      title.textContent = item.name;
      const photos = {"بيتزا خضار":"vegetable", "بيتزا مرغريتا":"margherita", "بيتزا بيبروني":"pepperoni", "بيتزا هوت دوغ بالخضار":"hotdog"};
      if (photos[item.name]) {
        const image = document.createElement("img");
        image.src = "images/" + photos[item.name] + ".webp";
        image.alt = "";
        card.append(image);
      }
      card.append(title);
      for (const [key, label] of [["small","صغير"], ["medium","وسط"], ["large","كبير"]]) {
        if (item[key] == null) continue;
        const row = document.createElement("div");
        row.className = "price-row";
        const size = document.createElement("span");
        size.textContent = label;
        const price = document.createElement("strong");
        price.textContent = numerals.format(item[key]) + " ريال";
        row.append(size, price);
        card.append(row);
      }
      items.append(card);
    }
  }
  if (focusHeading) {
    const activeHeading = section ? heading : document.querySelector("#home-title");
    activeHeading.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

window.addEventListener("hashchange", () => render(true));
render();
