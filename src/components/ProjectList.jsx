import { Project } from "./Project";
import { projects } from "../data/projects";

export const ProjectList = () => {
  return (
    <div className="project-list">
      <h1>Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Project
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};
