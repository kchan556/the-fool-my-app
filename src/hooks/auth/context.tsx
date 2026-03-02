'use client';

import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { recordIpAddress } from '@/actions/ip';

/**
 * 隱崎ｨｼ繧ｹ繧ｭ繝・・譎ゅ・繝｢繝・け繝ｦ繝ｼ繧ｶ繝ｼ
 */
const MOCK_USER = (id: string = 'mock-user-id'): User => ({
  id,
  app_metadata: {},
  user_metadata: {
    avatar_url: '',
    full_name: '繝ｭ繝ｼ繧ｫ繝ｫ髢狗匱繝ｦ繝ｼ繧ｶ繝ｼ',
    name: '繝ｭ繝ｼ繧ｫ繝ｫ髢狗匱繝ｦ繝ｼ繧ｶ繝ｼ',
    preferred_username: 'local_dev',
    provider_id: 'mock-discord-id',
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
});

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthSkipped: boolean;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  authSkip: boolean;
};

export const AuthProvider = ({ children, authSkip }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 隱崎ｨｼ繧ｹ繧ｭ繝・・繝｢繝ｼ繝峨・蝣ｴ蜷・
    if (authSkip) {
      setUser(MOCK_USER(localStorage.getItem('playerId') || undefined));
      setSession(null);
      setIsLoading(false);
      return;
    }

    // Supabase迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・↑縺・ｴ蜷・
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ縲りｪ崎ｨｼ讖溯・縺ｯ辟｡蜉ｹ縺ｧ縺吶・);
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // 蛻晄悄繧ｻ繝・す繝ｧ繝ｳ繧貞叙蠕・
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('繧ｻ繝・す繝ｧ繝ｳ蜿門ｾ励お繝ｩ繝ｼ:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // 隱崎ｨｼ迥ｶ諷九・螟画峩繧堤屮隕・
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [authSkip]);

  // 繝ｦ繝ｼ繧ｶ繝ｼ遒ｺ螳壽凾縺ｫIP繧｢繝峨Ξ繧ｹ繧定ｨ倬鹸
  const ipRecorded = useRef(false);
  const lastRecordedUserId = useRef<string | null>(null);
  useEffect(() => {
    if (!user || isLoading) return;
    if (ipRecorded.current && lastRecordedUserId.current === user.id) return;
    ipRecorded.current = true;
    lastRecordedUserId.current = user.id;

    if (authSkip) {
      // 繧ｲ繧ｹ繝・ guestId繧呈ｸ｡縺呻ｼ・anoid蠖｢蠑擾ｼ・
      recordIpAddress(user.id).catch(error => {
        console.error('IP繧｢繝峨Ξ繧ｹ險倬鹸繧ｨ繝ｩ繝ｼ:', error);
      });
    } else {
      // 繝ｭ繧ｰ繧､繝ｳ繝ｦ繝ｼ繧ｶ繝ｼ: 繧ｵ繝ｼ繝舌・縺ｧ繧ｻ繝・す繝ｧ繝ｳ縺九ｉ蜿門ｾ励☆繧九・縺ｧ蠑墓焚縺ｪ縺・
      recordIpAddress().catch(error => {
        console.error('IP繧｢繝峨Ξ繧ｹ險倬鹸繧ｨ繝ｩ繝ｼ:', error);
      });
    }
  }, [user, isLoading, authSkip]);

  const signInWithDiscord = useCallback(async () => {
    if (authSkip) {
      // 繧ｹ繧ｭ繝・・繝｢繝ｼ繝峨〒縺ｯ菴輔ｂ縺励↑縺・
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Discord繝ｭ繧ｰ繧､繝ｳ繧ｨ繝ｩ繝ｼ:', error);
      throw error;
    }
  }, [authSkip]);

  const signOut = useCallback(async () => {
    if (authSkip) {
      // 繧ｹ繧ｭ繝・・繝｢繝ｼ繝峨〒縺ｯ菴輔ｂ縺励↑縺・
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('繝ｭ繧ｰ繧｢繧ｦ繝医お繝ｩ繝ｼ:', error);
      throw error;
    }
  }, [authSkip]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthSkipped: authSkip,
        signInWithDiscord,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
