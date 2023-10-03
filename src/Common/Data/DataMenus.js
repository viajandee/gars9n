import product1 from "../../assets/images/product/img-1.png";
import product7 from "../../assets/images/product/Pro-1a.png";
import product8 from "../../assets/images/product/Pro-1b.png";

/** Product 2 */
import product2a from "../../assets/images/product/img-2.png";
import product2b from "../../assets/images/product/Pro-2a.png";
import product2c from "../../assets/images/product/Pro-2b.png";

/** Product 3 */
import product3a from "../../assets/images/product/img-3.png";
import product3b from "../../assets/images/product/Pro-4.png";
import product3c from "../../assets/images/product/Pro-4a.png";

/** Product 4 */
import product4a from "../../assets/images/product/img-4.png";
import product4b from "../../assets/images/product/Pro-12a.png";
import product4c from "../../assets/images/product/Pro-12b.png";

/** Product 5 */
import product5a from "../../assets/images/product/Pro-8.png";
import product5b from "../../assets/images/product/Pro-8a.png";
import product5c from "../../assets/images/product/Pro-8b.png";

/** Product 6 */
import product6a from "../../assets/images/product/img-6.png";
import product6b from "../../assets/images/product/Pro-17.png";
import product6c from "../../assets/images/product/Pro-17a.png";

const foodsData = [
  {
    id: 1,
    image: "product1",
    name: "Half sleeve T-shirt",
    link: "#",
    category: "KFC",
    rating: 5,
    oldPrice: 500,
    newPrice: 405,
    isOffer: true,
    offer: 10,
    reviews: 0,
    subImage: [product1, product7, product8],
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "M" },
      { type: "Color", value: "Red" },
    ],

    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product8", color: "Red" },
      { image: "product7", color: "Black" },
    ],
  },
  {
    id: 2,
    image: "product2",
    name: "Black color T-shirt",
    link: "#",
    category: "McDonald's",
    rating: 5,
    oldPrice: 225,
    newPrice: 175,
    isOffer: true,
    offer: 20,
    reviews: 0,
    subImage: [product2a, product2b, product2c],
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "L" },
      { type: "Color", value: "Light blue" },
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product2", color: "Light blue" },
      { image: "product9", color: "Black" },
    ],
  },
  {
    id: 3,
    image: "product3",
    name: "Printed T-shirt",
    link: "#",
    category: "Pizza Hut",
    rating: 4,
    oldPrice: 177,
    newPrice: 152,
    isOffer: true,
    offer: 14,
    reviews: 0,
    subImage: [product3a, product3b, product3c],
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "XL" },
      { type: "Color", value: "Black" },
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product3", color: "Black" },
      { image: "product10", color: "White" },
    ],
  },
  {
    id: 4,
    image: "product4",
    name: "Smiley Plain T-shirt",
    link: "#",
    category: "Papa Johns",
    rating: 3,
    oldPrice: 150,
    newPrice: 145,
    isOffer: true,
    offer: 5,
    reviews: 0,
    subImage: [product4a, product4b, product4c],
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "M" },
      { type: "Color", value: "Blue" },
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product4", color: "Blue" },
      { image: "product11", color: "Black" },
    ],
  },
  {
    id: 5,
    image: "product5",
    name: "Full sleeve T-Shirt",
    link: "#",
    category: "KFC",
    rating: 1,
    oldPrice: 177,
    newPrice: 152,
    isOffer: false,
    offer: 0,
    reviews: 5,
    subImage: [product5a, product5b, product5c],
    specification: [
      { type: "Size", value: "S" },
      { type: "Color", value: "Coral" },
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product5", color: "Coral" },
      { image: "product12", color: "Black" },
    ],
  },
  {
    id: 6,
    image: "product6",
    name: "Sky blue color T-shirt",
    link: "#",
    category: "McDonald's",
    rating: 5,
    oldPrice: 200,
    newPrice: 100,
    isOffer: true,
    offer: 50,
    reviews: 10,
    subImage: [product6a, product6b, product6c],
    specification: [
      { type: "Category", value: "T-shirt" },
      { type: "Brand", value: "Levis" },
      { type: "Size", value: "L" },
      { type: "Color", value: "Green" },
    ],
    features: [
      { icon: "fa fa-caret-right", type: "Fit", value: "Regular fit" },
      { icon: "fa fa-caret-right", type: "", value: "Highest quality fabric" },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Suitable for all weather condition",
      },
      {
        icon: "fa fa-caret-right",
        type: "",
        value: "Excellent Washing and Light Fastness",
      },
    ],
    colorOptions: [
      { image: "product6", color: "Green" },
      { image: "product13", color: "Black" },
    ],
  },
];

const recentFoods = [
  {
    id: 1,
    img: "img1",
    name: "Half sleeve T-shirt",
    link: "",
    rating: 4,
    oldPrice: 240,
    newPrice: 225,
  },
  {
    id: 4,
    img: "img4",
    name: "Smiley Plain T-shirt",
    link: "",
    rating: 3,
    oldPrice: 150,
    newPrice: 145,
  },
  {
    id: 6,
    img: "img6",
    name: "Sky blue color T-shirt",
    link: "",
    rating: 4,
    oldPrice: 138,
    newPrice: 135,
  },
];

export { foodsData, recentFoods };
