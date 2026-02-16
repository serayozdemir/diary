import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

export default function Diary() {
    const [htmlContent, setHtmlContent] = useState(""); 
    const [tarihler, setTarihler] = useState([]);
    const [popupIcerik, setPopupIcerik] = useState(null); // Pop-up içeriği

    // Sayfa açıldığında localStorage'daki tüm tarihleri al
    useEffect(() => {
        const tumTarihler = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
                tumTarihler.push(key);
            }
        }
        setTarihler(tumTarihler);
    }, []);

    // Bugünün tarihini al
    const bugunTarih = () => {
        const tarih = new Date();
        const yil = tarih.getFullYear();
        const ay = String(tarih.getMonth() + 1).padStart(2, '0');
        const gun = String(tarih.getDate()).padStart(2, '0');
        return `${yil}-${ay}-${gun}`;
    };

    // Kaydet
    const kaydet = () => {
        const bugun = bugunTarih();
        
        const mevcutGunluk = localStorage.getItem(bugun);
        let yeniIcerik = htmlContent;
        
        if (mevcutGunluk) {
            const eski = JSON.parse(mevcutGunluk);
            yeniIcerik = eski.icerik + htmlContent;
        }
        
        const gunluk = {
            tarih: bugun,
            icerik: yeniIcerik
        };
        localStorage.setItem(bugun, JSON.stringify(gunluk));
        
        if (!tarihler.includes(bugun)) {
            setTarihler([...tarihler, bugun]);
        }
        
        alert(" Kaydedildi!");
    };

    // Tarih butonuna tıklayınca
    const tarihGoster = (tarih) => {
        const gunluk = localStorage.getItem(tarih);
        if (gunluk) {
            const parsed = JSON.parse(gunluk);
            setPopupIcerik(parsed);
        }
    };

    // Pop-up'ı kapat
    const popupKapat = () => {
        setPopupIcerik(null);
    };

    return (
        <div className='diary-page'>
            <Navbar/>
            <div className='editor'>
                <SimpleEditor
                    onUpdate={(editor) => {
                        const html = editor.getHTML();
                        setHtmlContent(html);
                    }}
                />
                <button className='save-button' onClick={kaydet}>
                    Günlüğü Kaydet!
                </button>
            </div>
            <hr className="separator" />
            <div className='saved-diaries'>
                <h4>Kaydedilen Günlükler</h4>
                {tarihler.map((tarih) => (
                    <button key={tarih} onClick={() => tarihGoster(tarih)}>
                        {tarih}
                    </button>
                ))}
            </div>

            {/* Pop-up */}
            {popupIcerik && (
                <div className='popup-overlay' onClick={popupKapat}>
                    <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                        <button className='popup-close' onClick={popupKapat}>✕</button>
                        <h2>{popupIcerik.tarih}</h2>
                        <div dangerouslySetInnerHTML={{ __html: popupIcerik.icerik }} />
                    </div>
                </div>
            )}
        </div>
    )
}