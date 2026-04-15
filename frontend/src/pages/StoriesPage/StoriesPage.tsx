import StoryCard from "../../components/StoryCard/StoryCard";
import type { Story } from "../../types/story";
import styles from "./StoriesPage.module.css";

interface StoriesPageProps {
    stories: Story[];
    
}

export default function StoriesPage({stories} : StoriesPageProps) {


  return (
    <div className={styles.stories}>
        <h2>Історії</h2>
        <hr className={styles.separator} />

        {stories.length === 0 && (
        <p className={styles.noStories}>
        Історії поки немає. Час пригод!
        </p>)}       

        <div className={styles.flowLayoutPanel}>
        {stories.map((story) => (
            <StoryCard 
                key={story.id}
                id={story.id} 
                title={story.title}
                setting={story.character.setting}
                createdAt={story.createdAt}
            />
        ))}
        </div>
    </div>
  );
}