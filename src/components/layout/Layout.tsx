// src/components/layout/Layout/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import styles from "./Layout.module.css";

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            캣토이링
          </Link>

          <nav className={styles.nav}>
            <Link to="/products">상품 목록</Link>
            {isAuthenticated && <Link to="/products/new">판매하기</Link>}
          </nav>

          <div className={styles.userMenu}>
            {isAuthenticated ? (
              <>
                <Link to="/profile">{user?.nickname || "내 정보"}</Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/register">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <p>&copy; 2024 캣토이링. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
