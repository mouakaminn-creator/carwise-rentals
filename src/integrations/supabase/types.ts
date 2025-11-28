export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cars: {
        Row: {
          brand: string
          created_at: string
          daily_price: number
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          image_url: string | null
          insurance_expiry: string
          last_service_km: number
          mileage: number
          model: string
          next_service_km: number
          notes: string | null
          registration_number: string
          service_interval_km: number
          status: Database["public"]["Enums"]["car_status"]
          technical_inspection_expiry: string
          transmission: Database["public"]["Enums"]["transmission_type"]
          updated_at: string
          vignette_expiry: string
          year: number
        }
        Insert: {
          brand: string
          created_at?: string
          daily_price: number
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id?: string
          image_url?: string | null
          insurance_expiry: string
          last_service_km?: number
          mileage?: number
          model: string
          next_service_km: number
          notes?: string | null
          registration_number: string
          service_interval_km?: number
          status?: Database["public"]["Enums"]["car_status"]
          technical_inspection_expiry: string
          transmission: Database["public"]["Enums"]["transmission_type"]
          updated_at?: string
          vignette_expiry: string
          year: number
        }
        Update: {
          brand?: string
          created_at?: string
          daily_price?: number
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          image_url?: string | null
          insurance_expiry?: string
          last_service_km?: number
          mileage?: number
          model?: string
          next_service_km?: number
          notes?: string | null
          registration_number?: string
          service_interval_km?: number
          status?: Database["public"]["Enums"]["car_status"]
          technical_inspection_expiry?: string
          transmission?: Database["public"]["Enums"]["transmission_type"]
          updated_at?: string
          vignette_expiry?: string
          year?: number
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          cin: string
          created_at: string
          driving_license_number: string | null
          email: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          cin: string
          created_at?: string
          driving_license_number?: string | null
          email?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          cin?: string
          created_at?: string
          driving_license_number?: string | null
          email?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance: {
        Row: {
          car_id: string
          cost: number | null
          created_at: string
          date: string
          id: string
          mileage_at_service: number
          notes: string | null
          type: Database["public"]["Enums"]["maintenance_type"]
          updated_at: string
        }
        Insert: {
          car_id: string
          cost?: number | null
          created_at?: string
          date: string
          id?: string
          mileage_at_service: number
          notes?: string | null
          type: Database["public"]["Enums"]["maintenance_type"]
          updated_at?: string
        }
        Update: {
          car_id?: string
          cost?: number | null
          created_at?: string
          date?: string
          id?: string
          mileage_at_service?: number
          notes?: string | null
          type?: Database["public"]["Enums"]["maintenance_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      rentals: {
        Row: {
          car_id: string
          client_id: string
          created_at: string
          daily_price: number
          end_date: string
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          start_date: string
          status: Database["public"]["Enums"]["rental_status"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          car_id: string
          client_id: string
          created_at?: string
          daily_price: number
          end_date: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          start_date: string
          status?: Database["public"]["Enums"]["rental_status"]
          total_amount: number
          updated_at?: string
        }
        Update: {
          car_id?: string
          client_id?: string
          created_at?: string
          daily_price?: number
          end_date?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          start_date?: string
          status?: Database["public"]["Enums"]["rental_status"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rentals_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rentals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_requests: {
        Row: {
          created_at: string
          desired_car: string | null
          email: string | null
          end_date: string | null
          full_name: string
          id: string
          message: string | null
          phone: string
          start_date: string | null
          status: string
        }
        Insert: {
          created_at?: string
          desired_car?: string | null
          email?: string | null
          end_date?: string | null
          full_name: string
          id?: string
          message?: string | null
          phone: string
          start_date?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          desired_car?: string | null
          email?: string | null
          end_date?: string | null
          full_name?: string
          id?: string
          message?: string | null
          phone?: string
          start_date?: string | null
          status?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      car_status: "AVAILABLE" | "RENTED" | "MAINTENANCE" | "UNAVAILABLE"
      fuel_type: "DIESEL" | "ESSENCE" | "HYBRIDE" | "ELECTRIQUE"
      maintenance_type: "VIDANGE" | "PNEUS" | "FREINS" | "AUTRE"
      payment_status: "UNPAID" | "PARTIALLY_PAID" | "PAID"
      rental_status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "LATE"
      transmission_type: "MANUAL" | "AUTOMATIC"
      user_role: "ADMIN" | "EMPLOYEE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      car_status: ["AVAILABLE", "RENTED", "MAINTENANCE", "UNAVAILABLE"],
      fuel_type: ["DIESEL", "ESSENCE", "HYBRIDE", "ELECTRIQUE"],
      maintenance_type: ["VIDANGE", "PNEUS", "FREINS", "AUTRE"],
      payment_status: ["UNPAID", "PARTIALLY_PAID", "PAID"],
      rental_status: ["ACTIVE", "COMPLETED", "CANCELLED", "LATE"],
      transmission_type: ["MANUAL", "AUTOMATIC"],
      user_role: ["ADMIN", "EMPLOYEE"],
    },
  },
} as const
