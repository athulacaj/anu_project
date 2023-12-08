import { db } from "../../common/functions/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

class OnboardRepository {

  static getUserDataByEmail(email) {
    console.log("email", email);
    // create new promise
    return new Promise(async (resolve, reject) => {
      try {
        // const userRef = await db
        //   .collection("users")
        //   .where("email", "==", email)
        //   .get();

        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        if(userData.length > 0) {
          resolve(userData[0]);
        }else {
          reject("No user found");
        }
      } catch (error) {
        console.error("Error getting user data:", error);
        reject(error);
      }
    });
  }
}

OnboardRepository.getUserDataByEmail("test@admin.com")


export default OnboardRepository;
