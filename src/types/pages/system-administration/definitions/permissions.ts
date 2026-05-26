// Permission and group types
export interface Permission {
  name: string;
  displayName: string;
  parentName: string;
  isGranted: boolean;
  grantedProviders: {
    providerName: string;
    providerKey: string;
  }[];
  permissions: Permission[];
}

export interface PermissionGroup {
  displayName: string;
  name: string;
  permissions: Permission[];
}

export interface UserInfo {
  id: string;
  userName: string;
  name: string;
  twoFactorEnabled?: boolean;
}
