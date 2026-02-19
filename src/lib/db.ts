import { supabase, setUserContext, isSupabaseConfigured } from './supabase';

export interface WeeklyGoal {
    id?: string;
    week_start: string;
    goal_type: string;
    target_count: number;
    current_count: number;
    completed: boolean;
    notes?: string;
}

export interface ProgressLog {
    id?: string;
    logged_at: string;
    activity_type: string;
    streak_count: number;
    total_sessions: number;
    milestone?: string;
    achievement?: string;
    reflection?: string;
}

export interface JournalEntry {
    id?: string;
    logged_at: string;
    title?: string;
    content: string;
    mood_before?: number;
    mood_after?: number;
    tags: string[];
    is_private: boolean;
    word_count?: number;
}

const MOCK_GOALS: WeeklyGoal[] = [
    { week_start: new Date().toISOString(), goal_type: 'Meditation', target_count: 7, current_count: 3, completed: false }
];

const MOCK_LOGS: ProgressLog[] = [
    { logged_at: new Date().toISOString(), activity_type: 'Zen', streak_count: 5, total_sessions: 20 }
];

export async function upsertUser(userId: number): Promise<void> {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
    } catch (e) {
        console.warn('DB: upsertUser failed:', e);
    }
}

export async function saveWeeklyGoal(userId: number, goal: WeeklyGoal) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase.from('weekly_goals').insert({
            user_id: userId,
            ...goal
        });
        if (error) throw error;
    } catch (e) {
        console.error('DB: saveWeeklyGoal failed:', e);
    }
}

export async function getWeeklyGoals(userId: number): Promise<WeeklyGoal[]> {
    if (!isSupabaseConfigured) return MOCK_GOALS;
    try {
        await setUserContext(userId);
        const { data, error } = await supabase
            .from('weekly_goals')
            .select('*')
            .eq('user_id', userId)
            .order('week_start', { ascending: false });

        if (error) throw error;
        return data || MOCK_GOALS;
    } catch (e) {
        console.error('DB: getWeeklyGoals failed:', e);
        return MOCK_GOALS;
    }
}

export async function saveJournalEntry(userId: number, entry: JournalEntry) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase.from('journal_entries').insert({
            user_id: userId,
            ...entry
        });
        if (error) throw error;
    } catch (e) {
        console.error('DB: saveJournalEntry failed:', e);
    }
}

export async function saveProgressLog(userId: number, log: ProgressLog) {
    if (!isSupabaseConfigured) return;
    try {
        await setUserContext(userId);
        const { error } = await supabase.from('progress_logs').insert({
            user_id: userId,
            ...log
        });
        if (error) throw error;
    } catch (e) {
        console.error('DB: saveProgressLog failed:', e);
    }
}

export async function getProgressLogs(userId: number): Promise<ProgressLog[]> {
    if (!isSupabaseConfigured) return MOCK_LOGS;
    try {
        await setUserContext(userId);
        const { data, error } = await supabase
            .from('progress_logs')
            .select('*')
            .eq('user_id', userId)
            .order('logged_at', { ascending: false });

        if (error) throw error;
        return data || MOCK_LOGS;
    } catch (e) {
        console.error('DB: getProgressLogs failed:', e);
        return MOCK_LOGS;
    }
}