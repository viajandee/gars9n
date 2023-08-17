import avatar1 from "../../assets/images/users/avatar-1.jpg";

const store = [
  {
    id: 1,
    name: "McDonald's",
    designation: "Store",
    color: "primary",
    email: "Mac@McDonalds.com",
    project: "125",
    tag: ["Mac", "Mac Coffee"],
  },
];

const storeProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar1,
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthiaskote@gmail.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      iconClass: "bx-server",
      link: "#",
      designation: "Back end Developer",
      timeDuration: "2016 - 19",
    },
  ],
};

export { store, storeProfile };