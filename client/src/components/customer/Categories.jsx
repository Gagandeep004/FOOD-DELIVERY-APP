import "../../styles/customer.css";

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Salad",
  "Chicken",
  "Dessert",
  "Drinks",
  "Other",
];

const icons = {
  All: "🍽️",
  Pizza: "🍕",
  Burger: "🍔",
  Salad: "🥗",
  Chicken: "🍗",
  Dessert: "🍰",
  Drinks: "🥤",
  Other: "🍛",
};

function Categories({ selected, setSelected, counts = {} }) {
  return (
    <div className="categories-wrapper">
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={selected === category ? "category active-category" : "category"}
            onClick={() => setSelected(category)}
          >
            <span className="cat-icon">{icons[category]}</span>
            <span className="cat-label">{category}</span>
            {counts[category] ? <span className="cat-count">{counts[category]}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;