import { db } from "../../common/functions/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const userRef = collection(db, "users");

class ParentRepository {
  static getRouteInfo(route) {
    const schoolId = "123";
    const routeRef = collection(db, "routes", schoolId, "routes");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getDoc(doc(routeRef, route));
        resolve(data.data());
      } catch (error) {
        console.error("Error getting route info:", error);
        reject(error);
      }
    });
  }

  static async saveTravelData(data) {
    console.log(data);
    const schoolId = "123";
    const travelRef = collection(db, "routes", schoolId, "travel");
    return setDoc(doc(travelRef, data.name), data);
  }

  static getTravelData(route) {
    const schoolId = "123";
    const travelRef = collection(db, "routes", schoolId, "travel");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await getDoc(doc(travelRef, route));
        resolve(data.data());
      } catch (error) {
        reject(error);
      }
    });
  }

  static async updateToken(email, token, allowedNotificationStops) {
    return updateDoc(doc(userRef, email), {
      token: token,
      allowedNotificationStops,
    });
  }
  static async updateUserData(email, payload) {
    if(payload === null) return;
    return updateDoc(doc(userRef, email), {
      ...payload,
    });
  }
  static getDriverInfo(route) {
    const schoolId = "123";
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "driver"),
          where("routes", "array-contains", route)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        resolve(userData[0]);
      } catch (error) {
        console.error("Error getting user data:", error);
        reject(error);
      }
    });
  }
}

// AdminRepository.getUserDataByEmail("test@admin.com");

export default ParentRepository;
