import React, { useEffect, useState }from 'react'
import Navbar from "../components/Navbar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'


const STORAGE_KEY = "diary-content";

export default function Diary() {
    const [initialContent, setInitialContent] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setInitialContent(JSON.parse(saved));
        }
        } catch (error) {
        console.error("localStorage'dan yükleme hatası:", error);
        }
        setIsLoaded(true);
    }, []);

      // Editor henüz yüklenmemişse loading göster
    if (!isLoaded) {
        return <div>Yükleniyor...</div>;
    }

  return (
    <div className='diary-page'>
        <Navbar/>
        <div className='editor'>
            <SimpleEditor
                key={initialContent ? "loaded" : "empty"} // İçerik değiştiğinde yeniden mount et
                initialContent={initialContent}
                onUpdate={(content) => {
                // Her değişiklikte localStorage'a kaydet
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
                } catch (error) {
                    console.error("localStorage'a kaydetme hatası:", error);
                }
                }}
            />
            <button>Günlüğü Kaydet!</button>
        </div>
    </div>
  )
}
