import { Squares2X2Icon, ShoppingBagIcon } from "@heroicons/react/24/solid";
const MENUS = [
  {
    main: "Managements",
    subMenus: [
      {
        title: "Categories",
        icon: () => {
          return <Squares2X2Icon className="h-6 w-6 mr-1"></Squares2X2Icon>;
        },
        url: "",
        child: [],
      },
      {
        title: "Products",
        icon: () => {
          return <ShoppingBagIcon className="h-6 w-6 mr-1"></ShoppingBagIcon>;
        },
        url: "",
        child: [
          {
            title: "Top Products",
            url: "",
          },
          {
            title: "Anything",
            url: "",
          },
          {
            title: "ML",
            url: "",
          },
        ],
      },
    ],
  },
];

export const sidebarMenus = () => {
  return MENUS;
};
