import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/authStore";
import styles from "./Login.module.css";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login, setLoading, isLoading } = useAuthStore();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");

    try {
      // TODO: 실제 API 호출로 변경
      console.log("로그인 시도:", data);

      // 임시 로그인 처리 (실제로는 API 호출)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션

      // 임시 사용자 데이터
      const mockUser = {
        id: "1",
        email: data.email,
        nickname: "고양이집사",
        region: "서울시 강남구",
        createdAt: new Date().toISOString(),
      };

      const mockToken = "mock-jwt-token";

      login(mockUser, mockToken);
      navigate("/");
    } catch (err) {
      console.error("로그인 에러:", err);
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1>로그인</h1>
          <p>캣토이링에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식을 입력해주세요",
                },
              })}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자 이상이어야 합니다",
                },
              })}
              className={errors.password ? styles.errorInput : ""}
            />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            계정이 없으신가요?{" "}
            <Link to="/register" className={styles.link}>
              회원가입
            </Link>
          </p>
          <Link to="/" className={styles.homeLink}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
