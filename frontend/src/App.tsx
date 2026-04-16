import { useEffect, useState } from "react";
import type { CreateStoryDto, Story } from "./types/story";
import { storyApi } from "./api/backendApi";
import { Navigate, Route, Routes } from "react-router-dom";
import StoriesPage from "./pages/StoriesPage/StoriesPage";
import CreateStoryPage from "./pages/CreateStoryPage/CreateStoryPage";
import StoryDetails from "./pages/StoryDetails/StoryDetails";
import Layout from "./components/Layout/Layout";

export default function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //завантаження даних при старті
  useEffect(function() {
    storyApi.getAll()
      .then(data => { setStories(data); setIsLoading(false); })
      .catch(err => console.error("Бекенд не відповідає", err));
  }, []);

  const handleAddStory = async function(dto: CreateStoryDto) {
    const newStory = await storyApi.create(dto);
    setStories([newStory, ...stories]);
  };

  const handleDeleteStory = async function(id: string) {
    await storyApi.delete(id);
    setStories(stories.filter(s => s.id !== id));
  };

const handleUpdateStory = async function(updatedStory: Story) {
  const savedStory = await storyApi.update(updatedStory.id, updatedStory);
  setStories(stories.map(s => s.id === savedStory.id ? savedStory : s));
};

  if (isLoading) return <div>Завантаження</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StoriesPage stories={stories} />} />
        <Route path="stories" element={<StoriesPage stories={stories} />} />
        <Route path="create" element={<CreateStoryPage onAdd={handleAddStory} />} />
        <Route path="stories/:id" element={ 
          <StoryDetails stories={stories} onDelete={handleDeleteStory} onUpdate={handleUpdateStory}/>
          }/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}