/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.grantedRoles.includes('ROLE_ADMIN'),
    canCompanyAdmin: currentUser && currentUser.grantedRoles.includes('ROLE_COMPANY_ADMIN'),
    canCompanyManager:
      currentUser &&
      (currentUser.grantedRoles.includes('ROLE_COMPANY_MANAGER') ||
        currentUser.grantedRoles.includes('ROLE_COMPANY_ADMIN')),
    canPublic: true,
  };
}
