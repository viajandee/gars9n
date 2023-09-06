import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import {
  foodsData,
  store,
  recentFoods,
  clientProfile,
  clients as members,
  inboxmails,
  starredmails,
  importantmails,
  draftmails,
  sentmails,
  trashmails,
} from "../../common/data";

let clients = [
  {
    uid: 1,
    clientname: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];
const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const client = JSON.parse(config["data"]);
    clients.push(client);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, client]);
      });
    });
  });

  mock.onPost("/post-fake-login").reply((config) => {
    const client = JSON.parse(config["data"]);
    const validClient = clients.filter(
      (usr) => usr.email === client.email && usr.password === client.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validClient["length"] === 1) {
          resolve([200, validClient[0]]);
        } else {
          reject([
            "Clientname and password are invalid. Please enter correct Clientname and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply((config) => {
    // Client needs to check that Client is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config) => {
    const client = JSON.parse(config["data"]);
    clients.push(client);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, client]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const client = JSON.parse(config["data"]);
    const validClient = clients.filter(
      (usr) => usr.email === client.email && usr.password === client.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validClient["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validClientObj = { ...validClient[0], ...tokenObj }; // validClient Obj

          resolve([200, validClientObj]);
        } else {
          reject([
            400,
            "Clientname and password are invalid. Please enter correct Clientname and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config) => {
    const client = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validClient = clients.filter((usr) => usr.uid === client.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validClient["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = clients.findIndex((obj) => obj.uid === client.idx);

            //Update object's name property.
            clients[objIndex].clientname = client.clientname;

            // Assign a value to locastorage
            localStorage.removeItem("authClient");
            localStorage.setItem(
              "authClient",
              JSON.stringify(clients[objIndex])
            );

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/post-fake-profile").reply((config) => {
    const client = JSON.parse(config["data"]);

    const validClient = clients.filter((usr) => usr.uid === client.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validClient["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = clients.findIndex((obj) => obj.uid === client.idx);

          //Update object's name property.
          clients[objIndex].clientname = client.clientname;

          // Assign a value to locastorage
          localStorage.removeItem("authClient");
          localStorage.setItem("authClient", JSON.stringify(clients[objIndex]));

          resolve([200, "Profile Updated Successfully"]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply((config) => {
    // Client needs to check that client is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/social-login").reply((config) => {
    const client = JSON.parse(config["data"]);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (client && client.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const clientName = client.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, clientname: clientName }; // Token Obj
          const validClientObj = { ...client[0], ...tokenObj, ...client.name }; // validClient Obj

          resolve([200, validClientObj]);
        } else {
          reject([
            400,
            "Clientname and password are invalid. Please enter correct clientname and password",
          ]);
        }
      });
    });
  });

  // FOODS DATA
  mock.onGet(url.GET_MENUS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foodsData) {
          // Passing fake JSON data as response
          resolve([200, foodsData]);
        } else {
          reject([400, "Cannot get foodsData"]);
        }
      });
    });
  });

  // RECENT FOODS &
  mock.onGet(new RegExp(`${url.GET_MENUS_DETAIL}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foodsData) {
          // Passing fake JSON data as response
          const { params } = config;
          const menus = foodsData.find(
            (menu) => menu.id.toString() === params.id.toString()
          );
          resolve([200, { ...menus, recentFoods }]);
        } else {
          reject([400, "Cannot get menus detail"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CLIENT).reply((client) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (client && client.data) {
          // Passing fake JSON data as response
          resolve([200, client.data]);
        } else {
          reject([400, "Cannot add client"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CLIENT).reply((client) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (client && client.data) {
          // Passing fake JSON data as response
          resolve([200, client.data]);
        } else {
          reject([400, "Cannot update client"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CLIENT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.client]);
        } else {
          reject([400, "Cannot delete client"]);
        }
      });
    });
  });

  // STORE
  mock.onGet(url.GET_STORES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (store) {
          // Passing fake JSON data as response
          resolve([200, store]);
        } else {
          reject([400, "Cannot get store"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_STORE).reply((store) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (store && store.data) {
          // Passing fake JSON data as response
          resolve([200, store.data]);
        } else {
          reject([400, "Cannot add store"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_STORE).reply((store) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (store && store.data) {
          // Passing fake JSON data as response
          resolve([200, store.data]);
        } else {
          reject([400, "Cannot update store"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_STORE).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.store]);
        } else {
          reject([400, "Cannot delete store"]);
        }
      });
    });
  });

  // MENUS
  mock.onPost(url.ADD_NEW_MENU).reply((foodsData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foodsData && foodsData.data) {
          // Passing fake JSON data as response
          resolve([200, foodsData.data]);
        } else {
          reject([400, "Cannot add foodsData"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_MENU).reply((foodsData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (foodsData && foodsData.data) {
          // Passing fake JSON data as response
          resolve([200, foodsData.data]);
        } else {
          reject([400, "Cannot update foodsData"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MENU).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.foodsData]);
        } else {
          reject([400, "Cannot delete foodsData"]);
        }
      });
    });
  });

  //  CLIENT
  mock.onGet(url.GET_CLIENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          // Passing fake JSON data as response
          resolve([200, members]);
        } else {
          reject([400, "Cannot get clients"]);
        }
      });
    });
  });

  // CLIENT PROFILE
  mock.onGet(url.GET_CLIENT_PROFILE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (clientProfile) {
          // Passing fake JSON data as response
          resolve([200, clientProfile]);
        } else {
          reject([400, "Cannot get client profile"]);
        }
      });
    });
  });

  // EMAIL
  mock.onGet(url.GET_INBOX_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inboxmails) {
          // Passing fake JSON data as response
          resolve([200, inboxmails]);
        } else {
          reject([400, "Cannot get inboxmails"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_INBOX_MAIL).reply((inboxmail) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (inboxmail && inboxmail.data) {
          // Passing fake JSON data as response
          resolve([200, inboxmail.data]);
        } else {
          reject([400, "Cannot add project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_INBOX_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.inboxmail]);
        } else {
          reject([400, "Cannot delete inboxmail"]);
        }
      });
    });
  });

  mock.onGet(url.GET_STARRED_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (starredmails) {
          // Passing fake JSON data as response
          resolve([200, starredmails]);
        } else {
          reject([400, "Cannot get starredmails"]);
        }
      });
    });
  });

  mock.onGet(url.GET_IMPORTANT_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (importantmails) {
          // Passing fake JSON data as response
          resolve([200, importantmails]);
        } else {
          reject([400, "Cannot get importantmails"]);
        }
      });
    });
  });

  mock.onGet(url.GET_TRASH_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (trashmails) {
          // Passing fake JSON data as response
          resolve([200, trashmails]);
        } else {
          reject([400, "Cannot get trashmails"]);
        }
      });
    });
  });

  mock.onGet(url.GET_DRAFT_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (draftmails) {
          // Passing fake JSON data as response
          resolve([200, draftmails]);
        } else {
          reject([400, "Cannot get draftmails"]);
        }
      });
    });
  });

  mock.onGet(url.GET_SENT_MAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sentmails) {
          // Passing fake JSON data as response
          resolve([200, sentmails]);
        } else {
          reject([400, "Cannot get sentmails"]);
        }
      });
    });
  });
};

export default fakeBackend;
