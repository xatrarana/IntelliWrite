
// //@ts-nocheck
// // "use client";
// // import React, { useRef, useEffect } from "react";
// // import { Editor } from "@tinymce/tinymce-react";
// // import { Input } from "../ui/input";
// // import CustomButtonAiGenerative from "./dasy-modal";
// // import { PublishButton } from "../navbar/publish-button";
// // import { Button } from "../ui/button";
// // import instance from "@/lib/axios";
// // import { auth } from "@/auth";
// // import ImageUpload from "./image-upload";


// // type CustomEditorComponentProps = {
// //   authorId: string;
// // }

// // const CustomEditorComponent = ({authorId}:CustomEditorComponentProps) => {
// //   const editorRef = useRef<Editor | null>(null);
// //   const titleRef = useRef<HTMLInputElement>(null);
// //   const [editorData, setEditorData] = React.useState<string>("");
// //   const [imageUrl,setImageUrl] = React.useState<string>("");

// //   const handleTitleKeyPress = (
// //     event: React.KeyboardEvent<HTMLInputElement>
// //   ) => {
// //     if (event.key === "Enter") {
// //       event.preventDefault();
// //       (editorRef.current as any).focus();
// //     }
// //   };

// //   useEffect(() => {
// //     const savedTitle = localStorage.getItem("editorTitle") || "";
// //     const savedContent = localStorage.getItem("editorContent") || "";

// //     if (titleRef.current) {
// //       titleRef.current.value = savedTitle;
// //     }

// //     if (editorRef.current) {
// //       setEditorData(savedContent);
// //     }

// //     const saveContentToLocalStorage = () => {
// //       //@ts-ignore
// //       const content = editorRef.current?.getContent() || "";
// //       localStorage.setItem("editorTitle", titleRef.current?.value || "");
// //       localStorage.setItem("editorContent", content);
// //     };

// //     const intervalId = setInterval(saveContentToLocalStorage, 5000);

// //     return () => clearInterval(intervalId);
// //   }, []);

// //   const handleSubmit = async () => {
// //     const title = titleRef.current?.value || "";
// //     //@ts-ignore
// //     const content = editorRef.current?.getContent() || "";

// //     if (!title || !content) {
// //       alert("Title and content are required");
// //       return;
// //     }

    
// //     const data = {
// //       title,
// //       content,
// //       authorId,
// //       imageUrl
// //     };
    

// //     try {
// //       const response = await instance.post("/api/stories", data );
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error(error);
// //     }

// //     localStorage.removeItem("editorTitle");
// //     localStorage.removeItem("editorContent");
// //   };

// //   return (
// //     <div className="text-slate-900 space-y-4">
// //       <div className="flex items-center justify-between">
// //         <CustomButtonAiGenerative setGenerateData={setEditorData} />
// //         <PublishButton>
// //           <Button onClick={handleSubmit} className="text-sm" variant={"default"}>
// //             Publish
// //           </Button>
// //         </PublishButton>
// //       </div>
// //       <div>
// //         <Input
// //           ref={titleRef}
// //           className="py-8 text-4xl focus-visible:outline-none border-none focus-visible:ring-0 shadow-none"
// //           placeholder="Title"
// //           onKeyDown={handleTitleKeyPress}
// //         />
// //       </div>
// //       <div>
// //         <ImageUpload setImageUrl={setImageUrl} />
// //       </div>
// //       <Editor
// //         onChange={() => console.log("change")}
// //         onInit={(_evt, editor) => ((editorRef.current as any) = editor)}
// //         initialValue={editorData}
// //         id="editor"
// //         apiKey={process.env.NEXT_PUBLIC_TINYMC_API_KEY}
// //         init={{
// //           plugins:
// //             "autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist linkchecker tinymcespellchecker permanentpen powerpaste advtable editimage advtemplate mentions",
// //           toolbar:
// //             "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat",
// //           menubar: false,
// //           skin: "naked",
// //           icons: "thin",
// //           ai_request: (request: any, respondWith: any) =>
// //             respondWith.string(() =>
// //               Promise.reject("See docs to implement AI Assistant")
// //             ),
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export default CustomEditorComponent;



// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { Input } from "../ui/input";
// import CustomButtonAiGenerative from "./dasy-modal";
// import { PublishButton } from "../navbar/publish-button";
// import { Button } from "../ui/button";
// import instance from "@/lib/axios";
// import { auth } from "@/auth";
// import ImageUpload from "./image-upload";
// import debounce from "lodash/debounce";
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import ThreeDot from "./three-dot";

// type CustomEditorComponentProps = {
//   authorId: string;
// };

// const CustomEditorComponent = ({ authorId }: CustomEditorComponentProps) => {
//   const editorRef = useRef<Editor | null>(null);
//   const titleRef = useRef<HTMLInputElement>(null);
//   const [editorData, setEditorData] = useState<string>("");
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const [prediction, setPrediction] = useState<string>("");
//   const [topic, setTopic] = useState<string>("");

//   const handleTitleKeyPress = (
//     event: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       (editorRef.current as any).focus();
//     }
//   };


//   const handleEditorChange = debounce(async () => {
//     //@ts-ignore
//     const content = editorRef.current?.getContent() || "";

//     if (content) {
//       try {
//         const response = await instance.post("http://127.0.0.1:5000/predict-next-word", { seed_text: content,next_words: 3 });
//         const generatedText = response.data.generated_text;
//         setPrediction(generatedText);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, 1000);

//   const handleTabKeyPress = (event: KeyboardEvent) => {
//     if (event.key === "Tab" && prediction) {
//       event.preventDefault();
//       if (editorRef.current) {
//         //@ts-ignore
//         editorRef.current.setContent(editorRef.current.getContent() + prediction);
//       }
//       setPrediction("");
//     }
//   };

//   useEffect(() => {
//     const editorElement = document.getElementById("editor_ifr");
//     if (editorElement) {
//       editorElement.addEventListener("keydown", handleTabKeyPress);
//     }

//     return () => {
//       if (editorElement) {
//         editorElement.removeEventListener("keydown", handleTabKeyPress);
//       }
//     };
//   }, [prediction]);

//   const handleSubmit = async () => {
//     const title = titleRef.current?.value || "";
//     //@ts-ignore
//     const content = editorRef.current?.getContent() || "";

//     if (!title || !content) {
//       alert("Title and content are required");
//       return;
//     }
  
//     const data = {
//       title,
//       content,
//       authorId,
//       imageUrl,
//       topic
//     };

//     try {
//        const response = await instance.post("/api/stories", data);
//     } catch (error) {
//       console.error(error);
//     }

//     localStorage.removeItem("editorTitle");
//     localStorage.removeItem("editorContent");
//   };

//   return (
//     <div className="text-slate-900 space-y-4">
//       <div className="flex items-center justify-between">
//         <CustomButtonAiGenerative setGenerateData={setEditorData} />
//        <div className="flex items-center gap-x-5">
//       <ThreeDot setTopic={setTopic}/>
//         <PublishButton>
//           <Button onClick={handleSubmit} className="text-sm" variant={"default"}>
//             Publish
//           </Button>
//         </PublishButton>
//        </div>
//       </div>
//       <div>
//         <Input
//           ref={titleRef}
//           className="py-8 text-4xl focus-visible:outline-none border-none focus-visible:ring-0 shadow-none"
//           placeholder="Title"
//           onKeyDown={handleTitleKeyPress}
//         />
//       </div>
//       <div>
//         <ImageUpload setImageUrl={setImageUrl} />
//       </div>
//       <Editor
//         onKeyUp={handleEditorChange}
//         onInit={(_evt, editor) => ((editorRef.current as any) = editor)}
//         initialValue={editorData}
//         id="editor"
//         apiKey={process.env.NEXT_PUBLIC_TINYMC_API_KEY}
//         init={{
//           plugins:
//             "autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist linkchecker tinymcespellchecker permanentpen powerpaste advtable editimage advtemplate mentions",
//           toolbar:
//             "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat",
//           menubar: false,
//           skin: "naked",
//           icons: "thin",
//           ai_request: (request: any, respondWith: any) =>
//             respondWith.string(() =>
//               Promise.reject("See docs to implement AI Assistant")
//             ),
//         }}
//       />
//       {prediction && (
//         <div className="text-gray-500 mt-2">
//           <em>Next word suggestion: {prediction}</em>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomEditorComponent;

  //@ts-nocheck
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "../ui/input";
import CustomButtonAiGenerative from "./dasy-modal";
import { PublishButton } from "../navbar/publish-button";
import { Button } from "../ui/button";
import instance from "@/lib/axios";
import { auth } from "@/auth";
import ImageUpload from "./image-upload";
import debounce from "lodash/debounce";
import ThreeDot from "./three-dot";
import { set } from "lodash";

