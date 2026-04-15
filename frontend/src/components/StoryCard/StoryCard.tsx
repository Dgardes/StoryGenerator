import { useNavigate } from "react-router";
import styles from "./StoryCard.module.css";

import fantasyImg from "../../assets/fantasyImg.jpg";
import apocalypseImg from "../../assets/apocalypseImg.jpg";
import cyberpunkImg from "../../assets/cyberpunkImg.jpg";

interface StoryCardProps {
    id: string;
    title: string;
    setting: string;
    createdAt: Date;
}

const settingImages : Record<string, string> =
{
    "fantasy" : fantasyImg,
    "apocalypse" : apocalypseImg,
    "cyberpunk" : cyberpunkImg
};


export default function StoryCard({id, title, setting, createdAt}: StoryCardProps) 
{
    const navigate = useNavigate();
    const backgroundImg = settingImages[setting] || fantasyImg;
    return (
        <div className={styles.card} style={{ backgroundImage: 'url(' + backgroundImg + ')' }}> 
            <div className={styles.overlay}>
                <span className={styles.date}>{new Date(createdAt).toLocaleDateString()}</span>
                
                <div className={styles.bottom}>
                    <h2 className={styles.title}>{title}</h2>
                    <button
                    className={styles.detailBtn}
                    onClick={() => {
                        navigate("/stories/" + id);
                    }}
                    >
                    Подивитися
                    </button>
                </div>
            </div>
        </div>
    );
}
