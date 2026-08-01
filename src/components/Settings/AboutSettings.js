import "./AboutSettings.css";


function AboutSettings() {
    return (

        <div className="about-settings">
            <h2>About feyaPlan</h2>

            <p className="settings-description">Information about the application and project.</p>

            <div className="about-card">
                <h3>feyaPlan</h3>
                <p>
                    A project management application designed to help teams
                    organize projects, manage tasks, track progress, and
                    generate reports.
                </p>


            </div>

            <div className="about-card">
                <h3>Application Details</h3>
                <ul>
                    <li>Version: 1.0.0</li>

                    <li>Platform: Web Application</li>

                    <li>Built with: React</li>

                    <li> Status: Development Version</li>
                </ul>
            </div>

            <div className="about-card">
                <h3>Main Features</h3>
                <ul>
                    <li>Project management</li>

                    <li>Task tracking</li>

                    <li>Calendar planning</li>

                    <li>Reports and analytics</li>

                    <li>User preferences</li>
                </ul>
            </div>

            <div className="about-footer">
                <p>© 2026 feyaPlan. All rights reserved.</p>
            </div>
        </div>
    );
}


export default AboutSettings;