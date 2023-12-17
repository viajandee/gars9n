import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const storesCollecionRef = collection(db, "stores");
export class StoreDataService {
  // Add Stores
  addStoreFirebase = (newStore) => {
    return addDoc(storesCollecionRef, newStore);
  };

  // Update Stores
  updateStoreFirebase = async (id, updatedStore) => {
    // console.log("Received id:", id);
    // console.log("Received updatedStore:", updatedStore);
    if (
      typeof id === "string" &&
      updatedStore &&
      typeof updatedStore === "object"
    ) {
      if (id && updatedStore) {
        const storeDoc = doc(db, "stores", id);
        try {
          await updateDoc(storeDoc, updatedStore);
          // console.log("Store updated successfully!", id);
        } catch (error) {
          console.log("Error updating store:", error);
        }
      } else {
        console.error(
          "Invalid data provided for store update. ID:",
          id,
          "Updated Store:",
          updatedStore
        );
        return Promise.reject("Invalid data");
      }
    }
  };

  // Delete Stores
  deleteStoreFirebase = (id) => {
    const storeDoc = doc(db, "stores", id);
    return deleteDoc(storeDoc);
  };

  // Get All Stores
  getAllStoresFirebase = () => {
    return getDocs(storesCollecionRef);
  };

  // Get Store
  getStoreFirebase = (id) => {
    const storeDoc = doc(db, "stores", id);
    return getDoc(storeDoc);
  };

  // Maps
  async geocode(location) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=AIzaSyAelqFKluixvanU-Rwz1P4-bZrePAgLQz4` //GOOGLE_MAPS_API_KEY
      );

      if (!response.ok) {
        throw new Error("Error fetching location details");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.log("Location not found");
        return null;
      }
    } catch (error) {
      console.log("Error fetching location:", error);
      return null;
    }
  }
}

const clientsCollectionRef = collection(db, "clients");
export class ClientDataService {
  // Add Clients
  addClientFirebase = (newClient) => {
    return addDoc(clientsCollectionRef, newClient);
  };

  // Upadte Clients
  updateClientFirebase = async (id, updatedClient) => {
    // console.log("Received id:", id);
    // console.log("Received updatedClient:", updatedClient);
    if (
      typeof id === "string" &&
      updatedClient &&
      typeof updatedClient === "object"
    ) {
      if (id && updatedClient) {
        const clientDoc = doc(db, "clients", id);
        try {
          await updateDoc(clientDoc, updatedClient);
          // console.log("Client updated successfully!", id);
        } catch (error) {
          console.log("Error updating client", error);
        }
      } else {
        console.error(
          "Invalid data provided for client update. ID:",
          id,
          "updated Client:",
          updatedClient
        );
        return Promise.reject("Invalid data");
      }
    }
  };

  // Delete Clients
  deleteClientFirebase = (id) => {
    const clientDoc = doc(db, "clients", id);
    return deleteDoc(clientDoc);
  };

  // Get All Clients
  getAllClientsFirebase = () => {
    return getDocs(clientsCollectionRef);
  };

  // Get Client
  getClientFirebase = (id) => {
    const clientDoc = doc(db, "clients", id);
    return getDoc(clientDoc);
  };
}

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = firebase.firestore().collection("users").doc(user.uid);
        const userDoc = await userRef.get();
        const userData = userDoc.data();
        const authUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          ...userData,
        };
        localStorage.setItem("authUser", JSON.stringify(authUser));
        resolve(authUser);
      } else {
        localStorage.removeItem("authUser");
        resolve(null);
      }
    });
    return () => unsubscribe();
  });
};

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user));
        } else {
          localStorage.removeItem("authUser");
        }
      });
    }
  }

  /**
   * Registers the user with given details
   */
  // registerAdmin = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(
  //         user => {
  //           const userRef = firebase.firestore().collection("admins").doc(user.uid);
  //           userRef.set({
  //             email: user.email,
  //             isAdmin: true
  //           }).then(() => {
  //             resolve(firebase.auth().currentUser);
  //           }).catch(error => {
  //             reject(this._handleError(error));
  //           });
  //         },
  //         error => {
  //           reject(this._handleError(error));
  //         }
  //       );
  //   });
  // };

  //working code
  registerAdmin = async (
    email,
    password,
    firstName,
    lastName,
    title,
    company,
    phone
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const adminRef = firebase.firestore().collection("users").doc(user.uid);
      await adminRef.set({
        email: email,
        firstName: firstName,
        lastName: lastName,
        title: title,
        company: company,
        phone: phone,
        isAdmin: true,
      });
      return {
        user: user,
        admin: { email, firstName, lastName, title, company, phone },
      };
    } catch (error) {
      throw error;
    }
  };

  // add a function to add the details from registerAdmin to firestore
  // addNewAdminToFirestore = (admin) => {
  //   const collection = firebase.firestore().collection("admins");
  //   const details = {
  //     firstName: admin.firstName,
  //     lastName: admin.lastName,
  //     title: admin.title,
  //     email: admin.email,
  //     phone: admin.phone,
  //     password: admin.password,
  //     createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
  //   };
  //   return new Promise((resolve, reject) => {
  //     collection
  //       .add(details)
  //       .then(docRef => {
  //         resolve(docRef);
  //       })
  //       .catch(error => {
  //         reject(this._handleError(error));
  //       });
  //   });
  // }

  /**
   * Registers the user with given details
   */
  // registerUser = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(
  //         user => {
  //           resolve(firebase.auth().currentUser);
  //         },
  //         error => {
  //           reject(this._handleError(error));
  //         }
  //       );
  //   });
  // };

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /**
   * forget Password user with given details
   */
  // forgetPassword = email => {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //       .auth()
  //       .sendPasswordResetEmail(email, {
  //         url:
  //           window.location.protocol + "//" + window.location.host + "/login",
  //       })
  //       .then(() => {
  //         resolve(true);
  //       })
  //       .catch(error => {
  //         reject(this._handleError(error));
  //       });
  //   });
  // };

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  // addNewUserToFirestore = (user) => {
  //   const collection = firebase.firestore().collection("users");
  //   const details = {
  //     firstName: userDetails.first_name,
  //     lastName: userDetails.last_name,
  //     title: userDetails.title,
  //     email: userDetails.email,
  //     phone: userDetails.phone,
  //     password: userDetails.password,
  //     createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
  //     lastLoginTime: firebase.firestore.FieldValue.serverTimestamp()
  //   };
  //   collection.doc(user.uid).set(details);
  // };

  // setLoggeedInUser = user => {
  //   localStorage.setItem("authUser", JSON.stringify(user));
  // };

  /**
   * Returns the authenticated user
   */
  // getAuthenticatedUser = () => {
  //   if (!localStorage.getItem("authUser")) return null;
  //   return JSON.parse(localStorage.getItem("authUser"));
  // };

  /* Handle the error
   * @param {*} error*/

  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/* Returns the firebase backend*/
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend, onAuthStateChanged };
