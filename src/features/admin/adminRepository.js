import {  db } from "../../common/functions/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const userRef = collection(db, "users");

class AdminRepository {
  static getAllParents(schoolId) {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "parent")
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        resolve(userData);
      } catch (error) {
        console.error("Error getting user data:", error);
        reject(error);
      }
    });
  }
  static async addParent(data) {
    return setDoc(doc(userRef, data.email), {
      email: data.email,
      role: "parent",
      parentName: data?.parentName ?? "",
      studentName: data?.studentName ?? "",
      schoolId: "123",
      route: data?.route ?? "",
    });
  }
  static deleteParent(email) {
    console.log("email", email);
    // const userDocRef = doc(db, 'users', email);
    return deleteDoc(doc(userRef, email));
  }
  static getAllDrivers(schoolId) {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "driver")
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        resolve(userData);
      } catch (error) {
        console.error("Error getting user data:", error);
        reject(error);
      }
    });
  }
  static async addDriver(data) {
    return setDoc(doc(userRef, data.email), {
      email: data.email,
      role: "driver",
      name: data?.name ?? "",
      schoolId: "123",
      routes: data?.routes ?? [],
    });
  }
  static deleteDriver(email) {
    return deleteDoc(doc(userRef, email));
  }
  
  static getRoutes() {
    const schoolId = "123";
    const routeRef = collection(db, "routes", schoolId, "routes");
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          routeRef
        );
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot", querySnapshot);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        resolve(userData);
      } catch (error) {
        console.error("Error getting user data:", error);
        reject(error);
      }
    });
  }
  static addRoute(data) {
    const schoolId = "123";
    const nameId=data.name.toLowerCase();
    const routeRef = collection(db, "routes", schoolId, "routes");
    return setDoc(doc(routeRef, nameId), {
      name: nameId,
      stops: data.stops.map((stop) => stop.toLowerCase()),
    });
  }
  static deleteRoute(name) {
    const schoolId = "123";
    const nameId=name.toLowerCase();
    const routeRef = collection(db, "routes", schoolId, "routes");
    return deleteDoc(doc(routeRef, nameId));
  }

  

 
  
}

// AdminRepository.getUserDataByEmail("test@admin.com");

export default AdminRepository;
