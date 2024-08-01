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
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [showSuggestion, setShowSuggestion] = useState(false);


  const handleTitleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      (editorRef.current as any).focus();
    }
  };

  const handleEditorChange = debounce(async () => {
    const content = editorRef.current?.getContent({ format: 'text' }) || '';

    if (content) {
      try {
        const response = await instance.post('http://127.0.0.1:5000/predict-next-word', { seed_text: content, next_words: 3 });
        setPrediction(response.data.generated_text);
        setShowSuggestion(true);
      } catch (error) {
        console.error(error);
        setShowSuggestion(false);
      }
    }
  }, 1000);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && showSuggestion) {
      e.preventDefault();
      const editor = editorRef.current;
      const content = editor.getContent({ format: 'text' }) || '';
      editor.setContent(content + prediction);
      editorRef.current.selection.select(editorRef.current.getBody(), true);
        editorRef.current.selection.collapse(false);
      setPrediction('');
      setShowSuggestion(false);
    }
  };

  useEffect(() => {
    if (prediction) {
      const editor = editorRef.current;
      const range = editor.selection.getRng();
      const rect = range.getBoundingClientRect();

      const offsetX = rect.right + window.scrollX + 5; // Adding 5px for some margin
      const offsetY = rect.bottom + window.scrollY;

      // Update the position of the suggestion box
      const suggestionBox = document.getElementById('suggestion-box');
      if (suggestionBox) {
        suggestionBox.style.left = `${offsetX}px`;
        suggestionBox.style.top = `${offsetY}px`;
      }
    }
  }, [prediction]);

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
      topic,
    };

    try {
      await instance.post("/api/stories", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-slate-900 space-y-4">
      <div className="flex items-center justify-between">
        <CustomButtonAiGenerative setGenerateData={setEditorData} />
        <div className="flex items-center gap-x-5">
          <ThreeDot setTopic={setTopic} />
          <PublishButton>
            <Button
              onClick={handleSubmit}
              className="text-sm"
              variant={"default"}
            >
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
      <div style={{ position: "relative" }}>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          onKeyUp={handleEditorChange}
          onKeyDown={handleKeyDown}
          apiKey={process.env.NEXT_PUBLIC_TINYMC_API_KEY}
          init={{
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat",
            menubar: false,
            skin: "naked",
            icons: "thin",
          }}
        />
        {showSuggestion && (
          <div
            id="suggestion-box"
            className="suggestion-box"
            style={{
              position: "absolute",
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              borderRadius: "3px",
              whiteSpace: "nowrap",
            }}
          >
            <span id="suggestion">{prediction}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomEditorComponent;
// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import instance from '@/lib/axios';
// import debounce from 'lodash/debounce';

// const CustomEditorComponent = () => {
//   const editorRef = useRef(null);
//   const [prediction, setPrediction] = useState('');
//   const [showSuggestion, setShowSuggestion] = useState(false);

//   const handleEditorChange = debounce(async () => {
//     const content = editorRef.current?.getContent({ format: 'text' }) || '';

//     if (content) {
//       try {
//         const response = await instance.post('http://127.0.0.1:5000/predict-next-word', { seed_text: content, next_words: 3 });
//         setPrediction(response.data.generated_text);
//         setShowSuggestion(true);
//       } catch (error) {
//         console.error(error);
//         setShowSuggestion(false);
//       }
//     }
//   }, 1000);

//   const handleKeyDown = (e) => {
//     if (e.key === 'Tab' && showSuggestion) {
//       e.preventDefault();
//       const editor = editorRef.current;
//       const content = editor.getContent({ format: 'text' }) || '';
//       editor.setContent(content + prediction);
//       editorRef.current.selection.select(editorRef.current.getBody(), true);
//         editorRef.current.selection.collapse(false);
//       setPrediction('');
//       setShowSuggestion(false);
//     }
//   };

//   useEffect(() => {
//     if (prediction) {
//       const editor = editorRef.current;
//       const range = editor.selection.getRng();
//       const rect = range.getBoundingClientRect();

//       const offsetX = rect.right + window.scrollX + 5; // Adding 5px for some margin
//       const offsetY = rect.bottom + window.scrollY;

//       // Update the position of the suggestion box
//       const suggestionBox = document.getElementById('suggestion-box');
//       if (suggestionBox) {
//         suggestionBox.style.left = `${offsetX}px`;
//         suggestionBox.style.top = `${offsetY}px`;
//       }
//     }
//   }, [prediction]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <Editor
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         onKeyUp={handleEditorChange}
//         onKeyDown={handleKeyDown}
//         apiKey={process.env.NEXT_PUBLIC_TINYMC_API_KEY}
//         init={{
//           toolbar:
//             "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | checklist numlist bullist indent | emoticons charmap | removeformat",
//           menubar: false,
//           skin: "naked",
//           icons: "thin",
//         }}
//       />
//       {showSuggestion && (
//         <div
//           id="suggestion-box"
//           className="suggestion-box"
//           style={{
//             position: 'absolute',
//             backgroundColor: 'black',
//             color: 'white',
//             padding: '5px',
//             borderRadius: '3px',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           <span  id="suggestion">{prediction}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomEditorComponent;
