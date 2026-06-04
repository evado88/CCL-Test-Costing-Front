export interface MenuItem {
  key: string;
  text: string;
  icon: string;
  path: string;
  roles: number[];
  items: MenuItem[];
}
export const navigation: MenuItem[] = [
  {
    key: "home",
    text: "Dashboard",
    icon: "fa fa-cubes",
    path: "/",
    roles: [1, 2],
    items: [],
  },
  {
    key: "users",
    text: "Users",
    icon: "fa fa-bell",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "all-users",
        text: "All Users",
        icon: "",
        path: "/admin/users/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  {
    key: "labs",
    text: "Labs",
    icon: "fa fa-building",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All labs",
        icon: "",
        path: "/admin/labs/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  {
    key: "reagents",
    text: "Reagents",
    icon: "fa fa-flask",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All reagents",
        icon: "",
        path: "/admin/reagents/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },
  {
    key: "consumables",
    text: "Consumables",
    icon: "fa fa-flask",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All Consumbales",
        icon: "",
        path: "/admin/controls/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  {
    key: "instruments",
    text: "Instruments",
    icon: "fa fa-dashboard",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All instruments",
        icon: "",
        path: "/admin/instruments/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  {
    key: "tests",
    text: "Tests",
    icon: "fa fa-cubes",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All tests",
        icon: "",
        path: "/admin/tests/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },
  {
    key: "import",
    text: "Data Import",
    icon: "fa fa-upload",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "import-labs",
        text: "Import Labs",
        icon: "",
        path: "/admin/data-import/labs",
        roles: [1, 2],
        items: [],
      },
      {
        key: "import-reagents",
        text: "Import Reagents",
        icon: "",
        path: "/admin/data-import/reagents",
        roles: [1, 2],
        items: [],
      },
      {
        key: "import-consumables",
        text: "Import Consumables",
        icon: "",
        path: "/admin/data-import/consumables",
        roles: [1, 2],
        items: [],
      },
      {
        key: "import-instruments",
        text: "Import Instruments",
        icon: "",
        path: "/admin/data-import/instruments",
        roles: [1, 2],
        items: [],
      },
      {
        key: "import-tests",
        text: "Import Tests",
        icon: "",
        path: "/admin/data-import/tests",
        roles: [1, 2],
        items: [],
      },
      {
        key: "import-lab-acivity-data",
        text: "Lab Test Price Volume",
        icon: "",
        path: "/admin/data-import/lab-test-price-volume",
        roles: [1, 2],
        items: [],
      },
    ],
  },
];
