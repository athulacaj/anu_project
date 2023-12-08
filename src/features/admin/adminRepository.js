import { db } from "../../common/functions/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

class AdminRepository {
  static getAllParents(schoolId) {
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          collection(db, "users"),
          where("schoolId", "==", schoolId,"and","role","==","parent")
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
}

// AdminRepository.getUserDataByEmail("test@admin.com");

export default AdminRepository;
