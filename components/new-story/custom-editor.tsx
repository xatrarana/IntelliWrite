// 'use client';
// import React, { useRef } from 'react';

// const CustomTextEditor: React.FC = () => {
//   const titleRef = useRef<HTMLInputElement>(null);
//   const textRef = useRef<HTMLTextAreaElement>(null);

//   const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       if (textRef.current) {
//         textRef.current.focus(); // Focus on the textarea
//       }
//     }
//   };

//   const handleTextKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter') {
//       event.preventDefault(); // Prevent default new line behavior
//       const currentValue = textRef.current?.value || '';
//       alert(currentValue); // Show alert with current textarea content
//       // Add new line manually
//       if (textRef.current) {
//         const start = textRef.current.selectionStart;
//         const end = textRef.current.selectionEnd;

//         // Insert new line at the cursor position
//         textRef.current.value = currentValue.substring(0, start) + '\n' + currentValue.substring(end);
        
//         // Move cursor to the new line
//         textRef.current.selectionStart = textRef.current.selectionEnd = start + 1;
//       }
//     }
//   };

//   return (
//     <div className='space-y-5'>
//       <div>
//         <input
//           ref={titleRef}
//           type='text'
//           onKeyUp={handleTitleKeyPress}
//           className='py-8 text-4xl focus-visible:outline-none border-none focus-visible:ring-0 shadow-none w-full p-4 border border-gray-300 rounded'
//           placeholder='Title'
//         />
//       </div>
//       <textarea
//         ref={textRef}
//         onKeyDown={handleTextKeyPress}
//         rows={10}
//         className='w-full p-4 border border-gray-300 rounded'
//         placeholder='Type your text here...'
//       />
//     </div>
//   );
// };

// export default CustomTextEditor;
'use client';
import React, { useRef, useState } from 'react';

const CustomTextEditor: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [formattedContent, setFormattedContent] = useState<string>('');

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (textRef.current) {
        textRef.current.focus(); // Focus on the textarea
      }
    }
  };

  const handleTextKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default new line behavior

      const textarea = textRef.current;
      if (textarea) {
        const currentValue = textarea.value.trim();

        if (currentValue) {
          // Wrap the current content in <p> tags
          const newParagraph = `<p>${currentValue}</p>`;
          
          // Append the new paragraph to the formatted content
          setFormattedContent(prev => prev + (prev ? '\n' : '') + newParagraph);

          // Clear the textarea
          textarea.value = '';

          // Optionally, alert the formatted paragraph
          alert(newParagraph);
        }
      }
    }
  };

  return (
    <div className='space-y-5'>
      <div>
        <input
          ref={titleRef}
          type='text'
          onKeyPress={handleTitleKeyPress}
          className='py-8 text-4xl focus-visible:outline-none border-none focus-visible:ring-0 shadow-none w-full p-4 border border-gray-300 rounded'
          placeholder='Title'
        />
      </div>
      <textarea
        ref={textRef}
        onKeyDown={handleTextKeyPress}
        rows={10}
        className='w-full p-4 border border-gray-300 rounded'
        placeholder='Type your text here...'
      />
      <div className='mt-5'>
        <h3>Formatted Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>
    </div>
  );
};

export default CustomTextEditor;


