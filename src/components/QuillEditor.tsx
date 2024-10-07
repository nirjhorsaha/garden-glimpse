/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const quillRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (quillRef.current) {
            editorRef.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image', 'clean'],
                    ],
                },
            });

            editorRef.current.on('text-change', () => {
                const content = editorRef.current?.root.innerHTML || '';
                onChange(content); // Call onChange to update the value in the form
            });

            // Set initial content
            editorRef.current.root.innerHTML = value;
        }
    }, [value, onChange]);

    return <div ref={quillRef} className="quill-editor" />;
};

export default QuillEditor;
