import { useState, useEffect, useRef } from 'react';
import './App.css';
import Masonry from 'responsive-masonry-layout';
import Card from './components/Card.js';
import SegmentedControl from './components/SegmentedControl.js';
import TagFilterDropdown from './components/TagFilterDropdown.js';
import { ReactTyped } from 'react-typed';

function App() {
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState('projects');
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/employment.json');
        if (!response.ok) {
          throw new Error('Failed to load employment.json');
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    setSelectedTag('');
  }, [view]);

  const allTags = Array.from(
    new Set(
      (view === 'projects' ? projects : jobs).flatMap((card) =>
        card.tags.map((tag) => tag.label),
      ),
    ),
  );

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const filteredCards = selectedTag
    ? (view === 'projects' ? projects : jobs).filter((card) =>
        card.tags.some((tag) => tag.label === selectedTag),
      )
    : (view === 'projects' ? projects : jobs);

  const cards = filteredCards.map((item) => (
    <Card
      key={item.id}
      image={item.image}
      title={item.title}
      subtitle={
        view === 'projects' ? item.date : item.company + ' • ' + item.date
      }
      description={item.description}
      link={item.link}
      tags={item.tags}
    />
  ));

  return (
    <div className="content-container">
      {/* Intro Section */}
      <h1 className="section-heading">
        <ReactTyped strings={['Hi,', "Hi, I'm John Doe"]} backDelay={1000} typeSpeed={30} />
      </h1>
      <a href="/resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
        Resume
      </a>

      {/* Technical Experience Section */}
      <h1 className="section-heading">Technical Experience</h1>
      <SegmentedControl
        defaultIndex={0}
        callback={(value) => setView(value)}
        segments={[
          {
            label: 'Projects',
            value: 'projects',
            ref: useRef(),
          },
          {
            label: 'Employment',
            value: 'employment',
            ref: useRef(),
          },
        ]}
      />
      <TagFilterDropdown key={view} tags={allTags} onTagSelect={handleTagSelect} />
      <Masonry items={cards} columnWidth={22 + 2 * 0.0625} maxColumns={3} spacing={2} />
    </div>
  );
}

export default App;
