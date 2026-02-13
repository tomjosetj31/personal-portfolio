import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, projectUrl }) => {
  return (
    <Col size={12} sm={6} md={6}>
      <div className="proj-card-txt">
        <h4>{title}</h4>
        <span>{description}</span>
        {projectUrl && (
          <div style={{ marginTop: '20px' }}>
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', border: '1px solid #fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>View Project</a>
          </div>
        )}
      </div>
    </Col>
  )
}
