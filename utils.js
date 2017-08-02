module.exports.getDate = getDate
function getDate (meta) {
  return meta.date
    ? meta.date.match(/\d{4}-\d{2}-\d{2}/)
      ? meta.date
      : meta.date.split('/').reverse().map(ch => ch.length >= 2 ? ch : '0' + ch).join('-')
    : meta.created || meta.modified ||
      meta.gitCreated || meta.gitModified || meta.fsCreated || meta.fsModified
}
