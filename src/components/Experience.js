import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Experience = () => {
    return (
        <section className="experience" id="experience">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Professional Experience</h2>
                                    <div className="experience-item">
                                        <h3>DevOps Engineer</h3>
                                        <h4>Kotaicode GmbH | Frankfurt, Germany</h4>
                                        <span>05/2021 – Present</span>
                                        <ul>
                                            <li>Built and maintained CI/ CD pipelines using GitHub Actions and GitLab CI, reducing deployment time by ~40% and enabling automated testing and deployments across multiple environments.</li>
                                            <li>Designed and operated containerized platforms using Docker and Kubernetes (EKS) on AWS, improving application availability and scalability in production environments.</li>
                                            <li>Implemented observability and alerting with Prometheus, Grafana, and Loki, reducing incident detection and response time and improving system reliability.</li>
                                            <li>Managed and secured AWS infrastructure including EC2, EKS, ECR, S3, IAM, VPC, and Route53, supporting business-critical production workloads.</li>
                                            <li>Optimized cloud costs through AWS Cost Explorer analysis and dynamic node provisioning with Karpenter, reducing AWS infrastructure costs by ~30%.</li>
                                            <li>Implemented GitOps-based deployments using ArgoCD and standardized releases with Helm charts, increasing deployment frequency and improving rollback reliability.</li>
                                            <li>Automated infrastructure provisioning and lifecycle management using Terraform and Crossplane, reducing manual configuration errors and improving environment consistency.</li>
                                            <li>Collaborated on the development and operation of production applications, supporting backend services (Python, Node.js, Golang), frontend builds (React.js), and relational databases (PostgreSQL, SQLite) in CI/CD-driven, containerized environments.</li>
                                        </ul>
                                    </div>
                                    <hr style={{ borderColor: 'white', margin: '40px 0' }} />
                                    <h2>Education</h2>
                                    <div className="experience-item">
                                        <h3>Bachelor of Technology</h3>
                                        <h4>Govt. Engineering College Palakkad | Palakkad, India</h4>
                                        <span>08/2016 – 09/2020</span>
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-left" src={colorSharp} alt="Image" />
        </section>
    )
}
