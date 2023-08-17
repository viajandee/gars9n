import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import { storeProfile, clients as members, store } from "../../common/data";

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
            "Clientname and password are invalid. Please enter correct clientname and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply((config) => {
    // client needs to check that client is eXist or not and send mail for Reset New password

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
    // console.log("validclient",client)

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
    // client needs to check that client is eXist or not and send mail for Reset New password

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
          const validClientObj = { ...client[0], ...tokenObj, ...client.name }; // validclient Obj

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

  //  CLIENT
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

  //  STORE PROFILE
  mock.onGet(url.GET_STORE_PROFILE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (storeProfile) {
          // Passing fake JSON data as response
          resolve([200, storeProfile]);
        } else {
          reject([400, "Cannot get store Profile"]);
        }
      });
    });
  });

  // STORE
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
};

export default fakeBackend;