type CustomEditorComponentProps = {
  authorId: string;
};

const CustomEditorComponent = ({ authorId }: CustomEditorComponentProps) => {
  const editorRef = useRef<Editor | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [editorData, setEditorData] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prediction, setPrediction] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const handleTitleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      (editorRef.current as any).focus();
    }
  };

  const handleEditorChange = debounce(async () => {
    //@ts-ignore
    const content: string = editorRef.current?.getContent({ format: "text" }) || "";
  
    if (content) {
      try {
        const response = await instance.post("http://127.0.0.1:5000/predict-next-word", { seed_text: content, next_words: 3 });
        const generatedText: string = response.data.generated_text;
        setPrediction(generatedText);
      } catch (error) {
        console.error(error);
      }
    }
  }, 3000);
  


  const handleSubmit = async () => {
    const title = titleRef.current?.value || "";
    //@ts-ignore
    const content = editorRef.current?.getContent() || "";

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }
  
    const data = {
      title,
      content,
      authorId,
      imageUrl,
      topic
    };

    try {
       const response = await instance.post("/api/stories", data);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleKeyDown = (event,generatedText) => {
    if (event.key === 'Tab' && generatedText) {
      event.preventDefault(); 
      if (editorRef.current) {
        const content: string = editorRef.current.getContent({ format: "text" }) || "";
        const updatedContent: string = content + " " + prediction; // Append the prediction with a space
        editorRef.current.setContent(updatedContent);
  
        // Move cursor to the end of the content
        editorRef.current.selection.select(editorRef.current.getBody(), true);
        editorRef.current.selection.collapse(false);
  
        setPrediction(''); // Clear the generated text after appending
    }
  }
  };

  return (
    <div className="text-slate-900 space-y-4">
      <div className="flex items-center justify-between">
        <CustomButtonAiGenerative setGenerateData={setEditorData} />
       <div className="flex items-center gap-x-5">
      <ThreeDot setTopic={setTopic}/>
        <PublishButton>
          <Button onClick={handleSubmit} className="text-sm" variant={"default"}>
            Publish
          </Button>
        </PublishButton>
       </div>
      </div>
      <div>
        <Input
          ref={titleRef}
          className="py-8 text-4xl focus-visible:outline-none border-none focus-visible:ring-0 shadow-none"
          placeholder="Title"
          onKeyDown={handleTitleKeyPress}
        />
      </div>
      <div>
        <ImageUpload setImageUrl={setImageUrl} />
      </div>
   <div className="relative">
   <Editor
        onKeyUp={handleEditorChange}
        onKeyDown={(e) => handleKeyDown(e,prediction)}
        onInit={(_evt, editor) => ((editorRef.current as any) = editor)}
        initialValue={editorData}
        id="editor"
        apiKey={process.env.NEXT_PUBLIC_TINYMC_API_KEY}
        init={{
          plugins:
            "autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist linkchecker tinymcespellchecker permanentpen powerpaste advtable editimage advtemplate mentions",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat",
          menubar: false,
          skin: "naked",
          icons: "thin",
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
      />
      {prediction && (
        <span className="text-muted-foreground z-50" style={{ position: 'absolute', right: '10rem', bottom: '-5px', paddingRight:"1rem" }}>
         <em className="text-xs">next word: </em> { prediction}
        </span>
      )}
   </div>
    </div>
  );
};

export default CustomEditorComponent;
