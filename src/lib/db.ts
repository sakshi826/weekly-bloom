import { supabase, setUserContext } from './supabase';

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

export interface MoodEntry {
    id?: string;
    mood_rating: number;
    label: string;
    notes: string;
    logged_at: string;
}

export async function upsertUser(userId: number): Promise<void> {
    await setUserContext(userId);
    const { error } = await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
    if (error) throw error;
}

export async function saveWeeklyGoal(userId: number, goal: WeeklyGoal) {
    await setUserContext(userId);
    const { error } = await supabase.from('weekly_goals').insert({
        user_id: userId,
        ...goal
    });
    if (error) throw error;
}

export async function getWeeklyGoals(userId: number): Promise<WeeklyGoal[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('weekly_goals')
        .select('*')
        .eq('user_id', userId)
        .order('week_start', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function saveJournalEntry(userId: number, entry: JournalEntry) {
    await setUserContext(userId);
    const { error } = await supabase.from('journal_entries').insert({
        user_id: userId,
        ...entry
    });
    if (error) throw error;
}

export async function getMoodEntries(userId: number): Promise<MoodEntry[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function saveProgressLog(userId: number, log: ProgressLog) {
    await setUserContext(userId);
    const { error } = await supabase.from('progress_logs').insert({
        user_id: userId,
        ...log
    });
    if (error) throw error;
}

export async function getProgressLogs(userId: number): Promise<ProgressLog[]> {
    await setUserContext(userId);
    const { data, error } = await supabase
        .from('progress_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false });

    if (error) throw error;
    return data || [];
}
