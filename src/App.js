// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { auth, db } from "./firebase";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import "./App.css";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function App() {
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState(null);
//   const [user, setUser] = useState(null);
//   const [generatedText, setGeneratedText] = useState("");
//   const [progresspercent, setProgresspercent] = useState(0);
//   const [fileUrl, setFileUrl] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider).catch((error) => {
//       console.error("Error during sign-in:", error);
//     });
//   };
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyDtpt5T_4_8_Zy6gF5zu4ISUsoqeYOYzvE"
//   );
//   const handleFileUpload = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage();
//       const storageRef = ref(storage, `files/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           setProgresspercent(progress);
//         },
//         (error) => {
//           console.error("Error uploading file:", error);
//           reject(error);
//         },
//         async () => {
//           try {
//             const gsUri = storageRef.toString(); // Get the gs:// URI
//             resolve(gsUri);
//           } catch (error) {
//             console.error("Error getting gs:// URI:", error);
//             reject(error);
//           }
//         }
//       );
//     });
//   };

//   // Function to generate content from image
//   const generateContent = async (fileUri, mimeType) => {
//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//       const result = await model.generateContent([
//         {
//           fileData: {
//             mimeType: mimeType,
//             fileUri: fileUri,
//           },
//         },
//         { text: "Describe the content of this image." },
//         console.log(mimeType, fileUri, "1"),
//       ]);

//       const response = await result.response;
//       const text = response.text();
//       setGeneratedText(text);
//     } catch (error) {
//       console.error("Error generating content:", error);
//       setGeneratedText("Error generating content. Please try again.");
//     }
//   };

//   // Function to handle form submit for image upload
//   const handleSubmitImage = async (e) => {
//     e.preventDefault();
//     const file = e.target[0]?.files[0];
//     if (!file) return;

//     try {
//       const fileUri = await handleFileUpload(file);
//       generateContent(fileUri, file.type);
//     } catch (error) {
//       console.error("Error during file upload or content generation:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setResponse(null); // Clear previous response

//     try {
//       const apiKey = "AIzaSyDtpt5T_4_8_Zy6gF5zu4ISUsoqeYOYzvE"; // Make sure this is set in your .env file
//       const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
//       const data = { contents: [{ parts: [{ text: query }] }] };

//       const result = await axios.post(url, data, {
//         headers: { "Content-Type": "application/json" },
//       });

//       const generatedText = result.data.candidates[0]?.content?.parts[0]?.text;
//       setResponse(generatedText);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setResponse("Error fetching response. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="App">
//         <h1>AI Q&A</h1>
//         {!user ? (
//           <button onClick={signInWithGoogle}>Sign in with Google</button>
//         ) : (
//           <>
//             <form onSubmit={handleSubmit}>
//               <textarea
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Ask a question..."
//               />
//               <button type="submit">Submit</button>
//             </form>
//             {response && (
//               <div className="response">
//                 <h2>Response:</h2>
//                 <p>{response}</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <div className="App upload">
//         <form onSubmit={handleSubmitImage} className="form">
//           <input type="file" />
//           <button type="submit">Upload and Generate Content</button>
//         </form>
//         {progresspercent > 0 && (
//           <div className="outerbar">
//             <div className="innerbar" style={{ width: `${progresspercent}%` }}>
//               {progresspercent}%
//             </div>
//           </div>
//         )}
//         {generatedText && (
//           <div>
//             <h1>Generated Content</h1>
//             <p>{generatedText}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;
