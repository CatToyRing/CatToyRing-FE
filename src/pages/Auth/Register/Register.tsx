import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  region: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: 실제 API 호출로 변경
      console.log("회원가입 시도:", data);

      // 로딩 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 회원가입 성공 후 로그인 페이지로 이동
      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 에러:", err);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <div className={styles.header}>
          <h1>회원가입</h1>
          <p>캣토이링과 함께 시작해보세요</p>
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
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임은 2자 이상이어야 합니다",
                },
                maxLength: {
                  value: 10,
                  message: "닉네임은 10자 이하여야 합니다",
                },
              })}
              className={errors.nickname ? styles.errorInput : ""}
            />
            {errors.nickname && (
              <span className={styles.errorMessage}>
                {errors.nickname.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="region">지역</label>
            <select
              id="region"
              {...register("region", {
                required: "지역을 선택해주세요",
              })}
              className={errors.region ? styles.errorInput : ""}
            >
              <option value="">지역을 선택하세요</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="제주시">제주시</option>
              <option value="서귀포시">서귀포시</option>
            </select>
            {errors.region && (
              <span className={styles.errorMessage}>
                {errors.region.message}
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

          <div className={styles.field}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
              className={errors.confirmPassword ? styles.errorInput : ""}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className={styles.checkboxSection}>
            <div className={styles.checkboxField}>
              <input
                id="agreeTerms"
                type="checkbox"
                {...register("agreeTerms", {
                  required: "이용약관에 동의해주세요",
                })}
              />
              <label htmlFor="agreeTerms">
                <span className={styles.required}>*</span> 이용약관에 동의합니다
              </label>
            </div>
            {errors.agreeTerms && (
              <span className={styles.errorMessage}>
                {errors.agreeTerms.message}
              </span>
            )}

            <div className={styles.checkboxField}>
              <input
                id="agreePrivacy"
                type="checkbox"
                {...register("agreePrivacy", {
                  required: "개인정보 처리방침에 동의해주세요",
                })}
              />
              <label htmlFor="agreePrivacy">
                <span className={styles.required}>*</span> 개인정보 처리방침에
                동의합니다
              </label>
            </div>
            {errors.agreePrivacy && (
              <span className={styles.errorMessage}>
                {errors.agreePrivacy.message}
              </span>
            )}
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className={styles.link}>
              로그인
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

export default Register;
