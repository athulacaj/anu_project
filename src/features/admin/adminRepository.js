import {  db } from "../../common/functions/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
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
  static getAllParentsWithRoute(schoolId,route) {
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

  static sendFcmNotification(token, title,body) {
    console.log("token", token);
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

    console.log("raw", raw);

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

  static async updateToken(email, token) {
    return updateDoc(doc(userRef, email), {
      token: token,    });
  }
  
}

// AdminRepository.getUserDataByEmail("test@admin.com");

export default AdminRepository;
