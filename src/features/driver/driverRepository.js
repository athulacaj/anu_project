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

class DriverRepository {
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

  static sendFcmNotification(token, title,body) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "key=AAAA1u9oeZc:APA91bGhYU1rKArx8IiPPb3k6A2seCN-nDYiEkkbzBVeb_oRdpAQAI4Qst6mXM1XvOvxsTyQ0ktzzTD0t7SXpBgJDmZXWWXt-IZTUqcCZ9e22MKDpX3vIHq8qzP_MwNrRnFveCpXBZbl"
    );

    var raw = JSON.stringify({
      to:token, 
      notification: {
        title,
        body,
        mutable_content: true,
        sound: "Tri-tone",
      },
      data: {
        url: "<url of media image>",
        dl: "<deeplink action on tap of notification>",
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  static getAllParents(route,stop) {
    console.log(route);
    console.log(stop);
    const schoolId = "123";
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "parent"),
          stop?where("allowedNotificationStops", "array-contains", stop):where("route", "==", route),
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

  static getAllAdmin() {
    const schoolId = "123";
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "admin"),
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

  static async updateToken(email, token) {
    return updateDoc(doc(userRef, email), {
      token: token,    });
  }
  static async takeAttendance(email, token) {
    
  }
  static getAllStudents(route) {
    const schoolId = "123";
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          userRef,
          where("schoolId", "==", schoolId),
          where("role", "==", "parent"),
          where("route", "==", route)
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

export default DriverRepository;
