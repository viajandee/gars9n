import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

const clients = [
  {
    id: 1,
    img: avatar2,
    name: "Michael",
    designation: "Engineer",
    email: "michael@garson.com",
    projects: "7",
    tag: ["Civil"],
  },
  {
    id: 2,
    img: avatar4,
    name: "Colin Melton",
    designation: "IT",
    email: "colin@garson.com",
    projects: "3",
    tags: ["IT SUPPORT"],
  },
];
const clientProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: avatar2,
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
    {
      id: 2,
      iconClass: "bx-code",
      link: "#",
      designation: "Front end Developer",
      timeDuration: "2013 - 16",
    },
  ],
};

export { clients, clientProfile };
