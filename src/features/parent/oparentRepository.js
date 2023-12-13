import {  db } from "../../common/functions/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const userRef = collection(db, "users");

class ParentRepository {
  static getRouteInfo(route) {
    const schoolId = "123";
    const routeRef = collection(db, "routes", schoolId, "routes");
    return new Promise(async (resolve, reject) => {
      try {
        const data= await getDoc(doc(routeRef, route));
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
    return setDoc(doc(travelRef, data.name),data);
  }
  
  static getTravelData(route) {
    const schoolId = "123";
    const travelRef = collection(db, "routes", schoolId, "travel");
    return new Promise(async (resolve, reject) => {
      try {
        const data= await getDoc(doc(travelRef, route));
        resolve(data.data());
      } catch (error) {
        reject(error);
      }
    });
  }
 
 
  
}

// AdminRepository.getUserDataByEmail("test@admin.com");

export default ParentRepository;
