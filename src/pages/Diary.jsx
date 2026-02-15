import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Diary() {
    const [htmlContent, setHtmlContent] = useState(""); // HTML olarak tut
    const [isLoaded, setIsLoaded] = useState(false);

    // Sayfa açıldığında localStorage'dan oku
    useEffect(() => {
        const saved = localStorage.getItem("gunluk");
        if (saved) {
            setHtmlContent(saved);
        }
        setIsLoaded(true);
    }, []);

    // Kaydet
    const kaydet = () => {
        localStorage.setItem("gunluk", htmlContent);
        alert(" Kaydedildi!");
    };

    if (!isLoaded) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className='diary-page'>
            <Navbar/>
            <div className='editor'>
                <SimpleEditor
                    onUpdate={(editor) => {
                        // Editor'dan HTML al (okunabilir)
                        const html = editor.getHTML();
                        setHtmlContent(html);
                    }}
                />
                <button onClick={kaydet}>
                    Günlüğü Kaydet!
                </button>
            </div>
        </div>
    )
}