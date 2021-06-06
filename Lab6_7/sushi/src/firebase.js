import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const AppFirebase = firebase.initializeApp({
    apiKey: "AIzaSyCcgL6TWg3DXDz42fAIcaRJth_9C9tX0HE",
    authDomain: "sushi-lab-piw.firebaseapp.com",
    databaseURL: "https://sushi-lab-piw-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sushi-lab-piw",
    storageBucket: "sushi-lab-piw.appspot.com",
    messagingSenderId: "1028604017726",
    appId: "1:1028604017726:web:0b88980995e12419cca56f",
    measurementId: "G-41QNC1NFFB"
})

export const auth = AppFirebase.auth()
export default AppFirebase