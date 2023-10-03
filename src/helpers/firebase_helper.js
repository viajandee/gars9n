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

const storeCollecionRef = collection(db, "stores");
class StoreDataService {
  // Add Stores
  addStores = (newStore) => {
    return addDoc(storeCollecionRef, newStore);
  };

  // Update Stores
  updateStores = (id, updatedBook) => {
    const storeDoc = doc(db, "stores", id);
    return updateDoc(storeDoc, updatedBook);
  };

  // Delete Stores
  deleteStore = (id) => {
    const storeDoc = doc(db, "stores", id);
    return deleteDoc(storeDoc);
  };

  // Get All Stores
  getAllStore = () => {
    return getDocs(storeCollecionRef);
  };

  // Get Stores
  getStore = (id) => {
    const storeDoc = doc(db, "stores", id);
    return getDoc(storeDoc);
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

  /**
   * Handle the error
   * @param {*} error
   */
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

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export {
  initFirebaseBackend,
  getFirebaseBackend,
  onAuthStateChanged,
  StoreDataService,
};
