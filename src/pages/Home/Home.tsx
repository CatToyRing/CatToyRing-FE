import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import styles from "./Home.module.css";

// 임시 데이터
const mockPopularToys = [
  { id: "1", title: "낚싯대 장난감", price: 15000, region: "강남구" },
  { id: "2", title: "터널 장난감", price: 25000, region: "서초구" },
  { id: "3", title: "스크래처", price: 35000, region: "강남구" },
];

const mockRecommended = [
  { id: "4", title: "공 장난감", price: 8000, compatibility: 95 },
  { id: "5", title: "쥐 인형", price: 12000, compatibility: 88 },
  { id: "6", title: "숨숨집", price: 40000, compatibility: 92 },
];

const mockCommunityPosts = [
  { id: "1", title: "우리 고양이가 가장 좋아하는 장난감은?", likes: 24 },
  { id: "2", title: "스크래처 추천 부탁드려요", likes: 18 },
  { id: "3", title: "제주시 고양이 집사 모임", likes: 15 },
];

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className={styles.container}>
      {/* 간단한 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>캣토이링</h1>
          <nav className={styles.nav}>
            {isAuthenticated ? (
              <>
                <Link to="/products">상품목록</Link>
                <Link to="/profile">{user?.nickname}</Link>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/register">회원가입</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {/* 히어로 섹션 */}
        <section className={styles.hero}>
          <h2>고양이도 새로운 걸 원해요</h2>
          {isAuthenticated && <p>안녕하세요 {user?.nickname}님!</p>}
        </section>

        {/* 내 근처 인기 장난감 */}
        <section className={styles.section}>
          <h3>
            {isAuthenticated && user?.region
              ? `${user.region} 인기 장난감`
              : "인기 장난감"}
          </h3>
          <div className={styles.productGrid}>
            {mockPopularToys.map((toy) => (
              <div key={toy.id} className={styles.productCard}>
                <h4>{toy.title}</h4>
                <p>{toy.price.toLocaleString()}원</p>
                <span>{toy.region}</span>
              </div>
            ))}
          </div>
          <Link to="/products" className={styles.moreBtn}>
            더보기
          </Link>
        </section>

        {/* 추천 장난감 */}
        <section className={styles.section}>
          <h3>{isAuthenticated ? "맞춤 추천 장난감" : "추천 장난감"}</h3>
          <div className={styles.productGrid}>
            {mockRecommended.map((toy) => (
              <div key={toy.id} className={styles.productCard}>
                <h4>{toy.title}</h4>
                <p>{toy.price.toLocaleString()}원</p>
                {isAuthenticated && (
                  <span className={styles.compatibility}>
                    호환성 {toy.compatibility}%
                  </span>
                )}
              </div>
            ))}
          </div>
          <Link to="/products" className={styles.moreBtn}>
            더보기
          </Link>
        </section>

        {/* 커뮤니티 인기글 */}
        <section className={styles.section}>
          <h3>커뮤니티 인기글</h3>
          <div className={styles.postList}>
            {mockCommunityPosts.map((post) => (
              <div key={post.id} className={styles.postItem}>
                <h4>{post.title}</h4>
                <span>좋아요 {post.likes}</span>
              </div>
            ))}
          </div>
          <button className={styles.moreBtn}>더보기</button>
        </section>

        {/* 로그인 유도 (비로그인 사용자) */}
        {!isAuthenticated && (
          <section className={styles.cta}>
            <h3>더 많은 기능을 이용하려면?</h3>
            <div className={styles.ctaButtons}>
              <Link to="/login" className={styles.loginBtn}>
                로그인
              </Link>
              <Link to="/register" className={styles.signupBtn}>
                회원가입
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
