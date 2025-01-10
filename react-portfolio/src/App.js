import { useState, useEffect } from 'react';
import Masonry from 'responsive-masonry-layout';
import ProjectCard from './components/ProjectCard.js';
import TagSortDropdown from './components/TagSortDropdown.js';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Failed to load projects.json');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const allTags = Array.from(
    new Set(
      projects.flatMap((project) => project.tags.map((tag) => tag.label)),
    ),
  );

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const filteredProjects = selectedTag
    ? projects.filter((project) =>
        project.tags.some((tag) => tag.label === selectedTag),
      )
    : projects;

  const projectCards = filteredProjects.map((project) => (
    <ProjectCard
      key={project.id}
      image={project.image}
      title={project.title}
      date={project.date}
      description={project.description}
      link={project.link}
      tags={project.tags}
    />
  ));

  return (
    <div className="projects-section">
      <TagSortDropdown tags={allTags} onTagSelect={handleTagSelect} />
      <Masonry items={projectCards} columnWidth={22 + 2 * 0.0625} maxColumns={3} spacing={2} />
    </div>
  );
}

export default App;
