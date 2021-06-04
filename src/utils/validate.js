// 验证规则
/**
 * @param {string} path
 * @returns {Boolean}
 */
// 校验是否是跳转链接
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// 校验用户名
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
