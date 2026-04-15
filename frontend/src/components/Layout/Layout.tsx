import { NavLink, Outlet } from "react-router";
import styles from "./Layout.module.css";

export default function Layout() 
{  
    function getLinkClass(data: { isActive: any; }) {
    const activeStatus = data.isActive;

    if (activeStatus === true) {
        return styles.link + " " + styles.active;
    } else {
        return styles.link;
    }
}

  return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <span className={styles.logo}>Story Generator</span>
                <nav className={styles.nav}>
                    
                    <NavLink to="/stories" end className={getLinkClass}>
                        Всі історії
                    </NavLink>

                    <NavLink to="/create" className={getLinkClass}>
                        Нова історія
                    </NavLink> 
                </nav>
            </header>

            <main className={styles.main}><Outlet /></main>
        </div>
    );
}