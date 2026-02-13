import colorSharp from "../assets/img/color-sharp.png"


export const Skills = () => {


  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>I have a diverse set of skills ranging from Cloud Infrastructure to Backend Development.</p>
              <div className="row">
                <div className="col-md-4">
                  <h5>Cloud & DevOps</h5>
                  <ul className="list-unstyled">
                    <li>AWS (IAM, EC2, EKS, VPC, S3, RDS, Route53)</li>
                    <li>Kubernetes & Docker</li>
                    <li>Terraform & Crossplane</li>
                    <li>Jenkins, GitLab CI, GitHub Actions</li>
                    <li>ArgoCD & Helm</li>
                    <li>Ansible</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>Backend & Programming</h5>
                  <ul className="list-unstyled">
                    <li>Python (Flask)</li>
                    <li>JavaScript (Node.js Express)</li>
                    <li>Golang</li>
                    <li>PostgreSQL & SQLite</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5>Monitoring & Tools</h5>
                  <ul className="list-unstyled">
                    <li>Prometheus & Grafana</li>
                    <li>Loki</li>
                    <li>Git, GitHub, GitLab</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
