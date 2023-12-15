import { PermissionDefinition, useHasPermission } from "core/permissions";
import React, { FC } from "react";

interface RequirePermissionProps {
  children: React.ReactNode;
  permission: PermissionDefinition;
  showSlug?: string;
}

const RequirePermission: FC<RequirePermissionProps> = ({
  children,
  showSlug,
  permission,
}) => {
  const valid = useHasPermission(permission, showSlug);
  if (valid) {
    return <>{children}</>;
  }
  return null;
};

export default RequirePermission;
