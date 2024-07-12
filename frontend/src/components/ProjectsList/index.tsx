import React from 'react';
import { UserProjectData } from '../../types/user.type';
import { ProjectListElement } from '../ProjectListElement';

type ProjectsListProps = {
  projects: UserProjectData[];
};

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {projects.map((userProject, index) => (
        <div key={`project-${userProject.id}`}>
          <ProjectListElement
            accessLevel={userProject.accessLevel}
            handleAccordionChange={handleAccordionChange}
            expanded={expanded}
            id={userProject.project.id}
            title={userProject.project.title}
            description={userProject.project.description}
          />
        </div>
      ))}
    </>
  );
};
