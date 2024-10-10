export interface CreatePassword {
  account_name: string;
  account_url?: URL;
  original_password: string;
  hashed_password?: string;
  description?: string;
  expiry_date?: Date;
}
