// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 사용자 타입 정의
export interface User {
  id: string;
  email: string;
  nickname: string;
  region: string;
  profileImage?: string;
  createdAt: string;
}

// 인증 상태 타입
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 인증 액션 타입
interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // 초기 상태
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // 로그인 액션
      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      // 로그아웃 액션
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (updatedUser: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updatedUser },
          });
        }
      },

      // 로딩 상태 설정
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      // 저장할 상태만 선택 (isLoading은 저장하지 않음)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
