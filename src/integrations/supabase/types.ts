export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_metrics: {
        Row: {
          account_id: string
          collected_at: string
          engagement_rate: number | null
          followers_count: number | null
          id: string
          mentions_count: number | null
          sentiment_score: number | null
        }
        Insert: {
          account_id: string
          collected_at?: string
          engagement_rate?: number | null
          followers_count?: number | null
          id?: string
          mentions_count?: number | null
          sentiment_score?: number | null
        }
        Update: {
          account_id?: string
          collected_at?: string
          engagement_rate?: number | null
          followers_count?: number | null
          id?: string
          mentions_count?: number | null
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_metrics_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "social_media_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_articles: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          published: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          published?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_media: {
        Row: {
          article_id: string | null
          created_at: string
          description: string | null
          display_order: number | null
          file_path: string
          id: string
          media_type: string
          metadata: Json | null
          title: string | null
          updated_at: string
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          file_path: string
          id?: string
          media_type: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          article_id?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          file_path?: string
          id?: string
          media_type?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_media_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "blog_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      historical_sentiment: {
        Row: {
          analyzed_date: string
          created_at: string
          engagement_count: number
          id: string
          keyword_id: string
          mentions_count: number
          sentiment_score: number
          source: string
        }
        Insert: {
          analyzed_date: string
          created_at?: string
          engagement_count?: number
          id?: string
          keyword_id: string
          mentions_count?: number
          sentiment_score: number
          source: string
        }
        Update: {
          analyzed_date?: string
          created_at?: string
          engagement_count?: number
          id?: string
          keyword_id?: string
          mentions_count?: number
          sentiment_score?: number
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "historical_sentiment_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "tracked_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          message: string
          read: boolean
          related_id: string | null
          related_type: string | null
          timestamp: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          id?: string
          message: string
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          timestamp?: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          id?: string
          message?: string
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          timestamp?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      rss_feeds: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      social_media_accounts: {
        Row: {
          created_at: string
          handle: string
          id: string
          platform: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          handle: string
          id?: string
          platform: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          handle?: string
          id?: string
          platform?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          keyword_limit: number | null
          social_account_limit: number | null
          subscription_end: string | null
          subscription_start: string
          subscription_tier: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          keyword_limit?: number | null
          social_account_limit?: number | null
          subscription_end?: string | null
          subscription_start?: string
          subscription_tier?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          keyword_limit?: number | null
          social_account_limit?: number | null
          subscription_end?: string | null
          subscription_start?: string
          subscription_tier?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tracked_keywords: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          keyword: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          keyword: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          keyword?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user"],
    },
  },
} as const
