import { Link, useParams } from "react-router-dom";
import type { Story } from "../../types/story";
import styles from "./StoryDetails.module.css";
import { useState } from "react";


interface StoryDetailsProps {
  stories: Story[];
  onUpdate: (story: Story) => void;
  onDelete: (id: string) => void;
}

export default function TaskDetailPage({ stories, onUpdate, onDelete } : StoryDetailsProps) {

    const { id } = useParams<{ id: string }>();
    
    const story = stories.find((story) => story.id === id);
    const [isEditing, setIsEditing] = useState(false);

    const [editTitle, setEditTitle] = useState(story?.title || "");
    const [editContent, setEditContent] = useState(story?.content || "");
    
    if (!story) {
    return (
        <div className={styles.notFound}>
        <p>Такої історії не існує.</p>
        <Link to="/tasks">Назад до списку історій</Link>
        </div>
    );
    }

    const handleSave = () => {
    const updatedStory: Story = {
      ...story,
      title: editTitle,
      content: editContent,
    };
    
    onUpdate(updatedStory); 
    setIsEditing(false);
  };

    return (
        <div className={styles.container}>
      {isEditing ? (

        <div className={styles.editForm}>
          <input 
            className={styles.editTitleInput}
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
          />
          <textarea 
            className={styles.editContentArea}
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
          />
          <div className={styles.actions}>
            <button onClick={handleSave} className={styles.saveBtn}>Зберегти</button>
            <button onClick={() => setIsEditing(false)}>Скасувати</button>
          </div>
        </div>
      ) : (
        
        <>
          <h1 className={styles.title}>{story.title}</h1>
          <div className={styles.content}>
            {story.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)}>Редагувати</button>
            <button onClick={() => onDelete(story.id)} className={styles.deleteBtn}>Видалити</button>
          </div>
        </>
      )}
    </div>
    );
}