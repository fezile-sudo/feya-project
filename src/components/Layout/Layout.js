import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

import "./Layout.css";

function Layout({ children }) {
    return (
        <div className="layout">

            <Sidebar />

            <div className="content">

                <Header />

                <main>

                    {children}

                </main>

            </div>

        </div>
    );
}

export default Layout;