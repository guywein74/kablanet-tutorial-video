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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_roles: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          is_system: boolean
          key: string
          log_off_when_done: boolean
          name: string
          track_hours: boolean
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          key: string
          log_off_when_done?: boolean
          name: string
          track_hours?: boolean
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_system?: boolean
          key?: string
          log_off_when_done?: boolean
          name?: string
          track_hours?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "app_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      assemblies: {
        Row: {
          archived_at: string | null
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      assembly_line_items: {
        Row: {
          assembly_id: string
          line_item_id: string
          sort_order: number
        }
        Insert: {
          assembly_id: string
          line_item_id: string
          sort_order: number
        }
        Update: {
          assembly_id?: string
          line_item_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "assembly_line_items_assembly_id_fkey"
            columns: ["assembly_id"]
            isOneToOne: false
            referencedRelation: "assemblies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assembly_line_items_line_item_id_fkey"
            columns: ["line_item_id"]
            isOneToOne: false
            referencedRelation: "line_items"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          amount: number | null
          company_id: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_label: string | null
          entity_type: string
          id: string
          project_id: string | null
          project_name: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          amount?: number | null
          company_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_label?: string | null
          entity_type: string
          id?: string
          project_id?: string | null
          project_name?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          amount?: number | null
          company_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string
          id?: string
          project_id?: string | null
          project_name?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      change_order_signees: {
        Row: {
          change_order_id: string
          company_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string
          id: string
          invited_at: string | null
          last_reminded_at: string | null
          last_reminder_at: string | null
          name: string
          opened_at: string | null
          sign_order: number
          sign_token: string
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          updated_at: string
        }
        Insert: {
          change_order_id: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email: string
          id?: string
          invited_at?: string | null
          last_reminded_at?: string | null
          last_reminder_at?: string | null
          name: string
          opened_at?: string | null
          sign_order?: number
          sign_token?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          updated_at?: string
        }
        Update: {
          change_order_id?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string
          id?: string
          invited_at?: string | null
          last_reminded_at?: string | null
          last_reminder_at?: string | null
          name?: string
          opened_at?: string | null
          sign_order?: number
          sign_token?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      change_order_statuses: {
        Row: {
          color: string
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean
          is_final: boolean
          key: string
          label: string
          requires_esignature: boolean
          requires_manager_approval: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_final?: boolean
          key: string
          label: string
          requires_esignature?: boolean
          requires_manager_approval?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_final?: boolean
          key?: string
          label?: string
          requires_esignature?: boolean
          requires_manager_approval?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      change_order_types: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean
          key: string
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "change_order_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          billing_exempt: boolean
          city: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          demo_source: Json | null
          drive_app_user_id: string | null
          drive_connected_at: string | null
          drive_connected_by: string | null
          drive_connected_email: string | null
          drive_connection_key: string | null
          drive_folder_id: string | null
          drive_folder_name: string | null
          drive_scope_version: number
          email: string | null
          fax: string | null
          id: string
          license_expires_on: string | null
          license_number: string | null
          logo_url: string | null
          name: string
          phone: string | null
          secondary_phone: string | null
          state: string | null
          status: string
          tax_id: string | null
          timezone: string
          updated_at: string
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          billing_exempt?: boolean
          city?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          demo_source?: Json | null
          drive_app_user_id?: string | null
          drive_connected_at?: string | null
          drive_connected_by?: string | null
          drive_connected_email?: string | null
          drive_connection_key?: string | null
          drive_folder_id?: string | null
          drive_folder_name?: string | null
          drive_scope_version?: number
          email?: string | null
          fax?: string | null
          id?: string
          license_expires_on?: string | null
          license_number?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          secondary_phone?: string | null
          state?: string | null
          status?: string
          tax_id?: string | null
          timezone?: string
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          billing_exempt?: boolean
          city?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          demo_source?: Json | null
          drive_app_user_id?: string | null
          drive_connected_at?: string | null
          drive_connected_by?: string | null
          drive_connected_email?: string | null
          drive_connection_key?: string | null
          drive_folder_id?: string | null
          drive_folder_name?: string | null
          drive_scope_version?: number
          email?: string | null
          fax?: string | null
          id?: string
          license_expires_on?: string | null
          license_number?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          secondary_phone?: string | null
          state?: string | null
          status?: string
          tax_id?: string | null
          timezone?: string
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      company_backup_destinations: {
        Row: {
          company_id: string
          config: Json
          created_at: string
          id: string
          is_enabled: boolean
          kind: string
          last_error: string | null
          last_error_at: string | null
          last_success_at: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json
          created_at?: string
          id?: string
          is_enabled?: boolean
          kind: string
          last_error?: string | null
          last_error_at?: string | null
          last_success_at?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json
          created_at?: string
          id?: string
          is_enabled?: boolean
          kind?: string
          last_error?: string | null
          last_error_at?: string | null
          last_success_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_backup_destinations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_backup_settings: {
        Row: {
          audit_trail_enabled: boolean
          company_id: string
          created_at: string
          document_drive_mirror_enabled: boolean
          expanded_exports_enabled: boolean
          mirror_retry_queue_enabled: boolean
          nightly_snapshot_enabled: boolean
          project_csv_snapshots_enabled: boolean
          restore_tool_enabled: boolean
          snapshot_retention_daily: number
          snapshot_retention_monthly: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          audit_trail_enabled?: boolean
          company_id: string
          created_at?: string
          document_drive_mirror_enabled?: boolean
          expanded_exports_enabled?: boolean
          mirror_retry_queue_enabled?: boolean
          nightly_snapshot_enabled?: boolean
          project_csv_snapshots_enabled?: boolean
          restore_tool_enabled?: boolean
          snapshot_retention_daily?: number
          snapshot_retention_monthly?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          audit_trail_enabled?: boolean
          company_id?: string
          created_at?: string
          document_drive_mirror_enabled?: boolean
          expanded_exports_enabled?: boolean
          mirror_retry_queue_enabled?: boolean
          nightly_snapshot_enabled?: boolean
          project_csv_snapshots_enabled?: boolean
          restore_tool_enabled?: boolean
          snapshot_retention_daily?: number
          snapshot_retention_monthly?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_backup_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_company_admin: boolean
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_company_admin?: boolean
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_company_admin?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          company_id: string
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          environment: string
          grace_until: string | null
          id: string
          plan_price_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          company_id: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          grace_until?: string | null
          id?: string
          plan_price_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean
          company_id?: string
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          environment?: string
          grace_until?: string | null
          id?: string
          plan_price_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_jobs: {
        Row: {
          company_id: string
          contract_id: string
          created_at: string | null
          id: string
          job_id: string
        }
        Insert: {
          company_id?: string
          contract_id: string
          created_at?: string | null
          id?: string
          job_id: string
        }
        Update: {
          company_id?: string
          contract_id?: string
          created_at?: string | null
          id?: string
          job_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_line_items: {
        Row: {
          company_id: string
          contract_id: string
          create_pre_job: boolean
          created_at: string
          description: Json
          id: string
          line_item_id: string | null
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          company_id?: string
          contract_id: string
          create_pre_job?: boolean
          created_at?: string
          description?: Json
          id?: string
          line_item_id?: string | null
          name: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string
          create_pre_job?: boolean
          created_at?: string
          description?: Json
          id?: string
          line_item_id?: string | null
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_line_items_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_line_items_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_line_items_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_line_items_line_item_id_fkey"
            columns: ["line_item_id"]
            isOneToOne: false
            referencedRelation: "line_items"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_payment_schedule: {
        Row: {
          amount: number
          company_id: string
          contract_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          due_date: string | null
          id: string
          is_down_payment: boolean
          sequence_number: number
          source_contract_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number
          company_id?: string
          contract_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          due_date?: string | null
          id?: string
          is_down_payment?: boolean
          sequence_number: number
          source_contract_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          contract_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          due_date?: string | null
          id?: string
          is_down_payment?: boolean
          sequence_number?: number
          source_contract_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_payment_schedule_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_source_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_source_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payment_schedule_source_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_payments: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          canonical_source_id: string | null
          canonical_source_type: string | null
          check_number: string | null
          company_id: string
          contract_id: string
          created_at: string
          created_by: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          due_date: string | null
          id: string
          lic_amount: number | null
          lifecycle_actor: string | null
          lifecycle_at: string | null
          lifecycle_reason: string | null
          lifecycle_state: string | null
          notes: string | null
          operation_id: string | null
          payment_method_id: string | null
          receipt_document_id: string | null
          receipt_file_url: string | null
          receiving_company: string | null
          refund_of_payment_id: string | null
          request_note: string | null
          requested_amount: number | null
          requested_at: string | null
          requested_by: string | null
          reversal_of_payment_id: string | null
          schedule_item_ids: string[] | null
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          source_credit_allocation_id: string | null
          source_credit_id: string | null
          split_parent_payment_id: string | null
          status: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          canonical_source_id?: string | null
          canonical_source_type?: string | null
          check_number?: string | null
          company_id?: string
          contract_id: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          lic_amount?: number | null
          lifecycle_actor?: string | null
          lifecycle_at?: string | null
          lifecycle_reason?: string | null
          lifecycle_state?: string | null
          notes?: string | null
          operation_id?: string | null
          payment_method_id?: string | null
          receipt_document_id?: string | null
          receipt_file_url?: string | null
          receiving_company?: string | null
          refund_of_payment_id?: string | null
          request_note?: string | null
          requested_amount?: number | null
          requested_at?: string | null
          requested_by?: string | null
          reversal_of_payment_id?: string | null
          schedule_item_ids?: string[] | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          source_credit_allocation_id?: string | null
          source_credit_id?: string | null
          split_parent_payment_id?: string | null
          status?: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          canonical_source_id?: string | null
          canonical_source_type?: string | null
          check_number?: string | null
          company_id?: string
          contract_id?: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          lic_amount?: number | null
          lifecycle_actor?: string | null
          lifecycle_at?: string | null
          lifecycle_reason?: string | null
          lifecycle_state?: string | null
          notes?: string | null
          operation_id?: string | null
          payment_method_id?: string | null
          receipt_document_id?: string | null
          receipt_file_url?: string | null
          receiving_company?: string | null
          refund_of_payment_id?: string | null
          request_note?: string | null
          requested_amount?: number | null
          requested_at?: string | null
          requested_by?: string | null
          reversal_of_payment_id?: string | null
          schedule_item_ids?: string[] | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          source_credit_allocation_id?: string | null
          source_credit_id?: string | null
          split_parent_payment_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_payments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "payment_operations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_reversal_of_payment_id_fkey"
            columns: ["reversal_of_payment_id"]
            isOneToOne: false
            referencedRelation: "contract_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "credit_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "financial_credit_allocation_exceptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "financial_credit_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_source_credit_id_fkey"
            columns: ["source_credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_payments_split_parent_payment_id_fkey"
            columns: ["split_parent_payment_id"]
            isOneToOne: false
            referencedRelation: "contract_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_section_overrides: {
        Row: {
          change_order_id: string | null
          company_id: string
          contract_id: string | null
          created_at: string
          id: string
          removed: boolean
          section_id: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          change_order_id?: string | null
          company_id?: string
          contract_id?: string | null
          created_at?: string
          id?: string
          removed?: boolean
          section_id: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          change_order_id?: string | null
          company_id?: string
          contract_id?: string | null
          created_at?: string
          id?: string
          removed?: boolean
          section_id?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_section_overrides_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_section_overrides_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "contract_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_sections: {
        Row: {
          attachment_id: string | null
          body: string | null
          company_id: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          kind: string
          name: string
          pdf_overlays: Json
          sort_order: number
          updated_at: string
        }
        Insert: {
          attachment_id?: string | null
          body?: string | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          kind: string
          name: string
          pdf_overlays?: Json
          sort_order?: number
          updated_at?: string
        }
        Update: {
          attachment_id?: string | null
          body?: string | null
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          kind?: string
          name?: string
          pdf_overlays?: Json
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_sections_attachment_id_fkey"
            columns: ["attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_signees: {
        Row: {
          company_id: string
          contract_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string
          id: string
          initials_data: string | null
          invited_at: string | null
          last_reminded_at: string | null
          last_reminder_at: string | null
          name: string
          sign_order: number
          sign_token: string
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          updated_at: string
        }
        Insert: {
          company_id?: string
          contract_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email: string
          id?: string
          initials_data?: string | null
          invited_at?: string | null
          last_reminded_at?: string | null
          last_reminder_at?: string | null
          name: string
          sign_order?: number
          sign_token?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string
          id?: string
          initials_data?: string | null
          invited_at?: string | null
          last_reminded_at?: string | null
          last_reminder_at?: string | null
          name?: string
          sign_order?: number
          sign_token?: string
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_signees_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_signees_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_signees_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_template_sections: {
        Row: {
          created_at: string
          id: string
          section_id: string
          sort_order: number
          template_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_id: string
          sort_order?: number
          template_id: string
        }
        Update: {
          created_at?: string
          id?: string
          section_id?: string
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_template_sections_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "contract_sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_template_sections_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "contract_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_templates: {
        Row: {
          accent_color: string
          add_frame: boolean
          body_font_family: string
          body_font_size: number
          company_id: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          document_title: string | null
          footer_font_size: number
          footer_text: string | null
          frame_thickness_pt: number
          hashtag_font_size: number
          header_font_size: number
          header_text: string | null
          id: string
          initials_position: string
          is_default: boolean
          kind: string
          logo_url: string | null
          name: string
          page_margin_pt: number
          require_customer_signature: boolean
          require_initials_each_page: boolean
          show_from_project_block: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          accent_color?: string
          add_frame?: boolean
          body_font_family?: string
          body_font_size?: number
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_title?: string | null
          footer_font_size?: number
          footer_text?: string | null
          frame_thickness_pt?: number
          hashtag_font_size?: number
          header_font_size?: number
          header_text?: string | null
          id?: string
          initials_position?: string
          is_default?: boolean
          kind: string
          logo_url?: string | null
          name: string
          page_margin_pt?: number
          require_customer_signature?: boolean
          require_initials_each_page?: boolean
          show_from_project_block?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          accent_color?: string
          add_frame?: boolean
          body_font_family?: string
          body_font_size?: number
          company_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_title?: string | null
          footer_font_size?: number
          footer_text?: string | null
          frame_thickness_pt?: number
          hashtag_font_size?: number
          header_font_size?: number
          header_text?: string | null
          id?: string
          initials_position?: string
          is_default?: boolean
          kind?: string
          logo_url?: string | null
          name?: string
          page_margin_pt?: number
          require_customer_signature?: boolean
          require_initials_each_page?: boolean
          show_from_project_block?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      contractor_trades: {
        Row: {
          company_id: string
          contractor_id: string
          created_at: string
          id: string
          trade_id: string
        }
        Insert: {
          company_id?: string
          contractor_id: string
          created_at?: string
          id?: string
          trade_id: string
        }
        Update: {
          company_id?: string
          contractor_id?: string
          created_at?: string
          id?: string
          trade_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_trades_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contractor_trades_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      contractors: {
        Row: {
          address: string | null
          city: string | null
          company_id: string
          contact_name: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          id: string
          license_expiration: string | null
          license_number: string | null
          name: string
          notes: string | null
          phone: string | null
          phone_secondary: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          license_expiration?: string | null
          license_number?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          phone_secondary?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          license_expiration?: string | null
          license_number?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          phone_secondary?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contractors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          approval_requested_at: string | null
          approval_requested_by: string | null
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          attachment_page_layout: Json | null
          auto_create_job: boolean
          auto_create_payments: boolean
          auto_create_prejobs: boolean
          bid_amount: number
          body: string | null
          co_type_key: string | null
          company_id: string
          contract_number: string
          contractor_id: string | null
          contractor_sig_placement: Json | null
          contractor_signature_data: string | null
          contractor_signed_at: string | null
          contractor_signed_by_name: string | null
          contractor_signer_email: string | null
          contractor_signer_name: string | null
          converted_at: string | null
          converted_contract_id: string | null
          created_at: string
          created_by: string | null
          created_job_id: string | null
          customer_contact_id: string | null
          customer_id: string | null
          date: string
          date_issued: string | null
          decline_reason: string | null
          declined_at: string | null
          declined_by_name: string | null
          declined_by_signee_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          drive_folder_id: string | null
          end_date: string | null
          estimate_created_at: string | null
          id: string
          imported_doc_attachment_id: string | null
          initials_pages: number[] | null
          initials_position: string | null
          is_credit: boolean
          is_main_contract: boolean
          kind: string
          material_invoice_id: string | null
          materialized_at: string | null
          name: string | null
          name_on_contract: string | null
          notes: string | null
          notify_customer_executed: boolean
          notify_customer_invite: boolean
          notify_internal_countersign: boolean
          notify_internal_executed: boolean
          notify_internal_invite_sent: boolean
          notify_user_id: string | null
          number: string | null
          parent_contract_id: string | null
          pdf_document_id: string | null
          pdf_file_url: string | null
          pre_job_id: string | null
          price_list_id: string | null
          project_description: string | null
          project_id: string | null
          require_initials: boolean | null
          require_signature: boolean
          rows: Json
          schedule_rows: Json
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          signed_doc_attachment_id: string | null
          signing_status: string | null
          source_contract_id: string | null
          start_date: string | null
          status: string | null
          supplier_id: string | null
          template_id: string | null
          time_extension_days: number | null
          title: string | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          approval_requested_at?: string | null
          approval_requested_by?: string | null
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          attachment_page_layout?: Json | null
          auto_create_job?: boolean
          auto_create_payments?: boolean
          auto_create_prejobs?: boolean
          bid_amount?: number
          body?: string | null
          co_type_key?: string | null
          company_id?: string
          contract_number: string
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string
          created_by?: string | null
          created_job_id?: string | null
          customer_contact_id?: string | null
          customer_id?: string | null
          date?: string
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          end_date?: string | null
          estimate_created_at?: string | null
          id?: string
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean
          is_main_contract?: boolean
          kind?: string
          material_invoice_id?: string | null
          materialized_at?: string | null
          name?: string | null
          name_on_contract?: string | null
          notes?: string | null
          notify_customer_executed?: boolean
          notify_customer_invite?: boolean
          notify_internal_countersign?: boolean
          notify_internal_executed?: boolean
          notify_internal_invite_sent?: boolean
          notify_user_id?: string | null
          number?: string | null
          parent_contract_id?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          pre_job_id?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean
          rows?: Json
          schedule_rows?: Json
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          signing_status?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          approval_requested_at?: string | null
          approval_requested_by?: string | null
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          attachment_page_layout?: Json | null
          auto_create_job?: boolean
          auto_create_payments?: boolean
          auto_create_prejobs?: boolean
          bid_amount?: number
          body?: string | null
          co_type_key?: string | null
          company_id?: string
          contract_number?: string
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string
          created_by?: string | null
          created_job_id?: string | null
          customer_contact_id?: string | null
          customer_id?: string | null
          date?: string
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          end_date?: string | null
          estimate_created_at?: string | null
          id?: string
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean
          is_main_contract?: boolean
          kind?: string
          material_invoice_id?: string | null
          materialized_at?: string | null
          name?: string | null
          name_on_contract?: string | null
          notes?: string | null
          notify_customer_executed?: boolean
          notify_customer_invite?: boolean
          notify_internal_countersign?: boolean
          notify_internal_executed?: boolean
          notify_internal_invite_sent?: boolean
          notify_user_id?: string | null
          number?: string | null
          parent_contract_id?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          pre_job_id?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean
          rows?: Json
          schedule_rows?: Json
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          signing_status?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_customer_contact_id_fkey"
            columns: ["customer_contact_id"]
            isOneToOne: false
            referencedRelation: "customer_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_imported_doc_attachment_id_fkey"
            columns: ["imported_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_material_invoice_id_fkey"
            columns: ["material_invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_pre_job_id_fkey"
            columns: ["pre_job_id"]
            isOneToOne: false
            referencedRelation: "pre_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_signed_doc_attachment_id_fkey"
            columns: ["signed_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "contract_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_allocations: {
        Row: {
          amount: number
          change_order_id: string | null
          company_id: string
          created_at: string
          credit_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          schedule_item_id: string | null
          source_schedule_item_id: string | null
          target_id: string | null
          target_type: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          change_order_id?: string | null
          company_id?: string
          created_at?: string
          credit_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          schedule_item_id?: string | null
          source_schedule_item_id?: string | null
          target_id?: string | null
          target_type?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          change_order_id?: string | null
          company_id?: string
          created_at?: string
          credit_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          schedule_item_id?: string | null
          source_schedule_item_id?: string | null
          target_id?: string | null
          target_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_allocations_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_allocations_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_allocations_change_order_id_fkey"
            columns: ["change_order_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_allocations_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
        ]
      }
      credits: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          created_by: string | null
          credit_number: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          direction: string
          id: string
          notes: string | null
          party_id: string
          party_type: string
          project_id: string | null
          source_id: string | null
          source_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          company_id: string
          created_at?: string
          created_by?: string | null
          credit_number?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          direction: string
          id?: string
          notes?: string | null
          party_id: string
          party_type: string
          project_id?: string | null
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          created_by?: string | null
          credit_number?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          direction?: string
          id?: string
          notes?: string | null
          party_id?: string
          party_type?: string
          project_id?: string | null
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_activities: {
        Row: {
          activity_date: string
          activity_type: string
          company_id: string
          created_at: string
          created_by: string | null
          customer_id: string
          deleted_at: string | null
          deleted_by: string | null
          details: string | null
          follow_up_date: string | null
          follow_up_days: number | null
          follow_up_description: string | null
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          activity_date?: string
          activity_type?: string
          company_id: string
          created_at?: string
          created_by?: string | null
          customer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          details?: string | null
          follow_up_date?: string | null
          follow_up_days?: number | null
          follow_up_description?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          activity_date?: string
          activity_type?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          details?: string | null
          follow_up_date?: string | null
          follow_up_days?: number | null
          follow_up_description?: string | null
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_activities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_contacts: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          customer_id: string
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          id: string
          is_primary: boolean
          name: string
          name_on_contract: string | null
          phone: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean
          name?: string
          name_on_contract?: string | null
          phone?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          customer_id?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean
          name?: string
          name_on_contract?: string | null
          phone?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_contacts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_types: {
        Row: {
          color: string
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean
          key: string
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          company_id: string
          contact_name: string | null
          created_at: string
          created_by: string | null
          customer_type_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          emails: Json
          id: string
          name: string
          notes: string | null
          phone: string | null
          phones: Json
          price_list_id: string | null
          state: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          created_by?: string | null
          customer_type_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          emails?: Json
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          phones?: Json
          price_list_id?: string | null
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          created_by?: string | null
          customer_type_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          emails?: Json
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          phones?: Json
          price_list_id?: string | null
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_customer_type_id_fkey"
            columns: ["customer_type_id"]
            isOneToOne: false
            referencedRelation: "customer_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_build_progress: {
        Row: {
          company_id: string | null
          completed_phases: Json
          current_label: string | null
          done_units: number
          error: string | null
          percent: number
          phase: string | null
          phase_label: string | null
          result: Json | null
          run_id: string
          source_company_id: string | null
          started_at: string
          status: string
          total_units: number
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          completed_phases?: Json
          current_label?: string | null
          done_units?: number
          error?: string | null
          percent?: number
          phase?: string | null
          phase_label?: string | null
          result?: Json | null
          run_id: string
          source_company_id?: string | null
          started_at?: string
          status?: string
          total_units?: number
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          completed_phases?: Json
          current_label?: string | null
          done_units?: number
          error?: string | null
          percent?: number
          phase?: string | null
          phase_label?: string | null
          result?: Json | null
          run_id?: string
          source_company_id?: string | null
          started_at?: string
          status?: string
          total_units?: number
          updated_at?: string
        }
        Relationships: []
      }
      demo_generation_jobs: {
        Row: {
          company_id: string | null
          created_at: string
          error: string | null
          id: string
          item_kind: string
          label: string | null
          run_id: string
          source_company_id: string | null
          source_item_id: string | null
          status: string
          updated_at: string
          vendor_id: string | null
          vendor_type: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          item_kind: string
          label?: string | null
          run_id: string
          source_company_id?: string | null
          source_item_id?: string | null
          status?: string
          updated_at?: string
          vendor_id?: string | null
          vendor_type?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          error?: string | null
          id?: string
          item_kind?: string
          label?: string | null
          run_id?: string
          source_company_id?: string | null
          source_item_id?: string | null
          status?: string
          updated_at?: string
          vendor_id?: string | null
          vendor_type?: string | null
        }
        Relationships: []
      }
      document_attachments: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          document_type: string | null
          drive_file_id: string | null
          entity_id: string
          entity_type: string
          file_name: string
          file_size: number | null
          file_url: string | null
          id: string
          is_public: boolean
          mime_type: string | null
          notes: string | null
          status: string
          storage_bucket: string | null
          storage_path: string | null
          uploaded_by: string | null
        }
        Insert: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_type?: string | null
          drive_file_id?: string | null
          entity_id: string
          entity_type: string
          file_name: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          notes?: string | null
          status?: string
          storage_bucket?: string | null
          storage_path?: string | null
          uploaded_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_type?: string | null
          drive_file_id?: string | null
          entity_id?: string
          entity_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          notes?: string | null
          status?: string
          storage_bucket?: string | null
          storage_path?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_attachments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      drive_mirror_queue: {
        Row: {
          attempt_count: number
          company_id: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          last_error: string | null
          next_retry_at: string
          payload: Json
          status: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          company_id: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          last_error?: string | null
          next_retry_at?: string
          payload: Json
          status?: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          company_id?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          last_error?: string | null
          next_retry_at?: string
          payload?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "drive_mirror_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      email_click_events: {
        Row: {
          click_count: number
          company_id: string | null
          created_at: string
          first_clicked_at: string
          id: string
          last_clicked_at: string
          message_id: string | null
          recipient_email: string
          target_url: string
          template_name: string | null
        }
        Insert: {
          click_count?: number
          company_id?: string | null
          created_at?: string
          first_clicked_at?: string
          id?: string
          last_clicked_at?: string
          message_id?: string | null
          recipient_email: string
          target_url: string
          template_name?: string | null
        }
        Update: {
          click_count?: number
          company_id?: string | null
          created_at?: string
          first_clicked_at?: string
          id?: string
          last_clicked_at?: string
          message_id?: string | null
          recipient_email?: string
          target_url?: string
          template_name?: string | null
        }
        Relationships: []
      }
      email_open_events: {
        Row: {
          company_id: string
          contract_id: string | null
          created_at: string
          first_opened_at: string | null
          id: string
          last_opened_at: string | null
          open_count: number
          recipient_email: string
          recipient_name: string | null
          sent_at: string
          template_name: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          contract_id?: string | null
          created_at?: string
          first_opened_at?: string | null
          id?: string
          last_opened_at?: string | null
          open_count?: number
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string
          template_name?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string | null
          created_at?: string
          first_opened_at?: string | null
          id?: string
          last_opened_at?: string | null
          open_count?: number
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string
          template_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          company_id: string | null
          contract_id: string | null
          created_at: string
          error_message: string | null
          from_email: string | null
          from_name: string | null
          html_body: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          sender_user_id: string | null
          status: string
          subject: string | null
          template_data: Json | null
          template_name: string
        }
        Insert: {
          company_id?: string | null
          contract_id?: string | null
          created_at?: string
          error_message?: string | null
          from_email?: string | null
          from_name?: string | null
          html_body?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          sender_user_id?: string | null
          status: string
          subject?: string | null
          template_data?: Json | null
          template_name: string
        }
        Update: {
          company_id?: string | null
          contract_id?: string | null
          created_at?: string
          error_message?: string | null
          from_email?: string | null
          from_name?: string | null
          html_body?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          sender_user_id?: string | null
          status?: string
          subject?: string | null
          template_data?: Json | null
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      estimate_request_messages: {
        Row: {
          attachments: Json
          author_name: string | null
          author_user_id: string | null
          body: string
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          direction: string
          id: string
          read_at: string | null
          recipient_id: string
          request_id: string
          updated_at: string
        }
        Insert: {
          attachments?: Json
          author_name?: string | null
          author_user_id?: string | null
          body?: string
          company_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          direction: string
          id?: string
          read_at?: string | null
          recipient_id: string
          request_id: string
          updated_at?: string
        }
        Update: {
          attachments?: Json
          author_name?: string | null
          author_user_id?: string | null
          body?: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          direction?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          request_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimate_request_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "estimate_request_recipients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_request_messages_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "estimate_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_request_recipients: {
        Row: {
          company_id: string
          contractor_id: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          job_offer_id: string | null
          material_quote_id: string | null
          open_count: number
          open_token: string
          opened_at: string | null
          recipient_name: string | null
          reminded_at: string | null
          reminder_count: number
          request_id: string
          responded_at: string | null
          send_error: string | null
          sent_at: string | null
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          contractor_id?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          job_offer_id?: string | null
          material_quote_id?: string | null
          open_count?: number
          open_token?: string
          opened_at?: string | null
          recipient_name?: string | null
          reminded_at?: string | null
          reminder_count?: number
          request_id: string
          responded_at?: string | null
          send_error?: string | null
          sent_at?: string | null
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          contractor_id?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          job_offer_id?: string | null
          material_quote_id?: string | null
          open_count?: number
          open_token?: string
          opened_at?: string | null
          recipient_name?: string | null
          reminded_at?: string | null
          reminder_count?: number
          request_id?: string
          responded_at?: string | null
          send_error?: string | null
          sent_at?: string | null
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimate_request_recipients_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_request_recipients_job_offer_id_fkey"
            columns: ["job_offer_id"]
            isOneToOne: false
            referencedRelation: "job_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_request_recipients_material_quote_id_fkey"
            columns: ["material_quote_id"]
            isOneToOne: false
            referencedRelation: "material_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_request_recipients_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "estimate_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_request_recipients_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      estimate_requests: {
        Row: {
          company_id: string
          contract_id: string | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          due_date: string | null
          id: string
          material_invoice_id: string | null
          message: string
          pre_job_id: string | null
          project_id: string | null
          sent_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          company_id: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          material_invoice_id?: string | null
          message?: string
          pre_job_id?: string | null
          project_id?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          material_invoice_id?: string | null
          message?: string
          pre_job_id?: string | null
          project_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estimate_requests_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_material_invoice_id_fkey"
            columns: ["material_invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_pre_job_id_fkey"
            columns: ["pre_job_id"]
            isOneToOne: false
            referencedRelation: "pre_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_source_relationship_audit: {
        Row: {
          action: string
          actor: string
          after_snapshot: Json | null
          before_snapshot: Json | null
          company_id: string
          created_at: string
          id: string
          reason: string | null
          relationship_id: string
        }
        Insert: {
          action: string
          actor?: string
          after_snapshot?: Json | null
          before_snapshot?: Json | null
          company_id: string
          created_at?: string
          id?: string
          reason?: string | null
          relationship_id: string
        }
        Update: {
          action?: string
          actor?: string
          after_snapshot?: Json | null
          before_snapshot?: Json | null
          company_id?: string
          created_at?: string
          id?: string
          reason?: string | null
          relationship_id?: string
        }
        Relationships: []
      }
      financial_source_relationships: {
        Row: {
          amount: number | null
          company_id: string
          created_at: string
          created_by: string
          deleted_at: string | null
          id: string
          notes: string | null
          related_source_id: string
          related_source_type: string
          relationship_type: string
          retire_reason: string | null
          retired_at: string | null
          retired_by: string | null
          source_id: string
          source_type: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          company_id: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          related_source_id: string
          related_source_type: string
          relationship_type: string
          retire_reason?: string | null
          retired_at?: string | null
          retired_by?: string | null
          source_id: string
          source_type: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          company_id?: string
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          id?: string
          notes?: string | null
          related_source_id?: string
          related_source_type?: string
          relationship_type?: string
          retire_reason?: string | null
          retired_at?: string | null
          retired_by?: string | null
          source_id?: string
          source_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      hashtag_descriptions: {
        Row: {
          description: string
          id: string
          name: string | null
          token: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string
          id?: string
          name?: string | null
          token: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string
          id?: string
          name?: string | null
          token?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      help_article_media: {
        Row: {
          alt_text: string
          app_build_id: string | null
          app_map_hash: string | null
          article_id: string
          caption: string | null
          created_at: string
          demo_company_ref: string | null
          feature_key: string | null
          id: string
          ocr_hash: string | null
          ocr_text: string | null
          privacy_evidence: Json
          privacy_status: string
          public_url: string
          route: string | null
          sort_order: number
          state: string
          storage_bucket: string
          storage_path: string
          updated_at: string
          verifier_version: string | null
          version_id: string | null
        }
        Insert: {
          alt_text?: string
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id: string
          caption?: string | null
          created_at?: string
          demo_company_ref?: string | null
          feature_key?: string | null
          id?: string
          ocr_hash?: string | null
          ocr_text?: string | null
          privacy_evidence?: Json
          privacy_status?: string
          public_url: string
          route?: string | null
          sort_order?: number
          state?: string
          storage_bucket?: string
          storage_path: string
          updated_at?: string
          verifier_version?: string | null
          version_id?: string | null
        }
        Update: {
          alt_text?: string
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id?: string
          caption?: string | null
          created_at?: string
          demo_company_ref?: string | null
          feature_key?: string | null
          id?: string
          ocr_hash?: string | null
          ocr_text?: string | null
          privacy_evidence?: Json
          privacy_status?: string
          public_url?: string
          route?: string | null
          sort_order?: number
          state?: string
          storage_bucket?: string
          storage_path?: string
          updated_at?: string
          verifier_version?: string | null
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "help_article_media_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "help_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_article_media_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "help_article_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      help_article_versions: {
        Row: {
          app_build_id: string | null
          app_map_hash: string | null
          article_id: string
          body: string
          change_diff: Json
          change_summary: string | null
          confidence: number | null
          created_at: string
          evidence: Json
          faqs: Json
          generated_by: string
          id: string
          keywords: string[]
          model: string | null
          previous_version_id: string | null
          prompt_version: string | null
          published_at: string | null
          release_id: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk: string
          risk_reasons: string[]
          section: string
          status: string
          suggested_questions: string[]
          title: string
          validation: Json
          version: number
        }
        Insert: {
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id: string
          body: string
          change_diff?: Json
          change_summary?: string | null
          confidence?: number | null
          created_at?: string
          evidence?: Json
          faqs?: Json
          generated_by?: string
          id?: string
          keywords?: string[]
          model?: string | null
          previous_version_id?: string | null
          prompt_version?: string | null
          published_at?: string | null
          release_id?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk?: string
          risk_reasons?: string[]
          section?: string
          status?: string
          suggested_questions?: string[]
          title: string
          validation?: Json
          version: number
        }
        Update: {
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id?: string
          body?: string
          change_diff?: Json
          change_summary?: string | null
          confidence?: number | null
          created_at?: string
          evidence?: Json
          faqs?: Json
          generated_by?: string
          id?: string
          keywords?: string[]
          model?: string | null
          previous_version_id?: string | null
          prompt_version?: string | null
          published_at?: string | null
          release_id?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk?: string
          risk_reasons?: string[]
          section?: string
          status?: string
          suggested_questions?: string[]
          title?: string
          validation?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "help_article_versions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "help_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_article_versions_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "help_article_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_article_versions_release_id_fkey"
            columns: ["release_id"]
            isOneToOne: false
            referencedRelation: "help_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      help_articles: {
        Row: {
          classification: string
          created_at: string
          current_version_id: string | null
          id: string
          is_active: boolean
          section: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          classification?: string
          created_at?: string
          current_version_id?: string | null
          id: string
          is_active?: boolean
          section?: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          classification?: string
          created_at?: string
          current_version_id?: string | null
          id?: string
          is_active?: boolean
          section?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_articles_current_version_fk"
            columns: ["current_version_id"]
            isOneToOne: false
            referencedRelation: "help_article_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      help_capabilities: {
        Row: {
          actions: string[]
          app_build_id: string | null
          app_map_hash: string
          article_ids: string[]
          consequences: string[]
          created_at: string
          feature_key: string
          fields: string[]
          filters: string[]
          id: string
          name: string
          risk_category: string
          roles: string[]
          route: string | null
          source_files: string[]
          source_hash: string
          statuses: string[]
          summary: string | null
          validation_notes: string | null
        }
        Insert: {
          actions?: string[]
          app_build_id?: string | null
          app_map_hash: string
          article_ids?: string[]
          consequences?: string[]
          created_at?: string
          feature_key: string
          fields?: string[]
          filters?: string[]
          id?: string
          name: string
          risk_category?: string
          roles?: string[]
          route?: string | null
          source_files?: string[]
          source_hash: string
          statuses?: string[]
          summary?: string | null
          validation_notes?: string | null
        }
        Update: {
          actions?: string[]
          app_build_id?: string | null
          app_map_hash?: string
          article_ids?: string[]
          consequences?: string[]
          created_at?: string
          feature_key?: string
          fields?: string[]
          filters?: string[]
          id?: string
          name?: string
          risk_category?: string
          roles?: string[]
          route?: string | null
          source_files?: string[]
          source_hash?: string
          statuses?: string[]
          summary?: string | null
          validation_notes?: string | null
        }
        Relationships: []
      }
      help_capability_article_links: {
        Row: {
          app_map_hash: string | null
          article_id: string
          confidence: number
          created_at: string
          decision: string
          feature_key: string
          id: string
          is_active: boolean
          reason: string | null
          source: string
          updated_at: string
        }
        Insert: {
          app_map_hash?: string | null
          article_id: string
          confidence?: number
          created_at?: string
          decision?: string
          feature_key: string
          id?: string
          is_active?: boolean
          reason?: string | null
          source?: string
          updated_at?: string
        }
        Update: {
          app_map_hash?: string | null
          article_id?: string
          confidence?: number
          created_at?: string
          decision?: string
          feature_key?: string
          id?: string
          is_active?: boolean
          reason?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_capability_article_links_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "help_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      help_change_events: {
        Row: {
          app_build_id: string | null
          app_map_hash: string
          change_type: string
          created_at: string
          current_hash: string | null
          detail: Json
          diff: Json
          evidence: Json
          feature_key: string
          id: string
          previous_hash: string | null
          risk: string
          risk_reasons: string[]
          status: string
          user_facing: boolean
        }
        Insert: {
          app_build_id?: string | null
          app_map_hash: string
          change_type: string
          created_at?: string
          current_hash?: string | null
          detail?: Json
          diff?: Json
          evidence?: Json
          feature_key: string
          id?: string
          previous_hash?: string | null
          risk?: string
          risk_reasons?: string[]
          status?: string
          user_facing?: boolean
        }
        Update: {
          app_build_id?: string | null
          app_map_hash?: string
          change_type?: string
          created_at?: string
          current_hash?: string | null
          detail?: Json
          diff?: Json
          evidence?: Json
          feature_key?: string
          id?: string
          previous_hash?: string | null
          risk?: string
          risk_reasons?: string[]
          status?: string
          user_facing?: boolean
        }
        Relationships: []
      }
      help_coverage_items: {
        Row: {
          article_id: string | null
          canonical_label: string
          created_at: string
          documentable: boolean
          documented: boolean
          exclusion_reason: string | null
          feature_key: string
          id: string
          importance: string
          kind: string
          raw_label: string | null
          snapshot_id: string
        }
        Insert: {
          article_id?: string | null
          canonical_label: string
          created_at?: string
          documentable?: boolean
          documented?: boolean
          exclusion_reason?: string | null
          feature_key: string
          id?: string
          importance?: string
          kind: string
          raw_label?: string | null
          snapshot_id: string
        }
        Update: {
          article_id?: string | null
          canonical_label?: string
          created_at?: string
          documentable?: boolean
          documented?: boolean
          exclusion_reason?: string | null
          feature_key?: string
          id?: string
          importance?: string
          kind?: string
          raw_label?: string | null
          snapshot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_coverage_items_snapshot_id_fkey"
            columns: ["snapshot_id"]
            isOneToOne: false
            referencedRelation: "help_coverage_snapshots"
            referencedColumns: ["id"]
          },
        ]
      }
      help_coverage_snapshots: {
        Row: {
          app_map_hash: string | null
          covered_capabilities: number
          created_at: string
          documented_facts: number
          excluded_facts: number
          id: string
          is_complete: boolean
          missing_required: number
          required_facts: number
          run_id: string | null
          screenshots_present: number
          screenshots_required: number
          total_capabilities: number
        }
        Insert: {
          app_map_hash?: string | null
          covered_capabilities?: number
          created_at?: string
          documented_facts?: number
          excluded_facts?: number
          id?: string
          is_complete?: boolean
          missing_required?: number
          required_facts?: number
          run_id?: string | null
          screenshots_present?: number
          screenshots_required?: number
          total_capabilities?: number
        }
        Update: {
          app_map_hash?: string | null
          covered_capabilities?: number
          created_at?: string
          documented_facts?: number
          excluded_facts?: number
          id?: string
          is_complete?: boolean
          missing_required?: number
          required_facts?: number
          run_id?: string | null
          screenshots_present?: number
          screenshots_required?: number
          total_capabilities?: number
        }
        Relationships: []
      }
      help_generation_jobs: {
        Row: {
          app_build_id: string | null
          app_map_hash: string | null
          article_id: string | null
          attempts: number
          created_at: string
          event_id: string | null
          id: string
          kind: string
          last_error: string | null
          lease_until: string | null
          leased_by: string | null
          max_attempts: number
          next_run_at: string
          payload: Json
          requested_by: string | null
          result_version_id: string | null
          section_key: string | null
          status: string
          updated_at: string
        }
        Insert: {
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id?: string | null
          attempts?: number
          created_at?: string
          event_id?: string | null
          id?: string
          kind?: string
          last_error?: string | null
          lease_until?: string | null
          leased_by?: string | null
          max_attempts?: number
          next_run_at?: string
          payload?: Json
          requested_by?: string | null
          result_version_id?: string | null
          section_key?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          app_build_id?: string | null
          app_map_hash?: string | null
          article_id?: string | null
          attempts?: number
          created_at?: string
          event_id?: string | null
          id?: string
          kind?: string
          last_error?: string | null
          lease_until?: string | null
          leased_by?: string | null
          max_attempts?: number
          next_run_at?: string
          payload?: Json
          requested_by?: string | null
          result_version_id?: string | null
          section_key?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_generation_jobs_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "help_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_generation_jobs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "help_change_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_generation_jobs_result_version_id_fkey"
            columns: ["result_version_id"]
            isOneToOne: false
            referencedRelation: "help_article_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      help_manual_sections: {
        Row: {
          article_order: string[]
          created_at: string
          id: string
          section: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          article_order?: string[]
          created_at?: string
          id?: string
          section: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          article_order?: string[]
          created_at?: string
          id?: string
          section?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      help_orchestrator_runs: {
        Row: {
          app_build_id: string | null
          app_map_hash: string | null
          attempts: number
          counters: Json
          created_at: string
          finished_at: string | null
          hash_attribution: string | null
          heartbeat_at: string
          id: string
          last_error: string | null
          lease_owner: string | null
          lease_until: string | null
          next_retry_at: string | null
          stage: string
          stage_log: Json
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          app_build_id?: string | null
          app_map_hash?: string | null
          attempts?: number
          counters?: Json
          created_at?: string
          finished_at?: string | null
          hash_attribution?: string | null
          heartbeat_at?: string
          id?: string
          last_error?: string | null
          lease_owner?: string | null
          lease_until?: string | null
          next_retry_at?: string | null
          stage?: string
          stage_log?: Json
          started_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          app_build_id?: string | null
          app_map_hash?: string | null
          attempts?: number
          counters?: Json
          created_at?: string
          finished_at?: string | null
          hash_attribution?: string | null
          heartbeat_at?: string
          id?: string
          last_error?: string | null
          lease_owner?: string | null
          lease_until?: string | null
          next_retry_at?: string | null
          stage?: string
          stage_log?: Json
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      help_releases: {
        Row: {
          app_build_id: string | null
          app_map_hash: string | null
          created_at: string
          id: string
          notes: string | null
          previous_release_id: string | null
          published_at: string | null
          published_by: string | null
          status: string
          version: number
        }
        Insert: {
          app_build_id?: string | null
          app_map_hash?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          previous_release_id?: string | null
          published_at?: string | null
          published_by?: string | null
          status?: string
          version: number
        }
        Update: {
          app_build_id?: string | null
          app_map_hash?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          previous_release_id?: string | null
          published_at?: string | null
          published_by?: string | null
          status?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "help_releases_previous_release_id_fkey"
            columns: ["previous_release_id"]
            isOneToOne: false
            referencedRelation: "help_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      help_sync_state: {
        Row: {
          chatbot_kb_release: string | null
          chatbot_release_id: string | null
          chatbot_synced_at: string | null
          help_release_id: string | null
          id: boolean
          last_app_build_id: string | null
          last_app_map_hash: string | null
          last_error: string | null
          last_reconciled_at: string | null
          updated_at: string
        }
        Insert: {
          chatbot_kb_release?: string | null
          chatbot_release_id?: string | null
          chatbot_synced_at?: string | null
          help_release_id?: string | null
          id?: boolean
          last_app_build_id?: string | null
          last_app_map_hash?: string | null
          last_error?: string | null
          last_reconciled_at?: string | null
          updated_at?: string
        }
        Update: {
          chatbot_kb_release?: string | null
          chatbot_release_id?: string | null
          chatbot_synced_at?: string | null
          help_release_id?: string | null
          id?: boolean
          last_app_build_id?: string | null
          last_app_map_hash?: string | null
          last_error?: string | null
          last_reconciled_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_sync_state_chatbot_release_id_fkey"
            columns: ["chatbot_release_id"]
            isOneToOne: false
            referencedRelation: "help_releases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_sync_state_help_release_id_fkey"
            columns: ["help_release_id"]
            isOneToOne: false
            referencedRelation: "help_releases"
            referencedColumns: ["id"]
          },
        ]
      }
      impersonation_sessions: {
        Row: {
          admin_user_id: string
          company_id: string
          ended_at: string | null
          id: string
          started_at: string
        }
        Insert: {
          admin_user_id: string
          company_id: string
          ended_at?: string | null
          id?: string
          started_at?: string
        }
        Update: {
          admin_user_id?: string
          company_id?: string
          ended_at?: string | null
          id?: string
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "impersonation_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      internal_secrets: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      job_offers: {
        Row: {
          amount: number
          company_id: string
          contractor_id: string | null
          contractor_name_raw: string | null
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          drive_file_id: string | null
          file_name: string | null
          file_url: string | null
          id: string
          is_winner: boolean
          job_id: string | null
          notes: string | null
          parsed_items: Json | null
          parsed_subtotal: number | null
          parsed_tax: number | null
          pre_job_id: string | null
          scope: string
        }
        Insert: {
          amount?: number
          company_id?: string
          contractor_id?: string | null
          contractor_name_raw?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          drive_file_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_winner?: boolean
          job_id?: string | null
          notes?: string | null
          parsed_items?: Json | null
          parsed_subtotal?: number | null
          parsed_tax?: number | null
          pre_job_id?: string | null
          scope?: string
        }
        Update: {
          amount?: number
          company_id?: string
          contractor_id?: string | null
          contractor_name_raw?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          drive_file_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_winner?: boolean
          job_id?: string | null
          notes?: string | null
          parsed_items?: Json | null
          parsed_subtotal?: number | null
          parsed_tax?: number | null
          pre_job_id?: string | null
          scope?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_offers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offers_pre_job_id_fkey"
            columns: ["pre_job_id"]
            isOneToOne: false
            referencedRelation: "pre_jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          bid_amount: number
          company_id: string
          contractor_id: string | null
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          document_ref: string | null
          drive_folder_id: string | null
          id: string
          is_paid: boolean
          job_number: string
          job_status: string
          notes: string | null
          project_id: string
          scheduled_for_payment: boolean
          scope: string
          updated_at: string
        }
        Insert: {
          bid_amount?: number
          company_id?: string
          contractor_id?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_ref?: string | null
          drive_folder_id?: string | null
          id?: string
          is_paid?: boolean
          job_number: string
          job_status?: string
          notes?: string | null
          project_id: string
          scheduled_for_payment?: boolean
          scope: string
          updated_at?: string
        }
        Update: {
          bid_amount?: number
          company_id?: string
          contractor_id?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_ref?: string | null
          drive_folder_id?: string | null
          id?: string
          is_paid?: boolean
          job_number?: string
          job_status?: string
          notes?: string | null
          project_id?: string
          scheduled_for_payment?: boolean
          scope?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      line_item_prices: {
        Row: {
          company_id: string
          created_at: string
          id: string
          line_item_id: string
          price: number
          price_list_id: string
          updated_at: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          id?: string
          line_item_id: string
          price: number
          price_list_id: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          line_item_id?: string
          price?: number
          price_list_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "line_item_prices_line_item_id_fkey"
            columns: ["line_item_id"]
            isOneToOne: false
            referencedRelation: "line_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "line_item_prices_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      line_items: {
        Row: {
          archived_at: string | null
          company_id: string
          created_at: string
          description: Json
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          description?: Json
          id?: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          description?: Json
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      material_invoice_payment_schedule: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          due_date: string | null
          id: string
          material_invoice_id: string
          sequence_number: number
          updated_at: string
        }
        Insert: {
          amount?: number
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          due_date?: string | null
          id?: string
          material_invoice_id: string
          sequence_number: number
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          due_date?: string | null
          id?: string
          material_invoice_id?: string
          sequence_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_invoice_payment_schedule_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoice_payment_schedule_material_invoice_id_fkey"
            columns: ["material_invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      material_invoices: {
        Row: {
          company_id: string
          contract_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          job_id: string | null
          notes: string | null
          status: string
          subtotal: number
          supplier_id: string | null
          tax: number
          total: number
          updated_at: string
        }
        Insert: {
          company_id?: string
          contract_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          job_id?: string | null
          notes?: string | null
          status?: string
          subtotal?: number
          supplier_id?: string | null
          tax?: number
          total?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          job_id?: string | null
          notes?: string | null
          status?: string
          subtotal?: number
          supplier_id?: string | null
          tax?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoices_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_invoices_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      material_items: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          id: string
          invoice_id: string
          item_number: string | null
          quantity: number
          sku_id: string | null
          total_price: number
          unit: string | null
          unit_price: number
        }
        Insert: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          id?: string
          invoice_id: string
          item_number?: string | null
          quantity?: number
          sku_id?: string | null
          total_price?: number
          unit?: string | null
          unit_price?: number
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          id?: string
          invoice_id?: string
          item_number?: string | null
          quantity?: number
          sku_id?: string | null
          total_price?: number
          unit?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "material_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_items_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
        ]
      }
      material_quotes: {
        Row: {
          amount: number
          company_id: string
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          drive_file_id: string | null
          file_name: string | null
          file_url: string | null
          id: string
          is_winner: boolean
          material_invoice_id: string | null
          notes: string | null
          parsed_items: Json
          parsed_subtotal: number
          parsed_tax: number
          scope: string
          supplier_id: string | null
          supplier_name_raw: string | null
        }
        Insert: {
          amount?: number
          company_id?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          drive_file_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_winner?: boolean
          material_invoice_id?: string | null
          notes?: string | null
          parsed_items?: Json
          parsed_subtotal?: number
          parsed_tax?: number
          scope?: string
          supplier_id?: string | null
          supplier_name_raw?: string | null
        }
        Update: {
          amount?: number
          company_id?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          drive_file_id?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_winner?: boolean
          material_invoice_id?: string | null
          notes?: string | null
          parsed_items?: Json
          parsed_subtotal?: number
          parsed_tax?: number
          scope?: string
          supplier_id?: string | null
          supplier_name_raw?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_quotes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_quotes_material_invoice_id_fkey"
            columns: ["material_invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_quotes_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      misc_payments: {
        Row: {
          amount: number
          company_id: string
          contractor_id: string | null
          created_at: string
          created_by: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          document_ref: string | null
          due_date: string | null
          id: string
          notes: string | null
          payment_method_id: string | null
          project_id: string
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          amount?: number
          company_id?: string
          contractor_id?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          document_ref?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_method_id?: string | null
          project_id: string
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          contractor_id?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          document_ref?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_method_id?: string | null
          project_id?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "misc_payments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "misc_payments_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "misc_payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "misc_payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "misc_payments_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      my_task_rules: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          min_age_days: number | null
          object_type: string
          overdue_days: number | null
          status_key: string
          task_label: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          min_age_days?: number | null
          object_type: string
          overdue_days?: number | null
          status_key: string
          task_label: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          min_age_days?: number | null
          object_type?: string
          overdue_days?: number | null
          status_key?: string
          task_label?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          type: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          settings?: Json | null
          type: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_operation_items: {
        Row: {
          action: string
          actor: string
          after_snapshot: Json | null
          amount_cents: number
          before_snapshot: Json | null
          company_id: string
          created_at: string
          id: string
          operation_id: string
          parent_payment_id: string | null
          payment_id: string
          payment_table: string
          reversal_of_payment_id: string | null
          source_id: string
          source_type: string
        }
        Insert: {
          action: string
          actor: string
          after_snapshot?: Json | null
          amount_cents: number
          before_snapshot?: Json | null
          company_id: string
          created_at?: string
          id?: string
          operation_id: string
          parent_payment_id?: string | null
          payment_id: string
          payment_table: string
          reversal_of_payment_id?: string | null
          source_id: string
          source_type: string
        }
        Update: {
          action?: string
          actor?: string
          after_snapshot?: Json | null
          amount_cents?: number
          before_snapshot?: Json | null
          company_id?: string
          created_at?: string
          id?: string
          operation_id?: string
          parent_payment_id?: string | null
          payment_id?: string
          payment_table?: string
          reversal_of_payment_id?: string | null
          source_id?: string
          source_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_operation_items_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "payment_operations"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_operations: {
        Row: {
          allow_overpayment: boolean
          authorized_by: string
          batch_id: string | null
          company_id: string
          completed_at: string | null
          created_at: string
          id: string
          idempotency_key: string
          input_payload: Json | null
          operation_type: string
          overpayment_reason: string | null
          payment_id: string | null
          payment_table: string | null
          requested_amount: number
          result: Json | null
          source_id: string
          source_type: string
        }
        Insert: {
          allow_overpayment?: boolean
          authorized_by: string
          batch_id?: string | null
          company_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          idempotency_key: string
          input_payload?: Json | null
          operation_type: string
          overpayment_reason?: string | null
          payment_id?: string | null
          payment_table?: string | null
          requested_amount: number
          result?: Json | null
          source_id: string
          source_type: string
        }
        Update: {
          allow_overpayment?: boolean
          authorized_by?: string
          batch_id?: string | null
          company_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          idempotency_key?: string
          input_payload?: Json | null
          operation_type?: string
          overpayment_reason?: string | null
          payment_id?: string | null
          payment_table?: string | null
          requested_amount?: number
          result?: Json | null
          source_id?: string
          source_type?: string
        }
        Relationships: []
      }
      payment_statuses: {
        Row: {
          canonical_subset: string | null
          color: string
          company_id: string | null
          created_at: string
          id: string
          is_active: boolean
          is_final: boolean
          key: string
          label: string
          requires_esignature: boolean
          sort_order: number
          stage_role: string | null
          type: string
          updated_at: string
        }
        Insert: {
          canonical_subset?: string | null
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_final?: boolean
          key: string
          label: string
          requires_esignature?: boolean
          sort_order?: number
          stage_role?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          canonical_subset?: string | null
          color?: string
          company_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_final?: boolean
          key?: string
          label?: string
          requires_esignature?: boolean
          sort_order?: number
          stage_role?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_statuses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          canonical_source_id: string | null
          canonical_source_type: string | null
          check_number: string | null
          company_id: string
          created_at: string
          created_by: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          due_date: string | null
          id: string
          job_id: string | null
          lic_amount: number | null
          lifecycle_actor: string | null
          lifecycle_at: string | null
          lifecycle_reason: string | null
          lifecycle_state: string | null
          material_invoice_id: string | null
          material_schedule_item_ids: string[] | null
          notes: string | null
          operation_id: string | null
          payment_method_id: string | null
          receipt_document_id: string | null
          receipt_file_url: string | null
          receiving_company: string | null
          refund_of_payment_id: string | null
          request_note: string | null
          requested_amount: number | null
          requested_at: string | null
          requested_by: string | null
          reversal_of_payment_id: string | null
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          source_credit_allocation_id: string | null
          source_credit_id: string | null
          split_parent_payment_id: string | null
          status: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          canonical_source_id?: string | null
          canonical_source_type?: string | null
          check_number?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          job_id?: string | null
          lic_amount?: number | null
          lifecycle_actor?: string | null
          lifecycle_at?: string | null
          lifecycle_reason?: string | null
          lifecycle_state?: string | null
          material_invoice_id?: string | null
          material_schedule_item_ids?: string[] | null
          notes?: string | null
          operation_id?: string | null
          payment_method_id?: string | null
          receipt_document_id?: string | null
          receipt_file_url?: string | null
          receiving_company?: string | null
          refund_of_payment_id?: string | null
          request_note?: string | null
          requested_amount?: number | null
          requested_at?: string | null
          requested_by?: string | null
          reversal_of_payment_id?: string | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          source_credit_allocation_id?: string | null
          source_credit_id?: string | null
          split_parent_payment_id?: string | null
          status: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          canonical_source_id?: string | null
          canonical_source_type?: string | null
          check_number?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          job_id?: string | null
          lic_amount?: number | null
          lifecycle_actor?: string | null
          lifecycle_at?: string | null
          lifecycle_reason?: string | null
          lifecycle_state?: string | null
          material_invoice_id?: string | null
          material_schedule_item_ids?: string[] | null
          notes?: string | null
          operation_id?: string | null
          payment_method_id?: string | null
          receipt_document_id?: string | null
          receipt_file_url?: string | null
          receiving_company?: string | null
          refund_of_payment_id?: string | null
          request_note?: string | null
          requested_amount?: number | null
          requested_at?: string | null
          requested_by?: string | null
          reversal_of_payment_id?: string | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          source_credit_allocation_id?: string | null
          source_credit_id?: string | null
          split_parent_payment_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_material_invoice_id_fkey"
            columns: ["material_invoice_id"]
            isOneToOne: false
            referencedRelation: "material_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "payment_operations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reversal_of_payment_id_fkey"
            columns: ["reversal_of_payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "credit_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "financial_credit_allocation_exceptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_source_credit_allocation_id_fkey"
            columns: ["source_credit_allocation_id"]
            isOneToOne: false
            referencedRelation: "financial_credit_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_source_credit_id_fkey"
            columns: ["source_credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_split_parent_payment_id_fkey"
            columns: ["split_parent_payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_admins: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      platform_flags: {
        Row: {
          enabled: boolean
          key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          enabled?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          enabled?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      portal_customers: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          id: string
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portal_customers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      pre_jobs: {
        Row: {
          company_id: string
          contract_id: string | null
          contractor_id: string | null
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          document_ref: string | null
          drive_folder_id: string | null
          estimated_amount: number
          id: string
          job_number: string
          notes: string | null
          project_id: string
          promoted_job_id: string | null
          scope: string
          source_contract_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id?: string
          contract_id?: string | null
          contractor_id?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_ref?: string | null
          drive_folder_id?: string | null
          estimated_amount?: number
          id?: string
          job_number: string
          notes?: string | null
          project_id: string
          promoted_job_id?: string | null
          scope: string
          source_contract_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          contract_id?: string | null
          contractor_id?: string | null
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          document_ref?: string | null
          drive_folder_id?: string | null
          estimated_amount?: number
          id?: string
          job_number?: string
          notes?: string | null
          project_id?: string
          promoted_job_id?: string | null
          scope?: string
          source_contract_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pre_jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pre_jobs_promoted_job_id_fkey"
            columns: ["promoted_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      price_lists: {
        Row: {
          archived_at: string | null
          company_id: string
          created_at: string
          id: string
          is_default: boolean
          name: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          email: string
          full_name: string
          id: string
          initials_data_url: string | null
          initials_updated_at: string | null
          signature_data_url: string | null
          signature_updated_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email: string
          full_name: string
          id?: string
          initials_data_url?: string | null
          initials_updated_at?: string | null
          signature_data_url?: string | null
          signature_updated_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string
          full_name?: string
          id?: string
          initials_data_url?: string | null
          initials_updated_at?: string | null
          signature_data_url?: string | null
          signature_updated_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      project_managers: {
        Row: {
          company_id: string
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_managers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_managers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_photos: {
        Row: {
          caption: string | null
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          project_id: string
          storage_path: string
          taken_at: string
          time_entry_id: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          company_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id: string
          storage_path: string
          taken_at?: string
          time_entry_id?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          project_id?: string
          storage_path?: string
          taken_at?: string
          time_entry_id?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_photos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_photos_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      project_sync_outbox: {
        Row: {
          attempt_count: number
          company_id: string
          created_at: string
          id: string
          last_error: string | null
          next_retry_at: string
          project_id: string
          requested_at: string
          status: string
          sync_kind: string
          updated_at: string
        }
        Insert: {
          attempt_count?: number
          company_id: string
          created_at?: string
          id?: string
          last_error?: string | null
          next_retry_at?: string
          project_id: string
          requested_at?: string
          status?: string
          sync_kind: string
          updated_at?: string
        }
        Update: {
          attempt_count?: number
          company_id?: string
          created_at?: string
          id?: string
          last_error?: string | null
          next_retry_at?: string
          project_id?: string
          requested_at?: string
          status?: string
          sync_kind?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_sync_outbox_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          address: string
          address_legacy: string | null
          backup_file_id: string | null
          city: string | null
          company_id: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contractors_csv_file_id: string | null
          created_at: string
          customer_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          drive_folder_id: string | null
          geocoded_address: string | null
          geocoded_at: string | null
          id: string
          lat: number | null
          lng: number | null
          name: string
          notes: string | null
          payments_csv_file_id: string | null
          price_list_id: string | null
          project_description: string | null
          project_number: number | null
          state: string | null
          status: string
          updated_at: string
          zip: string | null
        }
        Insert: {
          address: string
          address_legacy?: string | null
          backup_file_id?: string | null
          city?: string | null
          company_id?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contractors_csv_file_id?: string | null
          created_at?: string
          customer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          geocoded_address?: string | null
          geocoded_at?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          notes?: string | null
          payments_csv_file_id?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_number?: number | null
          state?: string | null
          status?: string
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string
          address_legacy?: string | null
          backup_file_id?: string | null
          city?: string | null
          company_id?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contractors_csv_file_id?: string | null
          created_at?: string
          customer_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          geocoded_address?: string | null
          geocoded_at?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          notes?: string | null
          payments_csv_file_id?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_number?: number | null
          state?: string | null
          status?: string
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      quickbooks_connections: {
        Row: {
          access_token_enc: string | null
          company_id: string | null
          connected_at: string | null
          connected_by: string | null
          connected_company_name: string | null
          connected_email: string | null
          created_at: string
          default_bank_account_id: string | null
          default_expense_account_id: string | null
          default_income_account_id: string | null
          default_item_id: string | null
          disconnected_at: string | null
          environment: string
          id: string
          last_error: string | null
          realm_id: string | null
          reconsent_notified_at: string | null
          refresh_token_enc: string | null
          refresh_token_expires_at: string | null
          scope: string
          sync_enabled: boolean
          token_expires_at: string | null
          updated_at: string
        }
        Insert: {
          access_token_enc?: string | null
          company_id?: string | null
          connected_at?: string | null
          connected_by?: string | null
          connected_company_name?: string | null
          connected_email?: string | null
          created_at?: string
          default_bank_account_id?: string | null
          default_expense_account_id?: string | null
          default_income_account_id?: string | null
          default_item_id?: string | null
          disconnected_at?: string | null
          environment?: string
          id?: string
          last_error?: string | null
          realm_id?: string | null
          reconsent_notified_at?: string | null
          refresh_token_enc?: string | null
          refresh_token_expires_at?: string | null
          scope?: string
          sync_enabled?: boolean
          token_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          access_token_enc?: string | null
          company_id?: string | null
          connected_at?: string | null
          connected_by?: string | null
          connected_company_name?: string | null
          connected_email?: string | null
          created_at?: string
          default_bank_account_id?: string | null
          default_expense_account_id?: string | null
          default_income_account_id?: string | null
          default_item_id?: string | null
          disconnected_at?: string | null
          environment?: string
          id?: string
          last_error?: string | null
          realm_id?: string | null
          reconsent_notified_at?: string | null
          refresh_token_enc?: string | null
          refresh_token_expires_at?: string | null
          scope?: string
          sync_enabled?: boolean
          token_expires_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quickbooks_connections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quickbooks_entity_map: {
        Row: {
          company_id: string | null
          created_at: string
          entity_type: string
          id: string
          kablanet_record_id: string
          last_synced_at: string
          quickbooks_entity: string
          quickbooks_id: string
          scope: string
          sync_token: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          entity_type: string
          id?: string
          kablanet_record_id: string
          last_synced_at?: string
          quickbooks_entity: string
          quickbooks_id: string
          scope?: string
          sync_token?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          entity_type?: string
          id?: string
          kablanet_record_id?: string
          last_synced_at?: string
          quickbooks_entity?: string
          quickbooks_id?: string
          scope?: string
          sync_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quickbooks_entity_map_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quickbooks_mapping_config: {
        Row: {
          created_at: string
          defaults: Json
          enabled: boolean
          entity_type: string
          id: string
          scope: string
          target_entity: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          defaults?: Json
          enabled?: boolean
          entity_type: string
          id?: string
          scope?: string
          target_entity?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          defaults?: Json
          enabled?: boolean
          entity_type?: string
          id?: string
          scope?: string
          target_entity?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quickbooks_sync_log: {
        Row: {
          company_id: string | null
          created_at: string
          entity_type: string
          error_message: string | null
          http_status: number | null
          id: string
          intuit_tid: string | null
          kablanet_record_id: string | null
          operation: string
          quickbooks_entity: string | null
          quickbooks_id: string | null
          scope: string
          status: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          entity_type: string
          error_message?: string | null
          http_status?: number | null
          id?: string
          intuit_tid?: string | null
          kablanet_record_id?: string | null
          operation?: string
          quickbooks_entity?: string | null
          quickbooks_id?: string | null
          scope?: string
          status?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          entity_type?: string
          error_message?: string | null
          http_status?: number | null
          id?: string
          intuit_tid?: string | null
          kablanet_record_id?: string | null
          operation?: string
          quickbooks_entity?: string | null
          quickbooks_id?: string | null
          scope?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quickbooks_sync_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quickbooks_sync_queue: {
        Row: {
          attempts: number
          company_id: string | null
          created_at: string
          entity_type: string
          id: string
          kablanet_record_id: string
          last_error: string | null
          locked_at: string | null
          next_attempt_at: string
          operation: string
          scope: string
          status: string
        }
        Insert: {
          attempts?: number
          company_id?: string | null
          created_at?: string
          entity_type: string
          id?: string
          kablanet_record_id: string
          last_error?: string | null
          locked_at?: string | null
          next_attempt_at?: string
          operation?: string
          scope?: string
          status?: string
        }
        Update: {
          attempts?: number
          company_id?: string | null
          created_at?: string
          entity_type?: string
          id?: string
          kablanet_record_id?: string
          last_error?: string | null
          locked_at?: string | null
          next_attempt_at?: string
          operation?: string
          scope?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "quickbooks_sync_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          can_access: boolean
          company_id: string | null
          created_at: string
          id: string
          page_path: string
          role_key: string
        }
        Insert: {
          can_access?: boolean
          company_id?: string | null
          created_at?: string
          id?: string
          page_path: string
          role_key: string
        }
        Update: {
          can_access?: boolean
          company_id?: string | null
          created_at?: string
          id?: string
          page_path?: string
          role_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_company_role_key_fkey"
            columns: ["company_id", "role_key"]
            isOneToOne: false
            referencedRelation: "app_roles"
            referencedColumns: ["company_id", "key"]
          },
        ]
      }
      service_ledger: {
        Row: {
          company_id: string
          contractor_id: string
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          job_id: string | null
          notes: string | null
          quantity: number
          service_name: string
          unit_price: number
        }
        Insert: {
          company_id?: string
          contractor_id: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          quantity?: number
          service_name: string
          unit_price: number
        }
        Update: {
          company_id?: string
          contractor_id?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          job_id?: string | null
          notes?: string | null
          quantity?: number
          service_name?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_ledger_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ledger_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_ledger_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      signing_placeholders: {
        Row: {
          change_order_id: string | null
          company_id: string
          contract_id: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          deleted_by: string | null
          field_type: string
          height_pct: number
          id: string
          is_completed: boolean
          page_number: number
          signature_data: string | null
          signed_at: string | null
          signee_id: string | null
          updated_at: string
          width_pct: number
          x_pct: number
          y_pct: number
        }
        Insert: {
          change_order_id?: string | null
          company_id?: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          field_type: string
          height_pct?: number
          id?: string
          is_completed?: boolean
          page_number?: number
          signature_data?: string | null
          signed_at?: string | null
          signee_id?: string | null
          updated_at?: string
          width_pct?: number
          x_pct: number
          y_pct: number
        }
        Update: {
          change_order_id?: string | null
          company_id?: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          field_type?: string
          height_pct?: number
          id?: string
          is_completed?: boolean
          page_number?: number
          signature_data?: string | null
          signed_at?: string | null
          signee_id?: string | null
          updated_at?: string
          width_pct?: number
          x_pct?: number
          y_pct?: number
        }
        Relationships: [
          {
            foreignKeyName: "signing_placeholders_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signing_placeholders_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signing_placeholders_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
        ]
      }
      sku_price_history: {
        Row: {
          company_id: string
          created_at: string
          date: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          material_item_id: string | null
          sku_id: string
          source: string | null
          supplier_id: string | null
          unit_price: number
        }
        Insert: {
          company_id?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          material_item_id?: string | null
          sku_id: string
          source?: string | null
          supplier_id?: string | null
          unit_price: number
        }
        Update: {
          company_id?: string
          created_at?: string
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          material_item_id?: string | null
          sku_id?: string
          source?: string | null
          supplier_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sku_price_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_price_history_material_item_id_fkey"
            columns: ["material_item_id"]
            isOneToOne: false
            referencedRelation: "material_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_price_history_sku_id_fkey"
            columns: ["sku_id"]
            isOneToOne: false
            referencedRelation: "skus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sku_price_history_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      skus: {
        Row: {
          category: string | null
          code: string
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          id: string
          notes: string | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          code: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          id?: string
          notes?: string | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          code?: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          id?: string
          notes?: string | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skus_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      snapshot_restore_leases: {
        Row: {
          company_id: string
          created_at: string
          locked_at: string
          locked_by: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          locked_at?: string
          locked_by: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          locked_at?: string
          locked_by?: string
          updated_at?: string
        }
        Relationships: []
      }
      snapshot_run_files: {
        Row: {
          attachment_id: string | null
          bucket: string
          company_id: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          file_name: string | null
          id: string
          path: string
          run_id: string
          seq: number
          size: number
          status: string
        }
        Insert: {
          attachment_id?: string | null
          bucket: string
          company_id: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          file_name?: string | null
          id?: string
          path: string
          run_id: string
          seq: number
          size?: number
          status: string
        }
        Update: {
          attachment_id?: string | null
          bucket?: string
          company_id?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          file_name?: string | null
          id?: string
          path?: string
          run_id?: string
          seq?: number
          size?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "snapshot_run_files_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snapshot_run_files_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "snapshot_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      snapshot_run_parts: {
        Row: {
          byte_size: number
          company_id: string
          created_at: string
          drive_file_id: string | null
          id: string
          kind: string
          name: string
          run_id: string
          seq: number
        }
        Insert: {
          byte_size?: number
          company_id: string
          created_at?: string
          drive_file_id?: string | null
          id?: string
          kind: string
          name: string
          run_id: string
          seq: number
        }
        Update: {
          byte_size?: number
          company_id?: string
          created_at?: string
          drive_file_id?: string | null
          id?: string
          kind?: string
          name?: string
          run_id?: string
          seq?: number
        }
        Relationships: [
          {
            foreignKeyName: "snapshot_run_parts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "snapshot_run_parts_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "snapshot_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      snapshot_runs: {
        Row: {
          byte_size: number | null
          bytes_done: number
          company_id: string
          cursor: Json | null
          destinations_status: Json | null
          drive_file_id: string | null
          drive_file_name: string | null
          error: string | null
          file_count: number | null
          files_done: number
          files_total: number | null
          finished_at: string | null
          heartbeat_at: string | null
          id: string
          mode: string | null
          parts: Json
          phase: string | null
          projects_done: number | null
          projects_total: number | null
          row_counts: Json | null
          started_at: string
          started_by: string | null
          status: string
          tables_done: number
          tables_total: number | null
          trigger: string
        }
        Insert: {
          byte_size?: number | null
          bytes_done?: number
          company_id: string
          cursor?: Json | null
          destinations_status?: Json | null
          drive_file_id?: string | null
          drive_file_name?: string | null
          error?: string | null
          file_count?: number | null
          files_done?: number
          files_total?: number | null
          finished_at?: string | null
          heartbeat_at?: string | null
          id?: string
          mode?: string | null
          parts?: Json
          phase?: string | null
          projects_done?: number | null
          projects_total?: number | null
          row_counts?: Json | null
          started_at?: string
          started_by?: string | null
          status: string
          tables_done?: number
          tables_total?: number | null
          trigger: string
        }
        Update: {
          byte_size?: number | null
          bytes_done?: number
          company_id?: string
          cursor?: Json | null
          destinations_status?: Json | null
          drive_file_id?: string | null
          drive_file_name?: string | null
          error?: string | null
          file_count?: number | null
          files_done?: number
          files_total?: number | null
          finished_at?: string | null
          heartbeat_at?: string | null
          id?: string
          mode?: string | null
          parts?: Json
          phase?: string | null
          projects_done?: number | null
          projects_total?: number | null
          row_counts?: Json | null
          started_at?: string
          started_by?: string | null
          status?: string
          tables_done?: number
          tables_total?: number | null
          trigger?: string
        }
        Relationships: [
          {
            foreignKeyName: "snapshot_runs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_events: {
        Row: {
          company_id: string | null
          created_at: string
          environment: string
          event_type: string
          id: string
          payload: Json | null
          stripe_event_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          environment?: string
          event_type: string
          id?: string
          payload?: Json | null
          stripe_event_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string
          environment?: string
          event_type?: string
          id?: string
          payload?: Json | null
          stripe_event_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_trades: {
        Row: {
          company_id: string
          created_at: string
          id: string
          supplier_id: string
          trade_id: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          id?: string
          supplier_id: string
          trade_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          supplier_id?: string
          trade_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_trades_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_trades_trade_id_fkey"
            columns: ["trade_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          city: string | null
          company_id: string
          contact_name: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          id: string
          license_number: string | null
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          updated_at: string
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          license_number?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string
          contact_name?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          license_number?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      support_conversations: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          last_message_at: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_conversations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      support_kb_documents: {
        Row: {
          chunk_count: number
          company_id: string
          created_at: string
          description: string | null
          error_message: string | null
          file_name: string
          id: string
          is_active: boolean
          mime_type: string | null
          size_bytes: number | null
          status: string
          storage_path: string
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          chunk_count?: number
          company_id: string
          created_at?: string
          description?: string | null
          error_message?: string | null
          file_name: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          size_bytes?: number | null
          status?: string
          storage_path: string
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          chunk_count?: number
          company_id?: string
          created_at?: string
          description?: string | null
          error_message?: string | null
          file_name?: string
          id?: string
          is_active?: boolean
          mime_type?: string | null
          size_bytes?: number | null
          status?: string
          storage_path?: string
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_kb_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      support_kb_entries: {
        Row: {
          build_id: string | null
          chunk_index: number
          company_id: string | null
          confidence: string
          content: string
          content_hash: string | null
          created_at: string
          document_id: string | null
          embedding: string | null
          id: string
          is_active: boolean
          source: string
          source_key: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          build_id?: string | null
          chunk_index?: number
          company_id?: string | null
          confidence?: string
          content: string
          content_hash?: string | null
          created_at?: string
          document_id?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean
          source: string
          source_key?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          build_id?: string | null
          chunk_index?: number
          company_id?: string | null
          confidence?: string
          content?: string
          content_hash?: string | null
          created_at?: string
          document_id?: string | null
          embedding?: string | null
          id?: string
          is_active?: boolean
          source?: string
          source_key?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_kb_entries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_kb_entries_document_fk"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "support_kb_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      support_kb_sync_state: {
        Row: {
          app_map_hash: string | null
          build_id: string | null
          created_at: string
          entry_count: number
          error_message: string | null
          id: string
          status: string
          synced_at: string
          updated_at: string
        }
        Insert: {
          app_map_hash?: string | null
          build_id?: string | null
          created_at?: string
          entry_count?: number
          error_message?: string | null
          id?: string
          status?: string
          synced_at?: string
          updated_at?: string
        }
        Update: {
          app_map_hash?: string | null
          build_id?: string | null
          created_at?: string
          entry_count?: number
          error_message?: string | null
          id?: string
          status?: string
          synced_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          cited_entry_ids: string[]
          confidence: number | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          rating: number | null
          role: string
          updated_at: string
        }
        Insert: {
          cited_entry_ids?: string[]
          confidence?: number | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          rating?: number | null
          role: string
          updated_at?: string
        }
        Update: {
          cited_entry_ids?: string[]
          confidence?: number | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          rating?: number | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "support_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      support_review_queue: {
        Row: {
          approved_entry_id: string | null
          bot_answer: string | null
          company_id: string | null
          conversation_id: string | null
          created_at: string
          id: string
          kind: string
          message_id: string | null
          proposed_entry: Json | null
          question: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          ticket_id: string | null
          updated_at: string
        }
        Insert: {
          approved_entry_id?: string | null
          bot_answer?: string | null
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          kind: string
          message_id?: string | null
          proposed_entry?: Json | null
          question?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          ticket_id?: string | null
          updated_at?: string
        }
        Update: {
          approved_entry_id?: string | null
          bot_answer?: string | null
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          kind?: string
          message_id?: string | null
          proposed_entry?: Json | null
          question?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          ticket_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_review_queue_approved_entry_id_fkey"
            columns: ["approved_entry_id"]
            isOneToOne: false
            referencedRelation: "support_kb_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_review_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_review_queue_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "support_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_review_queue_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "support_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_review_queue_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_ticket_messages: {
        Row: {
          author_role: string
          author_user_id: string | null
          body: string
          created_at: string
          email_sent_at: string | null
          id: string
          ticket_id: string
          updated_at: string
        }
        Insert: {
          author_role: string
          author_user_id?: string | null
          body: string
          created_at?: string
          email_sent_at?: string | null
          id?: string
          ticket_id: string
          updated_at?: string
        }
        Update: {
          author_role?: string
          author_user_id?: string | null
          body?: string
          created_at?: string
          email_sent_at?: string | null
          id?: string
          ticket_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          body: string
          company_id: string | null
          conversation_id: string | null
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          first_replied_at: string | null
          id: string
          last_message_at: string
          reference: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          first_replied_at?: string | null
          id?: string
          last_message_at?: string
          reference: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          company_id?: string | null
          conversation_id?: string | null
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          first_replied_at?: string | null
          id?: string
          last_message_at?: string
          reference?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "support_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          company_id: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          company_id?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Update: {
          company_id?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          accent_color: string | null
          add_frame: boolean
          body_font_size: number
          body_template: string
          company_id: string | null
          created_at: string
          deleted_at: string | null
          document_title: string | null
          footer_font_size: number | null
          footer_text: string | null
          header_font_size: number | null
          header_text: string | null
          id: string
          initials_position: string
          is_default: boolean
          logo_url: string | null
          name: string
          page_margin_pt: number
          require_initials: boolean
          require_signature: boolean
          show_from_to_block: boolean
          show_meta_block: boolean
          subject_template: string | null
          type: string
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          add_frame?: boolean
          body_font_size?: number
          body_template: string
          company_id?: string | null
          created_at?: string
          deleted_at?: string | null
          document_title?: string | null
          footer_font_size?: number | null
          footer_text?: string | null
          header_font_size?: number | null
          header_text?: string | null
          id?: string
          initials_position?: string
          is_default?: boolean
          logo_url?: string | null
          name: string
          page_margin_pt?: number
          require_initials?: boolean
          require_signature?: boolean
          show_from_to_block?: boolean
          show_meta_block?: boolean
          subject_template?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          add_frame?: boolean
          body_font_size?: number
          body_template?: string
          company_id?: string | null
          created_at?: string
          deleted_at?: string | null
          document_title?: string | null
          footer_font_size?: number | null
          footer_text?: string | null
          header_font_size?: number | null
          header_text?: string | null
          id?: string
          initials_position?: string
          is_default?: boolean
          logo_url?: string | null
          name?: string
          page_margin_pt?: number
          require_initials?: boolean
          require_signature?: boolean
          show_from_to_block?: boolean
          show_meta_block?: boolean
          subject_template?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          clock_in_address: string | null
          clock_in_at: string
          clock_in_lat: number | null
          clock_in_lng: number | null
          clock_out_address: string | null
          clock_out_at: string | null
          clock_out_lat: number | null
          clock_out_lng: number | null
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          edited_at: string | null
          edited_by: string | null
          id: string
          notes: string | null
          project_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          clock_in_address?: string | null
          clock_in_at?: string
          clock_in_lat?: number | null
          clock_in_lng?: number | null
          clock_out_address?: string | null
          clock_out_at?: string | null
          clock_out_lat?: number | null
          clock_out_lng?: number | null
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          edited_at?: string | null
          edited_by?: string | null
          id?: string
          notes?: string | null
          project_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          clock_in_address?: string | null
          clock_in_at?: string
          clock_in_lat?: number | null
          clock_in_lng?: number | null
          clock_out_address?: string | null
          clock_out_at?: string | null
          clock_out_lat?: number | null
          clock_out_lng?: number | null
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          edited_at?: string | null
          edited_by?: string | null
          id?: string
          notes?: string | null
          project_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      time_tracking_employees: {
        Row: {
          company_id: string
          created_at: string
          daily_overtime_after_hours: number
          daily_overtime_rate: number
          deleted_at: string | null
          deleted_by: string | null
          hourly_rate: number
          id: string
          lunch_minutes: number
          monthly_overtime_after_hours: number
          monthly_overtime_rate: number
          role_key: string | null
          updated_at: string
          user_id: string
          weekly_overtime_after_hours: number
          weekly_overtime_rate: number
        }
        Insert: {
          company_id: string
          created_at?: string
          daily_overtime_after_hours?: number
          daily_overtime_rate?: number
          deleted_at?: string | null
          deleted_by?: string | null
          hourly_rate?: number
          id?: string
          lunch_minutes?: number
          monthly_overtime_after_hours?: number
          monthly_overtime_rate?: number
          role_key?: string | null
          updated_at?: string
          user_id: string
          weekly_overtime_after_hours?: number
          weekly_overtime_rate?: number
        }
        Update: {
          company_id?: string
          created_at?: string
          daily_overtime_after_hours?: number
          daily_overtime_rate?: number
          deleted_at?: string | null
          deleted_by?: string | null
          hourly_rate?: number
          id?: string
          lunch_minutes?: number
          monthly_overtime_after_hours?: number
          monthly_overtime_rate?: number
          role_key?: string | null
          updated_at?: string
          user_id?: string
          weekly_overtime_after_hours?: number
          weekly_overtime_rate?: number
        }
        Relationships: []
      }
      trades: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "trades"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_signatures: {
        Row: {
          company_id: string
          created_at: string
          email_signature: string | null
          email_signature_updated_at: string | null
          initials_data_url: string | null
          initials_updated_at: string | null
          signature_data_url: string | null
          signature_updated_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email_signature?: string | null
          email_signature_updated_at?: string | null
          initials_data_url?: string | null
          initials_updated_at?: string | null
          signature_data_url?: string | null
          signature_updated_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email_signature?: string | null
          email_signature_updated_at?: string | null
          initials_data_url?: string | null
          initials_updated_at?: string | null
          signature_data_url?: string | null
          signature_updated_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_signatures_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_table_preferences: {
        Row: {
          column_order: string[]
          column_widths: Json
          created_at: string
          hidden_columns: string[]
          id: string
          layout_mode: string
          rows_per_view: number
          sort_dir: string | null
          sort_key: string | null
          table_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          column_order?: string[]
          column_widths?: Json
          created_at?: string
          hidden_columns?: string[]
          id?: string
          layout_mode?: string
          rows_per_view?: number
          sort_dir?: string | null
          sort_key?: string | null
          table_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          column_order?: string[]
          column_widths?: Json
          created_at?: string
          hidden_columns?: string[]
          id?: string
          layout_mode?: string
          rows_per_view?: number
          sort_dir?: string | null
          sort_key?: string | null
          table_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vendor_credit_collections: {
        Row: {
          amount: number
          applied_to_id: string | null
          applied_to_type: string | null
          check_number: string | null
          company_id: string
          created_at: string
          created_by: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          kind: string
          notes: string | null
          offset_payment_id: string | null
          payment_method_id: string | null
          updated_at: string
          vendor_credit_id: string
        }
        Insert: {
          amount: number
          applied_to_id?: string | null
          applied_to_type?: string | null
          check_number?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          kind: string
          notes?: string | null
          offset_payment_id?: string | null
          payment_method_id?: string | null
          updated_at?: string
          vendor_credit_id: string
        }
        Update: {
          amount?: number
          applied_to_id?: string | null
          applied_to_type?: string | null
          check_number?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          kind?: string
          notes?: string | null
          offset_payment_id?: string | null
          payment_method_id?: string | null
          updated_at?: string
          vendor_credit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_credit_collections_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_credit_collections_vendor_credit_id_fkey"
            columns: ["vendor_credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_credits: {
        Row: {
          amount: number
          company_id: string
          contract_id: string | null
          created_at: string
          created_by: string | null
          credit_number: string | null
          date: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          entity_id: string
          entity_type: string
          id: string
          notes: string | null
          project_id: string | null
          source_id: string | null
          source_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          company_id: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          credit_number?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          entity_id: string
          entity_type: string
          id?: string
          notes?: string | null
          project_id?: string | null
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          company_id?: string
          contract_id?: string | null
          created_at?: string
          created_by?: string | null
          credit_number?: string | null
          date?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          notes?: string | null
          project_id?: string | null
          source_id?: string | null
          source_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_credits_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_credits_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_credits_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_credits_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_duplicate_dismissals: {
        Row: {
          company_id: string
          created_at: string
          dismissed_by: string | null
          id: string
          id_a: string
          id_b: string
          kind: string
        }
        Insert: {
          company_id: string
          created_at?: string
          dismissed_by?: string | null
          id?: string
          id_a: string
          id_b: string
          kind: string
        }
        Update: {
          company_id?: string
          created_at?: string
          dismissed_by?: string | null
          id?: string
          id_a?: string
          id_b?: string
          kind?: string
        }
        Relationships: []
      }
      vendor_price_items: {
        Row: {
          code: string | null
          company_id: string
          created_at: string
          deleted_at: string | null
          deleted_by: string | null
          hidden_at: string | null
          id: string
          manual_price: number | null
          name: string
          normalized_key: string
          unit: string | null
          updated_at: string
          vendor_id: string
          vendor_type: string
        }
        Insert: {
          code?: string | null
          company_id: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          hidden_at?: string | null
          id?: string
          manual_price?: number | null
          name: string
          normalized_key: string
          unit?: string | null
          updated_at?: string
          vendor_id: string
          vendor_type: string
        }
        Update: {
          code?: string | null
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          deleted_by?: string | null
          hidden_at?: string | null
          id?: string
          manual_price?: number | null
          name?: string
          normalized_key?: string
          unit?: string | null
          updated_at?: string
          vendor_id?: string
          vendor_type?: string
        }
        Relationships: []
      }
      vendor_price_points: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          id: string
          item_id: string
          price_date: string
          source_id: string | null
          source_label: string | null
          source_line: number
          source_type: string
          unit_price: number
        }
        Insert: {
          company_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          item_id: string
          price_date: string
          source_id?: string | null
          source_label?: string | null
          source_line?: number
          source_type: string
          unit_price: number
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          item_id?: string
          price_date?: string
          source_id?: string | null
          source_label?: string | null
          source_line?: number
          source_type?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "vendor_price_points_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "vendor_price_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_price_points_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "vendor_price_list"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      change_orders: {
        Row: {
          attachment_page_layout: Json | null
          auto_create_job: boolean | null
          auto_create_payments: boolean | null
          auto_create_prejobs: boolean | null
          body: string | null
          co_type_key: string | null
          company_id: string | null
          contract_kind: string | null
          contractor_id: string | null
          contractor_sig_placement: Json | null
          contractor_signature_data: string | null
          contractor_signed_at: string | null
          contractor_signed_by_name: string | null
          contractor_signer_email: string | null
          contractor_signer_name: string | null
          converted_at: string | null
          converted_contract_id: string | null
          created_at: string | null
          created_by: string | null
          created_job_id: string | null
          date_issued: string | null
          decline_reason: string | null
          declined_at: string | null
          declined_by_name: string | null
          declined_by_signee_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          end_date: string | null
          id: string | null
          imported_doc_attachment_id: string | null
          initials_pages: number[] | null
          initials_position: string | null
          is_credit: boolean | null
          materialized_at: string | null
          notes: string | null
          notify_customer_executed: boolean | null
          notify_customer_invite: boolean | null
          notify_internal_countersign: boolean | null
          notify_internal_executed: boolean | null
          notify_internal_invite_sent: boolean | null
          notify_user_id: string | null
          number: string | null
          pdf_document_id: string | null
          pdf_file_url: string | null
          price_list_id: string | null
          project_description: string | null
          project_id: string | null
          require_initials: boolean | null
          require_signature: boolean | null
          rows: Json | null
          schedule_rows: Json | null
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          signed_doc_attachment_id: string | null
          source_contract_id: string | null
          start_date: string | null
          status: string | null
          supplier_id: string | null
          template_id: string | null
          time_extension_days: number | null
          title: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          attachment_page_layout?: Json | null
          auto_create_job?: boolean | null
          auto_create_payments?: boolean | null
          auto_create_prejobs?: boolean | null
          body?: string | null
          co_type_key?: string | null
          company_id?: string | null
          contract_kind?: string | null
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_job_id?: string | null
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string | null
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean | null
          materialized_at?: string | null
          notes?: string | null
          notify_customer_executed?: boolean | null
          notify_customer_invite?: boolean | null
          notify_internal_countersign?: boolean | null
          notify_internal_executed?: boolean | null
          notify_internal_invite_sent?: boolean | null
          notify_user_id?: string | null
          number?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean | null
          rows?: Json | null
          schedule_rows?: Json | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          attachment_page_layout?: Json | null
          auto_create_job?: boolean | null
          auto_create_payments?: boolean | null
          auto_create_prejobs?: boolean | null
          body?: string | null
          co_type_key?: string | null
          company_id?: string | null
          contract_kind?: string | null
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_job_id?: string | null
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          end_date?: string | null
          id?: string | null
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean | null
          materialized_at?: string | null
          notes?: string | null
          notify_customer_executed?: boolean | null
          notify_customer_invite?: boolean | null
          notify_internal_countersign?: boolean | null
          notify_internal_executed?: boolean | null
          notify_internal_invite_sent?: boolean | null
          notify_user_id?: string | null
          number?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean | null
          rows?: Json | null
          schedule_rows?: Json | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_imported_doc_attachment_id_fkey"
            columns: ["imported_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["source_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_signed_doc_attachment_id_fkey"
            columns: ["signed_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "contract_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts_financial: {
        Row: {
          attachment_page_layout: Json | null
          auto_create_job: boolean | null
          auto_create_payments: boolean | null
          auto_create_prejobs: boolean | null
          bid_amount: number | null
          body: string | null
          co_type_key: string | null
          company_id: string | null
          contract_number: string | null
          contractor_id: string | null
          contractor_sig_placement: Json | null
          contractor_signature_data: string | null
          contractor_signed_at: string | null
          contractor_signed_by_name: string | null
          contractor_signer_email: string | null
          contractor_signer_name: string | null
          converted_at: string | null
          converted_contract_id: string | null
          created_at: string | null
          created_by: string | null
          created_job_id: string | null
          date: string | null
          date_issued: string | null
          decline_reason: string | null
          declined_at: string | null
          declined_by_name: string | null
          declined_by_signee_id: string | null
          deleted_at: string | null
          deleted_by: string | null
          drive_folder_id: string | null
          end_date: string | null
          estimate_created_at: string | null
          id: string | null
          imported_doc_attachment_id: string | null
          initials_pages: number[] | null
          initials_position: string | null
          is_credit: boolean | null
          is_main_contract: boolean | null
          kind: string | null
          materialized_at: string | null
          name: string | null
          notes: string | null
          notify_customer_executed: boolean | null
          notify_customer_invite: boolean | null
          notify_internal_countersign: boolean | null
          notify_internal_executed: boolean | null
          notify_internal_invite_sent: boolean | null
          notify_user_id: string | null
          number: string | null
          parent_contract_id: string | null
          pdf_document_id: string | null
          pdf_file_url: string | null
          price_list_id: string | null
          project_description: string | null
          project_id: string | null
          require_initials: boolean | null
          require_signature: boolean | null
          rows: Json | null
          schedule_rows: Json | null
          signature_data: string | null
          signed_at: string | null
          signed_by_name: string | null
          signed_doc_attachment_id: string | null
          signing_status: string | null
          source_contract_id: string | null
          start_date: string | null
          status: string | null
          supplier_id: string | null
          template_id: string | null
          time_extension_days: number | null
          title: string | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          attachment_page_layout?: Json | null
          auto_create_job?: boolean | null
          auto_create_payments?: boolean | null
          auto_create_prejobs?: boolean | null
          bid_amount?: number | null
          body?: string | null
          co_type_key?: string | null
          company_id?: string | null
          contract_number?: string | null
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_job_id?: string | null
          date?: string | null
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          end_date?: string | null
          estimate_created_at?: string | null
          id?: string | null
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean | null
          is_main_contract?: boolean | null
          kind?: string | null
          materialized_at?: string | null
          name?: string | null
          notes?: string | null
          notify_customer_executed?: boolean | null
          notify_customer_invite?: boolean | null
          notify_internal_countersign?: boolean | null
          notify_internal_executed?: boolean | null
          notify_internal_invite_sent?: boolean | null
          notify_user_id?: string | null
          number?: string | null
          parent_contract_id?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean | null
          rows?: Json | null
          schedule_rows?: Json | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          signing_status?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          attachment_page_layout?: Json | null
          auto_create_job?: boolean | null
          auto_create_payments?: boolean | null
          auto_create_prejobs?: boolean | null
          bid_amount?: number | null
          body?: string | null
          co_type_key?: string | null
          company_id?: string | null
          contract_number?: string | null
          contractor_id?: string | null
          contractor_sig_placement?: Json | null
          contractor_signature_data?: string | null
          contractor_signed_at?: string | null
          contractor_signed_by_name?: string | null
          contractor_signer_email?: string | null
          contractor_signer_name?: string | null
          converted_at?: string | null
          converted_contract_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_job_id?: string | null
          date?: string | null
          date_issued?: string | null
          decline_reason?: string | null
          declined_at?: string | null
          declined_by_name?: string | null
          declined_by_signee_id?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          drive_folder_id?: string | null
          end_date?: string | null
          estimate_created_at?: string | null
          id?: string | null
          imported_doc_attachment_id?: string | null
          initials_pages?: number[] | null
          initials_position?: string | null
          is_credit?: boolean | null
          is_main_contract?: boolean | null
          kind?: string | null
          materialized_at?: string | null
          name?: string | null
          notes?: string | null
          notify_customer_executed?: boolean | null
          notify_customer_invite?: boolean | null
          notify_internal_countersign?: boolean | null
          notify_internal_executed?: boolean | null
          notify_internal_invite_sent?: boolean | null
          notify_user_id?: string | null
          number?: string | null
          parent_contract_id?: string | null
          pdf_document_id?: string | null
          pdf_file_url?: string | null
          price_list_id?: string | null
          project_description?: string | null
          project_id?: string | null
          require_initials?: boolean | null
          require_signature?: boolean | null
          rows?: Json | null
          schedule_rows?: Json | null
          signature_data?: string | null
          signed_at?: string | null
          signed_by_name?: string | null
          signed_doc_attachment_id?: string | null
          signing_status?: string | null
          source_contract_id?: string | null
          start_date?: string | null
          status?: string | null
          supplier_id?: string | null
          template_id?: string | null
          time_extension_days?: number | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_imported_doc_attachment_id_fkey"
            columns: ["imported_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "change_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_parent_contract_id_fkey"
            columns: ["parent_contract_id"]
            isOneToOne: false
            referencedRelation: "contracts_financial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_price_list_id_fkey"
            columns: ["price_list_id"]
            isOneToOne: false
            referencedRelation: "price_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_signed_doc_attachment_id_fkey"
            columns: ["signed_doc_attachment_id"]
            isOneToOne: false
            referencedRelation: "document_attachments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "contract_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_credit_allocation_exceptions: {
        Row: {
          amount: number | null
          code: string | null
          company_id: string | null
          credit_id: string | null
          id: string | null
          reason: string | null
          target_id: string | null
          target_type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_allocations_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_credit_allocations: {
        Row: {
          amount: number | null
          company_id: string | null
          credit_id: string | null
          deleted_at: string | null
          id: string | null
          source_id: string | null
          source_type: string | null
          target_id: string | null
          target_type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_allocations_credit_id_fkey"
            columns: ["credit_id"]
            isOneToOne: false
            referencedRelation: "credits"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_payment_classification: {
        Row: {
          canonical_subset: string | null
          cents: number | null
          company_id: string | null
          event_kind: string | null
          is_final: boolean | null
          payment_id: string | null
          payment_ledger: string | null
          payment_table: string | null
          recognition_exclusion_reason: string | null
          recognized: boolean | null
          source_id: string | null
          source_ledger: string | null
          source_type: string | null
        }
        Relationships: []
      }
      financial_relationship_exceptions: {
        Row: {
          code: string | null
          company_id: string | null
          reason: string | null
          source_id: string | null
          source_type: string | null
        }
        Relationships: []
      }
      financial_source_relationship_edges: {
        Row: {
          amount: number | null
          company_id: string | null
          id: string | null
          is_legacy_adapter: boolean | null
          related_source_id: string | null
          related_source_type: string | null
          relationship_type: string | null
          source_id: string | null
          source_type: string | null
        }
        Relationships: []
      }
      financial_source_relationship_effects: {
        Row: {
          company_id: string | null
          excluded_reason: string | null
          pending_reason: string | null
          pending_reduction: number | null
          reduction: number | null
          replacement_count: number | null
          source_id: string | null
          source_type: string | null
        }
        Relationships: []
      }
      financial_sources: {
        Row: {
          company_id: string | null
          contractor_signed_at: string | null
          counterparty_type: string | null
          declined_at: string | null
          deleted_at: string | null
          document_kind: string | null
          id: string | null
          ledger_type: string | null
          project_id: string | null
          relationship: string | null
          require_signature: boolean | null
          signed_at: string | null
          source_type: string | null
          status: string | null
          superseded_by_id: string | null
          value: number | null
        }
        Relationships: []
      }
      vendor_price_list: {
        Row: {
          code: string | null
          company_id: string | null
          created_at: string | null
          current_price: number | null
          hidden_at: string | null
          id: string | null
          last_seen_at: string | null
          manual_price: number | null
          max_price: number | null
          min_price: number | null
          name: string | null
          points_count: number | null
          unit: string | null
          updated_at: string | null
          vendor_id: string | null
          vendor_type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      activate_help_kb_release: { Args: { _release: string }; Returns: Json }
      all_registry_pages: { Args: never; Returns: string[] }
      allocate_job_number: {
        Args: { p_is_change_order?: boolean }
        Returns: string
      }
      apply_vendor_credit: {
        Args: {
          _amount: number
          _applied_to_id: string
          _applied_to_type: string
          _date: string
          _notes: string
          _vendor_credit_id: string
        }
        Returns: string
      }
      audit_resolve_project: {
        Args: { _entity_type: string; _row: Json }
        Returns: string
      }
      backfill_admin_page_permissions: { Args: never; Returns: number }
      backfill_missing_templates: { Args: never; Returns: number }
      can_access_project: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      can_act_on: {
        Args: { _company_id: string; _page_paths: string[]; _user_id: string }
        Returns: boolean
      }
      canonical_payment_subset: {
        Args: { p_canonical: string; p_key: string; p_stage: string }
        Returns: string
      }
      collect_vendor_credit_cash: {
        Args: {
          _amount: number
          _check_number?: string
          _date?: string
          _notes?: string
          _payment_method_id?: string
          _vendor_credit_id: string
        }
        Returns: string
      }
      company_row_visible: { Args: { _row_company: string }; Returns: boolean }
      contract_signee_clear_placeholder: {
        Args: { _placeholder_id: string; _token: string }
        Returns: undefined
      }
      contract_signee_complete_placeholder: {
        Args: {
          _placeholder_id: string
          _signature_data: string
          _token: string
        }
        Returns: undefined
      }
      contract_signee_decline_contract: {
        Args: { _decliner_name: string; _reason?: string; _token: string }
        Returns: undefined
      }
      contract_signee_finalize: {
        Args: {
          _file_name: string
          _file_size: number
          _signer_name: string
          _storage_bucket: string
          _storage_path: string
          _token: string
        }
        Returns: Json
      }
      contract_signee_get_signing_payload: {
        Args: { _token: string }
        Returns: Json
      }
      convert_change_order_to_contract: {
        Args: { _co_id: string }
        Returns: string
      }
      convert_estimate_to_document: {
        Args: { _estimate_id: string; _kind?: string }
        Returns: string
      }
      create_pre_jobs_from_contract_line_items: {
        Args: {
          _company_id: string
          _contract_date?: string
          _contract_id: string
          _job_number_suffix?: string
          _project_id: string
          _source_contract_id?: string
          _source_id: string
          _source_note?: string
        }
        Returns: number
      }
      credit_source_is_active: {
        Args: { _source_id: string; _source_type: string }
        Returns: boolean
      }
      credit_sync_contract_negative_phases: {
        Args: { _company: string; _contract_id: string }
        Returns: undefined
      }
      credit_target_canonical_source: {
        Args: { _company_id: string; _target_id: string; _target_type: string }
        Returns: {
          ledger_type: string
          source_id: string
          source_type: string
        }[]
      }
      credit_target_normalize: {
        Args: { _target_type: string }
        Returns: string
      }
      credit_used_amount: {
        Args: { _credit_id: string; _excluding_allocation_id?: string }
        Returns: number
      }
      current_company_id: { Args: never; Returns: string }
      customer_attach_signed_change_order_doc: {
        Args: {
          _change_order_id: string
          _drive_file_id: string
          _file_name: string
          _file_size: number
          _file_url: string
          _notes: string
          _storage_bucket: string
          _storage_path: string
        }
        Returns: string
      }
      customer_clear_placeholder: {
        Args: { _placeholder_id: string }
        Returns: undefined
      }
      customer_complete_placeholder: {
        Args: { _placeholder_id: string; _signature_data: string }
        Returns: undefined
      }
      customer_decline_change_order: {
        Args: {
          _change_order_id: string
          _decliner_name: string
          _reason?: string
        }
        Returns: Json
      }
      customer_finalize_signed_change_order: {
        Args: {
          _change_order_id: string
          _file_name: string
          _file_size: number
          _signer_name: string
          _storage_bucket: string
          _storage_path: string
        }
        Returns: string
      }
      customer_sign_change_order: {
        Args: {
          _change_order_id: string
          _signature_data: string
          _signer_name: string
        }
        Returns: string
      }
      delete_contract_cascade: { Args: { _contract_id: string }; Returns: Json }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      document_attachment_visible: {
        Args: {
          _company_id: string
          _deleted_at: string
          _entity_id: string
          _entity_type: string
          _is_public: boolean
        }
        Returns: boolean
      }
      document_pages_access: { Args: { _user_id: string }; Returns: boolean }
      email_log_guess_contract: {
        Args: { _company_id: string; _html: string; _subject: string }
        Returns: string
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      enqueue_project_sync: {
        Args: { _project_id: string; _sync_kinds: string[] }
        Returns: number
      }
      estimate_request_mark_opened: {
        Args: { _token: string }
        Returns: undefined
      }
      financial_relationship_canonical_type: {
        Args: { p_type: string }
        Returns: string
      }
      financial_relationship_cycle_nodes: {
        Args: never
        Returns: {
          company_id: string
          cycle_path: string[]
          source_id: string
          source_type: string
        }[]
      }
      financial_relationship_long_chains: {
        Args: { p_max?: number }
        Returns: {
          chain_length: number
          company_id: string
          source_id: string
          source_type: string
        }[]
      }
      financial_relationship_set_active: {
        Args: { p_active: boolean; p_reason: string; p_relationship_id: string }
        Returns: Json
      }
      financial_relationship_upsert: {
        Args: {
          p_amount?: number
          p_notes?: string
          p_related_source_id: string
          p_related_source_type: string
          p_relationship_id?: string
          p_relationship_type: string
          p_source_id: string
          p_source_type: string
        }
        Returns: Json
      }
      financial_relationship_validate: {
        Args: {
          p_amount: number
          p_company: string
          p_exclude_id: string
          p_related_source_id: string
          p_related_source_type: string
          p_relationship_type: string
          p_source_id: string
          p_source_type: string
        }
        Returns: string
      }
      financial_source_rollups: {
        Args: {
          p_ledger_type?: string
          p_source_id?: string
          p_source_type?: string
        }
        Returns: {
          applied_credits: number
          approved_subset: number
          completed_but_unrecognized_subset: number
          document_kind: string
          excess_settlement: number
          integrity_exceptions: Json
          issued_subset: number
          ledger_type: string
          not_yet_requested: number
          outstanding_balance: number
          payment_exclusions: Json
          pending_refunds: number
          project_id: string
          raw_approved_subset: number
          raw_completed_but_unrecognized_subset: number
          raw_issued_subset: number
          raw_requested_subset: number
          raw_scheduled_subset: number
          recognized_paid: number
          recognized_payments_gross: number
          reconciliation_difference: number
          refunds: number
          relationship: string
          relationship_reduction: number
          requested_subset: number
          scheduled_subset: number
          source_id: string
          source_type: string
          source_value: number
          subset_excess: number
          value_exclusion_reason: string
        }[]
      }
      financial_source_rollups_json: {
        Args: { p_full?: boolean; p_ledger_type?: string }
        Returns: Json
      }
      get_auth_context: { Args: never; Returns: Json }
      get_co_signee_signing_status: {
        Args: { _change_order_id: string }
        Returns: {
          id: string
          sign_order: number
          signed_at: string
        }[]
      }
      get_company_backup_settings: {
        Args: { _company_id: string }
        Returns: {
          audit_trail_enabled: boolean
          company_id: string
          created_at: string
          document_drive_mirror_enabled: boolean
          expanded_exports_enabled: boolean
          mirror_retry_queue_enabled: boolean
          nightly_snapshot_enabled: boolean
          project_csv_snapshots_enabled: boolean
          restore_tool_enabled: boolean
          snapshot_retention_daily: number
          snapshot_retention_monthly: number
          updated_at: string
          updated_by: string | null
        }
        SetofOptions: {
          from: "*"
          to: "company_backup_settings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      get_portal_contract_rows: {
        Args: { _project_ids: string[] }
        Returns: {
          bid_amount: number
          contract_number: string
          date: string
          id: string
          is_main_contract: boolean
          name: string
          project_id: string
          shim_contractor_signed_at: string
          shim_created_at: string
          shim_declined_at: string
          shim_id: string
          shim_imported_doc_attachment_id: string
          shim_require_initials: boolean
          shim_require_signature: boolean
          shim_signed_at: string
          shim_status: string
          shim_total: number
          signing_status: string
        }[]
      }
      get_project_lic_payments: {
        Args: { p_project_id: string }
        Returns: {
          amount: number
          check_number: string
          contract_id: string
          date: string
          id: string
          is_material: boolean
          job_id: string
          lic_amount: number
          notes: string
          payee_name: string
          payment_method_id: string
          scope_or_invoice: string
          signature_data: string
          signed_at: string
          signed_by_name: string
          source_table: string
          status: string
        }[]
      }
      has_any_page_access: {
        Args: { _page_paths: string[]; _user_id: string }
        Returns: boolean
      }
      has_any_role: { Args: { _user_id: string }; Returns: boolean }
      has_page_access: {
        Args: { _page_path: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      import_vendor_price_items: {
        Args: { _rows: Json; _vendor_id: string; _vendor_type: string }
        Returns: number
      }
      is_company_admin: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      is_company_member: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      is_platform_admin: { Args: { _user_id: string }; Returns: boolean }
      is_portal_customer: {
        Args: { _project_id: string; _user_id: string }
        Returns: boolean
      }
      list_connected_agents: {
        Args: never
        Returns: {
          client_id: string
          client_name: string
          client_type: string
          consent_id: string
          granted_at: string
          redirect_uris: string
          registration_type: string
          scopes: string
          user_id: string
          user_name: string
        }[]
      }
      list_time_tracking_projects: {
        Args: never
        Returns: {
          address: string
          id: string
          lat: number
          lng: number
          name: string
        }[]
      }
      log_attachment_event: {
        Args: {
          _action: string
          _details?: Json
          _entity_id: string
          _entity_label?: string
          _entity_type: string
          _project_id?: string
        }
        Returns: undefined
      }
      log_auth_event: {
        Args: { _action: string; _details?: Json }
        Returns: undefined
      }
      log_mcp_denied: {
        Args: { _details?: Json; _tool: string }
        Returns: undefined
      }
      log_mcp_tool_call: {
        Args: { _details?: Json; _project_id?: string; _tool: string }
        Returns: undefined
      }
      mcp_access_status: {
        Args: { _client_id?: string; _session_id?: string }
        Returns: string
      }
      mcp_server_enabled: { Args: never; Returns: boolean }
      merge_vendor_price_items: {
        Args: { _keep_id: string; _merge_ids: string[] }
        Returns: number
      }
      merge_vendor_records: {
        Args: { _keep_id: string; _kind: string; _merge_id: string }
        Returns: Json
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      next_change_order_number: {
        Args: { _company_id: string }
        Returns: string
      }
      parent_contract_visible: {
        Args: { _parent_id: string }
        Returns: boolean
      }
      payment_assert_refund_origin: {
        Args: { _row: Json; _src_id: string; _src_type: string; _tbl: string }
        Returns: undefined
      }
      payment_canonical_stage: {
        Args: { p_company: string; p_status_key: string }
        Returns: string
      }
      payment_next_subset: {
        Args: { p_company: string; p_current: string; p_ledger: string }
        Returns: string
      }
      payment_op_assert_only_keys: {
        Args: { _allowed: string[]; _op: string; _payload: Json }
        Returns: undefined
      }
      payment_op_bool: { Args: { _key: string; _p: Json }; Returns: boolean }
      payment_op_cents: {
        Args: { p_key: string; p_payload: Json; p_required?: boolean }
        Returns: number
      }
      payment_op_credit_admin: {
        Args: {
          _company: string
          _op: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_credit_collect_cash: {
        Args: {
          _company: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_misc: {
        Args: {
          _company: string
          _op: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_normalize: {
        Args: { _op: string; _payload: Json }
        Returns: Json
      }
      payment_op_normalize_b2b: {
        Args: { _base: Json; _op: string; _payload: Json }
        Returns: Json
      }
      payment_op_optional_date: {
        Args: { p_key: string; p_payload: Json }
        Returns: string
      }
      payment_op_optional_uuid: {
        Args: { p_key: string; p_payload: Json }
        Returns: string
      }
      payment_op_refund: {
        Args: {
          _company: string
          _op: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_request_describe: {
        Args: {
          _company: string
          _ids: string[]
          _note: string
          _schedule_ids: string[]
          _table: string
        }
        Returns: undefined
      }
      payment_op_require_amount: {
        Args: { p_key: string; p_payload: Json }
        Returns: number
      }
      payment_op_require_uuid: {
        Args: { p_key: string; p_payload: Json }
        Returns: string
      }
      payment_op_row_edit: {
        Args: {
          _company: string
          _op: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_schedule: {
        Args: {
          _company: string
          _op: string
          _op_id: string
          _payload: Json
          _reason: string
          _uid: string
        }
        Returns: Json
      }
      payment_op_text: {
        Args: { p_key: string; p_payload: Json }
        Returns: string
      }
      payment_op_to_cents: {
        Args: { p_amount: number; p_label: string }
        Returns: number
      }
      payment_operation_assert_can_write:
        | {
            Args: {
              _company_id: string
              _ledger: string
              _operation: string
              _user_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              _company_id: string
              _ledger: string
              _operation: string
              _source_id?: string
              _source_type?: string
              _user_id: string
            }
            Returns: undefined
          }
      payment_operation_can_write:
        | {
            Args: { _company_id: string; _ledger: string; _user_id: string }
            Returns: boolean
          }
        | {
            Args: {
              _company_id: string
              _ledger: string
              _operation: string
              _source_id?: string
              _source_type?: string
              _user_id: string
            }
            Returns: boolean
          }
      payment_operation_execute: {
        Args: {
          p_batch_id?: string
          p_idempotency_key: string
          p_operation: string
          p_payload: Json
        }
        Returns: Json
      }
      payment_operation_execute_batch: {
        Args: {
          p_atomic?: boolean
          p_batch_id: string
          p_items: Json
          p_key_prefix?: string
        }
        Returns: Json
      }
      payment_operation_is_admin: {
        Args: { _company_id: string; _user_id: string }
        Returns: boolean
      }
      payment_operation_pages: { Args: { _ledger: string }; Returns: string[] }
      payment_operation_role_allows: {
        Args: {
          _operation: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      payment_refundable_for_payment: {
        Args: { _company: string; _pid: string; _tbl: string }
        Returns: number
      }
      payment_source_project_id: {
        Args: { _company: string; _source_id: string; _source_type: string }
        Returns: string
      }
      payment_source_refundable_cents: {
        Args: {
          _company: string
          _ledger: string
          _src_id: string
          _src_type: string
        }
        Returns: number
      }
      payment_split_column_plan: {
        Args: { p_table: string }
        Returns: {
          column_name: string
          treatment: string
        }[]
      }
      payment_status_key_for_subset: {
        Args: { p_company: string; p_ledger: string; p_subset: string }
        Returns: string
      }
      payment_subset_rank: { Args: { p_subset: string }; Returns: number }
      platform_admin_list: {
        Args: never
        Returns: {
          created_at: string
          email: string
          full_name: string
          user_id: string
        }[]
      }
      platform_admin_update_name: {
        Args: { _full_name: string; _user_id: string }
        Returns: undefined
      }
      platform_company_admins: {
        Args: never
        Returns: {
          company_id: string
          email: string
          full_name: string
          user_id: string
        }[]
      }
      platform_company_stats: {
        Args: { _company_id: string }
        Returns: {
          projects_count: number
          users_count: number
        }[]
      }
      platform_email_received: {
        Args: { _limit?: number }
        Returns: {
          body: string
          company_id: string
          company_name: string
          created_at: string
          from_email: string
          from_name: string
          id: string
          reference: string
          subject: string
          ticket_id: string
          ticket_status: string
        }[]
      }
      platform_email_sent: {
        Args: { _limit?: number }
        Returns: {
          clicked_at: string
          company_id: string
          company_name: string
          contract_id: string
          created_at: string
          error_message: string
          from_email: string
          from_name: string
          has_template_data: boolean
          html_body: string
          id: string
          message_id: string
          opened_at: string
          recipient_email: string
          status: string
          subject: string
          template_name: string
        }[]
      }
      portal_company_info: {
        Args: { _project_id: string }
        Returns: {
          address: string
          city: string
          email: string
          id: string
          logo_url: string
          name: string
          phone: string
          state: string
          website: string
          zip: string
        }[]
      }
      portal_get_signee_token: {
        Args: { _change_order_id: string }
        Returns: string
      }
      project_detail_bundle: { Args: { p_project_id: string }; Returns: Json }
      project_document_attachments: {
        Args: { p_project_id: string }
        Returns: {
          contract_number: string
          contractor_name: string
          created_at: string
          document_type: string
          drive_file_id: string
          entity_id: string
          entity_type: string
          file_name: string
          file_size: number
          file_url: string
          id: string
          is_executed_signed_doc: boolean
          is_public: boolean
          mime_type: string
          notes: string
          storage_bucket: string
          storage_path: string
          supplier_name: string
          uploaded_by: string
        }[]
      }
      project_document_count: {
        Args: { p_project_id: string }
        Returns: number
      }
      project_pages_access: { Args: { _user_id: string }; Returns: boolean }
      purge_help_pipeline_history: { Args: never; Returns: Json }
      purge_old_audit_log: { Args: never; Returns: undefined }
      purge_old_quickbooks_sync_log: { Args: never; Returns: undefined }
      purge_project_cascade: {
        Args: { _project_id: string }
        Returns: undefined
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      reconcile_project_document_inventory: {
        Args: { _limit?: number; _offset?: number }
        Returns: {
          created_at: string
          metadata: Json
          owner_id: string
          storage_path: string
        }[]
      }
      record_vendor_price: {
        Args: {
          _code: string
          _company: string
          _date: string
          _name: string
          _price: number
          _source_id: string
          _source_label: string
          _source_line: number
          _source_type: string
          _unit: string
          _vendor_id: string
          _vendor_type: string
        }
        Returns: string
      }
      request_payment_amount: {
        Args: {
          p_allow_overpayment?: boolean
          p_amount: number
          p_idempotency_key: string
          p_overpayment_reason?: string
          p_preferred_id?: string
          p_preferred_table?: string
          p_source_id: string
          p_source_type: string
        }
        Returns: Json
      }
      request_payment_amount_core: {
        Args: {
          p_allow_overpayment?: boolean
          p_amount: number
          p_idempotency_key: string
          p_overpayment_reason?: string
          p_preferred_id?: string
          p_preferred_table?: string
          p_source_id: string
          p_source_type: string
        }
        Returns: Json
      }
      request_payment_amount_guard: {
        Args: { p_exclusion: string }
        Returns: undefined
      }
      reset_change_order_signees_and_placeholders: {
        Args: { _change_order_id: string }
        Returns: undefined
      }
      reset_contract_signees_and_placeholders: {
        Args: { _contract_id: string }
        Returns: undefined
      }
      resolve_payment_status_lifecycle: {
        Args: { _company_id: string; _type: string }
        Returns: {
          approval_key: string
          initial_key: string
          request_key: string
        }[]
      }
      resolve_price_list: { Args: { _project_id: string }; Returns: string }
      restore_project_cascade: {
        Args: { _project_id: string }
        Returns: undefined
      }
      revoke_connected_agent: { Args: { _consent_id: string }; Returns: number }
      rls_impersonate_company: { Args: never; Returns: string }
      rls_scope_company: { Args: never; Returns: string }
      rls_scope_company_cached: { Args: never; Returns: string }
      rls_sees_all: { Args: never; Returns: boolean }
      rollback_help_kb_release: { Args: { _release: string }; Returns: Json }
      seed_company_from_platform_defaults: {
        Args: { _company_id: string }
        Returns: undefined
      }
      set_mcp_server_enabled: { Args: { _enabled: boolean }; Returns: boolean }
      settle_credit_cash: {
        Args: {
          _amount: number
          _check_number: string
          _credit_id: string
          _date: string
          _notes: string
          _payment_method_id: string
        }
        Returns: string
      }
      signee_clear_placeholder: {
        Args: { _placeholder_id: string; _token: string }
        Returns: undefined
      }
      signee_complete_placeholder: {
        Args: {
          _placeholder_id: string
          _signature_data: string
          _token: string
        }
        Returns: undefined
      }
      signee_decline_change_order: {
        Args: { _decliner_name: string; _reason?: string; _token: string }
        Returns: Json
      }
      signee_finalize: {
        Args: {
          _file_name: string
          _file_size: number
          _signer_name: string
          _storage_bucket: string
          _storage_path: string
          _token: string
        }
        Returns: Json
      }
      signee_get_by_token: {
        Args: { _token: string }
        Returns: {
          change_order_id: string
          sign_order: number
          signee_email: string
          signee_id: string
          signee_name: string
          signee_signed_at: string
        }[]
      }
      signee_get_signing_payload: { Args: { _token: string }; Returns: Json }
      signee_mark_opened: { Args: { _token: string }; Returns: undefined }
      snapshot_tenant_map: { Args: never; Returns: Json }
      support_kb_search: {
        Args: { _company_id: string; _embedding: string; _match_count?: number }
        Returns: {
          confidence: string
          content: string
          id: string
          similarity: number
          source: string
          title: string
          url: string
        }[]
      }
      sync_current_portal_customer_projects: { Args: never; Returns: string[] }
      sync_portal_customer_to_customer_projects: {
        Args: { p_company_id: string; p_customer_id: string; p_user_id: string }
        Returns: undefined
      }
      vendor_price_norm: {
        Args: { _code: string; _name: string }
        Returns: string
      }
      verify_no_orphans: {
        Args: never
        Returns: {
          check_name: string
          count: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "accountant" | "project_manager" | "customer" | "crew"
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
      app_role: ["admin", "accountant", "project_manager", "customer", "crew"],
    },
  },
} as const
